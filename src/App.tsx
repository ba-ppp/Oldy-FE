import store from 'app/store';
import React from 'react';
import { Provider } from 'react-redux';
import Routes from 'routes';
import './App.css';


const App: React.FC = () => (
    <Provider store={store}>
        <Routes />
    </Provider>
)

export default App;
