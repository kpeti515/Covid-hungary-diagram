const express = require('express')
const app = express()
const router = require('./router')
const port = process.env.PORT || 3000
const db = require('./database')

app.use(router)

const main = async () => {
  try {
    await Promise.all([
      db.connect(),
      app.listen(port)
    ])
    console.info(`Server is up on port ${port}`)
  } catch (err) {
    console.error(err)
  }
}

main()
