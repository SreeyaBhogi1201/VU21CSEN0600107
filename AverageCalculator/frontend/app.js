import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numberId, setNumberId] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.get(`http://localhost:9876/numbers/${numberId}`);
      setResponse(result.data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className="App">
      <h1>Average Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Number ID:
          <input
            type="text"
            value={numberId}
            onChange={(e) => setNumberId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Fetch</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {response && (
        <div>
          <h2>Previous Window State</h2>
          <pre>{JSON.stringify(response.windowPrevState, null, 2)}</pre>
          <h2>Current Window State</h2>
          <pre>{JSON.stringify(response.windowCurrState, null, 2)}</pre>
          <h2>Numbers</h2>
          <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
