import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [assets, setAssets] = useState([]);
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        axios.get('/api/query')
            .then(response => setAssets(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/invoke', { key, value })
            .then(response => {
                console.log('Transaction submitted:', response.data);
                setKey('');
                setValue('');
                // Refresh the list of assets
                return axios.get('/api/query');
            })
            .then(response => setAssets(response.data))
            .catch(error => console.error('Error submitting transaction:', error));
    };

    return (
        <div className="App">
            <h1>Hyperledger Fabric Web Client</h1>
            <ul>
                {assets.map(asset => (
                    <li key={asset.Key}>{asset.Record.name}: {asset.Record.value}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Key"
                />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Value"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;
