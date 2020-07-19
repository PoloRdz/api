'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment =require('moment');

var ticketPickupDataSchema = Schema({
    number: String,
    ticketPickupMeter: String,
    ticketDeliveryMeter: String,
    ticketStatus: {type: Schema.ObjectId, ref: 'TicketStatus'},
    driver: {type: Schema.ObjectId, ref: 'Driver'},

});

module.exports = mongoose.model('Ticket', ticketSchema);