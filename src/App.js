import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Join from './components/Join';
import Chat from './components/Chat';
import NotFound from './components/NotFound';


const App = () => (
	<Router>
		<Switch>
			<Route exact path='/' component={Join} />
			<Route path='/chat' component={Chat} />
			<Route path='*' component={NotFound} />
		</Switch>
	</Router>
)

export default App;
