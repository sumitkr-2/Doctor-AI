const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/recommend', async (req, res) => {
    const { symptoms } = req.body;

    try {
        const response = await axios.post('http://localhost:11434/api/generate', {
            model: 'llama3',
            prompt: `Suggest medicines for these symptoms: ${symptoms}`,
            stream: false
        });

        res.json({ recommendation: response.data.response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting recommendation' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
