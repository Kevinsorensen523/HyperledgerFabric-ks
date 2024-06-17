const express = require('express');
const bodyParser = require('body-parser');
const { connectToNetwork } = require('./fabric-sdk/fabric');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/api/query', async (req, res) => {
    try {
        const contract = await connectToNetwork();
        const result = await contract.evaluateTransaction('queryAllAssets');
        res.json(JSON.parse(result.toString()));
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).send(error.toString());
    }
});

app.post('/api/invoke', async (req, res) => {
    try {
        const contract = await connectToNetwork();
        const { key, value } = req.body;
        await contract.submitTransaction('createAsset', key, value);
        res.send('Transaction has been submitted');
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.status(500).send(error.toString());
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
