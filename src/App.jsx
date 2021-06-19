import React from 'react';
import { DogContextProvider } from './contexts/DogContext';

import Main from './components/Main/Main';

import './App.css';

const App = () => {
    return (
        <DogContextProvider>
            <div className='app'>
                <Main />
            </div>
        </DogContextProvider>
    )
}

export default App;
