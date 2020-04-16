'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = Schema({
    number: String,
    subject: String,
    description: String,
    status: {type: Schema.ObjectId, ref: 'TicketStatus'},
    priority: {type: Schema.ObjectId, ref: 'Priority'},
    petitioner: {type: Schema.ObjectId, ref: 'User'},
    fixDescription: String,    
    fixDate: Date,
    createdBy: {type: Schema.ObjectId, ref: 'User'},
    createdDate: Date
});

module.exports = mongoose.model('TicketStatus', ticketSchema);