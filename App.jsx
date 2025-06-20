
import React from 'react';
import Home from './pages/Home.jsx';
import UserContext from './context/UserContext';

function App() {
    return (
        <UserContext>
            <Home />
        </UserContext>
    );
}

export default App;
