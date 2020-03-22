const puppeteer = require('puppeteer')
const express = require('express')
const app = express()
// require('../db/mongoose')
const router = require('./router')

const port = process.env.PORT || 3000
app.use(router)
app.listen(port, () => {
  console.log('Server is up on port ' + port)
})

const koronaDiagram = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://koronavirus.gov.hu/')
  const rawData = await page.evaluate(() => {
    const convertListToArray = (list) => Array.prototype.slice.call(list)
    const numberQuery = document.querySelectorAll('.diagram-a .number')
    const labelQuery = document.querySelectorAll('.diagram-a .label')
    return {
      numbers: convertListToArray(numberQuery).map(e => parseInt(e.innerHTML.replace(/\s/g, ''))),
      labels: convertListToArray(labelQuery).map(e => e.innerHTML)
    }
  })
  await browser.close()
  console.log(rawData)
}

koronaDiagram()
