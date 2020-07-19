'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var ticketSchema = Schema({
    order: {type: Schema.ObjectId, ref: 'Order'},
    number: String,
    pickupData: {
        topGauge: {
            ft: Number,
            in: Number,
            fr: Number
        },
        bottomGauge: {
            ft: Number,
            in: Number,
            fr: Number
        },
        topMeter: Number,
        bottomMeter: Number,
        sealOff: String,
        sealOffDate: Date,
        sealOn: String,
        sealOnDate: Date
    },
    deliveryData: {
        topMeter: Number,
        bottomMeter: Number
    },
    totalBarrels: Number,
    ticketStatus: {type: Schema.ObjectId, ref: 'TicketStatus'},
    driver: {type: Schema.ObjectId, ref: 'Driver'},
    truck: String
});

module.exports = mongoose.model('Ticket', ticketSchema);