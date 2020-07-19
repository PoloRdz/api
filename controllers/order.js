'use strict'

var OrderModel = require('../models/order');

function saveOrder(req, res){
    var order = new OrderModel();
    order.number = req.body.number;
    order.dispatch = req.body.dispatch;
    order.lease = req.body.lease;
    order.terminal = req.body.terminal;
    order.tank = req.body.tank;
    order.comments = req.body.comments;

    OrderModel.findOne({number: order.number})
    .then(function(fOrder){
        if(fOrder){
            throw new Error('This order already exists');
        } else{
            return order.save();
        }
    })
    .then(function(savedOrder){
        res.status(200).send({order: savedOrder});
    }).catch(function(error){
         res.status(500).send({message: 'Error en el servidor'});
    });
}

module.exports = {
    saveOrder
}