const moment = require('moment')

const Scraper = require('../scraper')
const config = require('../config')
const CovidStats = require('./model')

const statsForDate = async (date) => {
  const todayString = moment(date).format(config.dateFormat)
  const instance = await CovidStats.findOne({ scraped_at: todayString })
  return instance
}

const store = async (data) => {
  const doc = await new CovidStats(data).save()
  return doc
}

const generateCovidStatsIfNeeded = async () => {
  const covidStatsForToday = await statsForDate(new Date())
  if (covidStatsForToday) {
    const msg = 'CovidStats already stored for today'
    return { msg, data: covidStatsForToday }
  }

  const data = await Scraper.scrape()
  if (moment(data.last_updated_at).isSame(moment(), 'year', 'month', 'day')) {
    const msg = 'There are no recent updates available for today'
    return { msg, data: null }
  }

  await store(data)
  const msg = 'CovidStats saved'
  return { msg, data }
}

module.exports = {
  generateCovidStatsIfNeeded,
  statsForDate
}
