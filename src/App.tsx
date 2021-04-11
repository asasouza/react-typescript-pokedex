import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// @ts-ignore
import { MotionLayoutProvider } from 'react-motion-layout';

import Details from './screens/Details';
import Home from './screens/Home';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<MotionLayoutProvider>
					<Switch>
						<Route path='/:pokemonName'>
							<Details />
						</Route>
						<Route path='/'>
							<Home />
						</Route>
					</Switch>
				</MotionLayoutProvider>
			</Router>
		</QueryClientProvider>
	);
}

export default App;
