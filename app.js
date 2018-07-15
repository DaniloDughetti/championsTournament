const express = require('express');
const environment = require('./utils/environment.utils');
const app = express();
const mongoose = require('mongoose');
const playerRouter = require('./routers/player.route');
const userRouter = require('./routers/user.route');
var authenticate = require('./middleware/authenticate');

app.use(express.json());

mongoose.connect(`mongodb+srv://admin:${environment.mongoDBPassword}@championstournamentcluster-icd5i.gcp.mongodb.net/test`,{useNewUrlParser: true});




/*
 * Players 
 */
app.get('/api/players', authenticate, playerRouter.list);
app.get('/api/players/:playerId', playerRouter.get);
app.post('/api/players', playerRouter.create);
app.patch('/api/players/:playerId', playerRouter.update);
app.delete('/api/players/:playerId', playerRouter.delete);

/*
 * Users
 */
app.post('/api/users', userRouter.create);

app.listen(environment.serverPort, () => {
    console.log(`Listening on port ${environment.serverPort}...`);
});