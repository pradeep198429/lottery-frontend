import React, { useState } from 'react';
import axios from 'axios';
import UserHistory from './UserHistory';

const GenerateNumbersForm = () => {
    const [userName, setUserName] = useState('');
    const [numbers, setNumbers] = useState([]);
    const [history, setHistory] = useState([]);

    const handleGenerateNumbers = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/generate', { name: userName });
            setNumbers(response.data.numbers);
            fetchUserHistory(userName);
        } catch (error) {
            console.error('Error generating numbers:', error);
        }
    };

    const fetchUserHistory = async (userName) => {
        try {
            const response = await axios.get(`/api/history/${userName}`);
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleGenerateNumbers}>
                <label>
                    Enter your name:
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Generate Numbers</button>
            </form>
            {numbers.length > 0 && (
                <div>
                    <h2>Generated Numbers:</h2>
                    <ul>
                        {numbers.map((number, index) => (
                            <li key={index}>{number}</li>
                        ))}
                    </ul>
                </div>
            )}
            {history.length > 0 && (
                <UserHistory history={history} />
            )}
        </div>
    );
};

export default GenerateNumbersForm;
