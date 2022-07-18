import './App.css';
import React, { Suspense } from 'react';
import Order from './components/Order';

//import Login from 'applicationone/Login';

function App() {
    return (
        <div className="container">
            <h4 style={{ color: 'red' }}>Micro Front-End</h4>
            <div>Application Two is consuming Login page from Application One and also bootstrap CSS</div>
            <div style={{ marginTop: 20 }}>
                <Order></Order>
            </div>
        </div>
    );
}

export default App;
