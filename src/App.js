import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [userName, setUserName] = useState('');
    const [lotteryNumbers, setLotteryNumbers] = useState([]);
    const [userHistory, setUserHistory] = useState([]);

    const handleGenerate = async () => {
        const response = await axios.post('/api/generate', { name: userName });
        setLotteryNumbers(response.data.numbers);
    };

    const handleHistory = async () => {
        const response = await axios.get(`/api/history/${userName}`);
        setUserHistory(response.data);
    };

    return (
        <div>
            <h1>Lottery Number Generator</h1>
            <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button onClick={handleGenerate}>Generate Numbers</button>
            <button onClick={handleHistory}>Get History</button>
            <div>
                <h2>Generated Numbers</h2>
                <p>{lotteryNumbers.join(', ')}</p>
            </div>
            <div>
                <h2>User History</h2>
                <ul>
                    {userHistory.map((entry, index) => (
                        <li key={index}>
                            {new Date(entry.timestamp).toLocaleString()}: {entry.numbers.join(', ')}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
