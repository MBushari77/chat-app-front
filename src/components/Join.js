import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import '../static/css/fontello.css'

const Join = () => {
	const [name, setName] = useState('')
	const [room, setRoom] = useState('')

	return (
		<div className='join_form_container'>
			<div>
				<h1>Join</h1>
			</div>
			<div>
				<div><input placeholder='Name' className='join_input' type='text' onChange={e => setName(e.target.value)} /></div>
				<div><input placeholder='Room' className='join_input' type='text' onChange={e => setRoom(e.target.value)} /></div>
				<div>
					<Link className='join_button' onClick={ e => (!name || !room) ? e.preventDefault() : null } to={`/chat?name=${name}&room=${room}`}>
						Join
					</Link>
				</div>
			</div>
			<footer>
				<a href='https://facebook.com/m.bushari' target='_blank' className='icon-facebook'></a>
				<a href='https://twitter.com/M_Bushari/' target='_blank' className='icon-twitter'></a>
				<a href='https://github.com/MBushari77/' target='_blank' className='icon-github'></a>
				<a href='https://www.linkedin.com/in/mohammed-bushari-5b9813192/' target='_blank' className='icon-linkedin'></a>
				<i>Mohammed Albushari - 2022</i>
			</footer>
		</div>

	)
};

export default Join;
