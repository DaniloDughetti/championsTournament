const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(
    `mongodb+srv://admin:${process.env.DB_PASSWORD}@championstournamentcluster-icd5i.gcp.mongodb.net/test?retryWrites=true`);
const playerRouter = require('./routers/playerRouter');

app.use(express.json());

/*
 * Players 
 */
app.get('/api/players', playerRouter.list);

app.get('/api/player', playerRouter.create);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});