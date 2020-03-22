const mongoose = require('mongoose')
const connectionURL = process.env.DB_URL

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

if (!connectionURL) {
  console.error('[EnvVar] `DB_URL` is missing')
  process.exit(1)
}

const connect = async () => {
  const conn = await mongoose.connect(connectionURL, opts)
  console.info('Database connection established')
  return conn
}

module.exports = {
  connect
}
