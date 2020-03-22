const _ = require('lodash')
const moment = require('moment')
const puppeteer = require('puppeteer')
const globalConfig = require('../config')

const scrape = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://koronavirus.gov.hu/')

  const {
    numbers,
    labels,
    recentUpdate
  } = await page.evaluate(() => {
    const convertListToArray = (list) => Array.prototype.slice.call(list)
    const numberQuery = document.querySelectorAll('.view-diagrams.section-top .diagram-a .number')
    const labelQuery = document.querySelectorAll('.view-diagrams.section-top .diagram-a .label')
    const recentUpdateQuery = document.querySelectorAll('.view-diagrams.section-top .view-header p')

    const numbers = convertListToArray(numberQuery)
      .map(e => parseInt(e.innerHTML.replace(/\s/g, '')))
    const labels = convertListToArray(labelQuery)
      .map(e => e.innerHTML.toLowerCase())
    const recentUpdate = convertListToArray(recentUpdateQuery)[0]
      .innerHTML
      .replace(/\s/g, '')

    return {
      numbers,
      labels,
      recentUpdate
    }
  })
  await browser.close()

  const originalDateFormat = 'YYYY.MM.DD.hh:mm'
  const data = _.zipObject(labels, numbers)
  const recentDateString = recentUpdate.substring(recentUpdate.indexOf(':') + 1)

  data.scraped_at = moment().format(globalConfig.dateFormat)
  data.last_updated_at = moment(recentDateString, originalDateFormat).format(globalConfig.dateFormat)

  return data
}

module.exports = { scrape }
