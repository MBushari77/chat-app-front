import { useState, useEffect } from "react";
import queryString from 'query-string';
import io from 'socket.io-client';
import {useHistory} from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactEmoji from 'react-emoji';
import logo from '../static/logo.png';
import '../App.css';

let socket;
const Chat = ({ location }) => {
	const history = useHistory();
	const [msg, setMsg] = useState('');
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [newMsg, setNewMsg] = useState('');
	const [pending, setPending] = useState(true);
	const send = '>'
	var [msgs, setMessages] = useState([]);

	
	const ENDPOINT = 'http://localhost:5000';
	useEffect(() => {
		const { name, room } = queryString.parse(location.search);
		socket = io(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});
		setName(name);
		setRoom(room);
		console.log(name, room)
		socket.emit('join', { name, room })
		socket.on('logout', () => {
			history.push('/')
		})

		return () => {
			socket.disconnect();
			console.log("User has disconnected")
			socket.off();

		}
	}, [ENDPOINT, location.search, pending]);
	useEffect(() => {
		socket.on('msg', (msg) => {
			setMessages([...msgs, msg])
			console.log('msgs')
			console.log(msgs)
			setPending(false)

		})
	}, [msg, msgs])
	let sendNewMsg = (e) => {
		e.preventDefault();
		if (newMsg){
			socket.emit('sendMsg', newMsg);
		}
		setNewMsg('')
	}
	return (
		<center>
			{ pending? 
				(<div className='wait_container'>
					<img className='rotating' src={ logo } />
				</div>
				)
				:
				(
					<div className='chat_container'>
						<div className='user_name_container'>
							<p> <i className='icon-at'></i> { name }</p>
						</div>
						<div className='new_msg_container'>
							<ScrollToBottom className='msgs_container'>
								{msgs.map((omsg, i) =>  ( omsg.user === name?
									(
										<div key={i} className='my_msgs_container'>
											<div className='my_msgs'>
												<p> { ReactEmoji.emojify(omsg.text) } </p>

											</div>
											<div>
												<small> { omsg.user } </small>	
											</div>
										</div>
									)
									: omsg.user === 'Admin'?(
										<div key={i} className='admin_msg'>
											<small> { ReactEmoji.emojify(omsg.text) } </small>
										</div>
									)
									:(
										<div key={i} className='other_msgs_container'>
											<div className='other_msgs'>
												<p> { ReactEmoji.emojify(omsg.text) } </p>
											</div>
											<div>
												<small> { omsg.user } </small>	
											</div>
										</div>
									)
								))}
							</ScrollToBottom>
							<div className='send_msg_box'>
								<form onSubmit={ sendNewMsg }>
								<input
								placeholder='Write something...'
									value={newMsg}
									onChange={(e) => setNewMsg(e.target.value)}
								/>
								<button type='submit'> { send } </button>
								</form>
							</div>
						</div>
					</div>
				)
			}
		</center>
	);
};

export default Chat;
