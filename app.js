const express = require('express');
const app = express();
const mongoose = require('mongoose');
const playerRouter = require('./routers/playerRouter');

app.use(express.json());
mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASSWORD}@championstournamentcluster-icd5i.gcp.mongodb.net/test?retryWrites=true`);
const port = process.env.PORT || 3000;

/*
 * Players 
 */
app.get('/api/players', playerRouter.list);
app.get('/api/players/:playerId', playerRouter.get);
app.post('/api/players', playerRouter.create);
app.patch('/api/players/:playerId', playerRouter.update);
app.delete('/api/players/:playerId', playerRouter.delete);


app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});