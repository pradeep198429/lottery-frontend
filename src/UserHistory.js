import React from 'react';

const UserHistory = ({ history }) => {
    return (
        <div>
            <h2>User History</h2>
            <ul>
                {history.map((record, index) => (
                    <li key={index}>
                        <strong>{new Date(record.timestamp).toLocaleString()}:</strong> {record.numbers.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserHistory;
