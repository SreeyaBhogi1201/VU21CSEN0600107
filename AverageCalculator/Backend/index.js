const express = require('express');
const axios = require('axios');
const app = express();
const port = 9876;

const WINDOW_SIZE = 10;
const API_BASE_URL = 'http://third-party-server.com/numbers';

let numbers = [];
const calculateAverage = (nums) => {
    const sum = nums.reduce((acc, num) => acc + num, 0);
    return nums.length ? (sum / nums.length).toFixed(2) : 0.00;
};

const fetchNumbers = async (numberId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${numberId}`, { timeout: 500 });
        return response.data;
    } catch (error) {
        console.error(`Error fetching numbers: ${error.message}`);
        return [];
    }
};


const updateNumbers = (newNumbers) => {
    const uniqueNewNumbers = [...new Set(newNumbers)]; // Remove duplicates
    const allNumbers = [...numbers, ...uniqueNewNumbers];
    
    if (allNumbers.length > WINDOW_SIZE) {
        numbers = allNumbers.slice(allNumbers.length - WINDOW_SIZE); // Maintain window size
    } else {
        numbers = allNumbers;
    }
};

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

app.listen(port, () => {
    console.log(`Average Calculator microservice running on http://localhost:${port}`);
});
