import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('YOUR_GOOGLE_SHEETS_API_URL'); // Replace this with your actual API URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result); // Process this according to the shape of your data
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = () => {
        fetchData();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Google Sheets Dashboard</h1>
            <button onClick={handleRefresh}>Refresh</button>
            <div>
                {/* Render your data here */}
                {data.map(item => (
                    <div key={item.id}>{item.name}</div> // Adjust according to your data structure
                ))}
            </div>
        </div>
    );
};

export default Dashboard;