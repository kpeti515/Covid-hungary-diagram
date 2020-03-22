const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  elhunyt: { type: Number },
  fertőzött: { type: Number },
  gyógyult: { type: Number },
  karanténban: { type: Number },
  last_updated_at: { type: String },
  mintavétel: { type: Number },
  scraped_at: { type: String }
})
const CovidStats = mongoose.model('CovidStats', schema)

module.exports = CovidStats
