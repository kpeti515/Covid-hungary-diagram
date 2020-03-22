const mongoose = require('mongoose')
const config = require('./config')

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const connect = async () => {
  const conn = await mongoose.connect(`mongodb://${config.username}:${config.password}@ds119060.mlab.com:19060/covidtrackerhu`, opts)
  console.info('Database connection established')
  return conn
}

module.exports = {
  connect
}
