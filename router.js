const express = require('express')
const router = new express.Router()
const CovidStatsController = require('./CovidStatsController')

router.get('/generate', async (req, res) => {
  try {
    const data = await CovidStatsController.generateCovidStatsIfNeeded()
    res.send(data)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
