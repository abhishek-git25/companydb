const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    name: String,
    startDate: String,
    endDate: String
})

const batch = mongoose.model('batch', batchSchema);

module.exports = batch;