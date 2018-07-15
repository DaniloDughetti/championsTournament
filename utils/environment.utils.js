const Environment = {
    serverPort: process.env.PORT || 3000,
    mongoDBPassword: process.env.DB_PASSWORD || 'champions',
    hashingSecret: process.env.SECRET || 'abc123'
}

module.exports = Environment;