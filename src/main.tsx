import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider as ReduxProvider} from 'react-redux';
import store from './app/store';
import App from './app/App';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');
createRoot(root).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</QueryClientProvider>
		</ReduxProvider>
	</React.StrictMode>
);
