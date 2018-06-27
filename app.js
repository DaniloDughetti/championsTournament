const express = require('express');
const app = express();
const player = require('./player');

app.use(express.json());

/*
 * Players 
 */
app.get('/api/players', player.list);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});