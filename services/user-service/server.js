const express = require('express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
    res.send('User service running');
});

app.listen(PORT, () => {
    console.log(`User service started on port ${PORT}`);
});