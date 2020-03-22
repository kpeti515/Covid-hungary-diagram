const express = require('express')
const router = new express.Router()

const CovidStatsController = require('./CovidStatsController')
const Scraper = require('./scraper')

const generateCovidStatsIfNeeded = async () => {
  const hasCovidStatsForToday = await CovidStatsController.hasScrapeForDate(new Date())
  if (hasCovidStatsForToday) {
    const msg = 'CovidStats already stored for today'
    return { msg, data: null }
  }

  const data = await Scraper.scrape()
  await CovidStatsController.store(data)
  const msg = 'CovidStats saved'
  return { msg, data }
}

router.get('/', async (req, res) => {
  try {
    const data = await generateCovidStatsIfNeeded()
    res.send(data)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
