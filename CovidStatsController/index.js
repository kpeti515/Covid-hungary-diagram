const moment = require('moment')

const config = require('../config')
const CovidStats = require('./model')

const hasScrapeForDate = async (date) => {
  const todayString = moment(date).format(config.dateFormat)
  const instance = await CovidStats.findOne({ scraped_at: todayString })

  return instance != null
}

const store = async (data) => {
  const doc = await new CovidStats(data).save()
  return doc
}

module.exports = {
  hasScrapeForDate,
  store
}
