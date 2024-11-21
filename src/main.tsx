import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider as ReduxProvider} from 'react-redux';
import store from './app/store';
import App from './app/App';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </QueryClientProvider>
        </ReduxProvider>
    </React.StrictMode>,
);
