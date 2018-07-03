const express = require('express');
const app = express();
const mongoose = require('mongoose');
const playerRouter = require('./routers/playerRouter');

app.use(express.json());

mongoose.connect(
    `mongodb+srv://admin:${process.env.DB_PASSWORD}@championstournamentcluster-icd5i.gcp.mongodb.net/test?retryWrites=true`);

/*
 * Players 
 */
app.get('/api/players', playerRouter.list);
app.get('/api/players/:id', playerRouter.get);
app.post('/api/players', playerRouter.create);
app.put('/api/players', playerRouter.update);
app.delete('/api/players/:id', playerRouter.delete);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});