const express = require('express');
const axios = require('axios');
const app = express();
const port = 9876;

// Configuration
const WINDOW_SIZE = 10;
const API_BASE_URL = 'http://third-party-server.com/numbers'; // Replace with actual third-party API base URL

// In-memory storage for unique numbers
let numbers = [];

// Helper function to calculate average
const calculateAverage = (nums) => {
    const sum = nums.reduce((acc, num) => acc + num, 0);
    return nums.length ? (sum / nums.length).toFixed(2) : 0.00;
};

// Fetch numbers from third-party server
const fetchNumbers = async (numberId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${numberId}`, { timeout: 500 });
        return response.data;
    } catch (error) {
        console.error(`Error fetching numbers: ${error.message}`);
        return [];
    }
};

// Update numbers and manage window size
const updateNumbers = (newNumbers) => {
    const uniqueNewNumbers = [...new Set(newNumbers)]; // Remove duplicates
    const allNumbers = [...numbers, ...uniqueNewNumbers];
    
    if (allNumbers.length > WINDOW_SIZE) {
        numbers = allNumbers.slice(allNumbers.length - WINDOW_SIZE); // Maintain window size
    } else {
        numbers = allNumbers;
    }
};

// Route to handle requests
app.get('/numbers/:numberid', async (req, res) => {
    const numberId = req.params.numberid;
    const windowPrevState = [...numbers];

    const fetchedNumbers = await fetchNumbers(numberId);
    updateNumbers(fetchedNumbers);
    
    const windowCurrState = [...numbers];
    const avg = calculateAverage(numbers);
    
    res.json({
        windowPrevState,
        windowCurrState,
        numbers: {
            avg,
            data: windowCurrState
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Average Calculator microservice running on http://localhost:${port}`);
});
