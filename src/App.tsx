import 'antd/dist/antd.css';
import { store, persistor } from 'app/store';
import React from 'react';
import { Provider } from 'react-redux';
import Routes from 'routes';
import './App.css';
import { PersistGate } from 'redux-persist/integration/react';

const App: React.FC = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Routes />
        </PersistGate>
    </Provider>
);

export default App;
