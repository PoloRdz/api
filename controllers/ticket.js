var TicketModel = require('../models/ticket');
var TicketStatus = require('../models/ticketStatus');
var OrderModel = require('../models/order');

function saveTicket(req, res){
    var params = req.body;
    var orderId = params.orderId;
    var ticket = new TicketModel();
    ticket.order = orderId;
    ticket.number = 1;
    ticket.ticketStatus = params.ticketStatus;
    ticket.driver = params.driver;
    ticket.truck = params.truck;

    OrderModel.findById(orderId)
    .then(fOrder => {
        if(!fOrder){
            throw new Error('OR404');
        }
        return 
    })
    .catch(error => {
        if(error.message = 'OR404')
            res.status(404).send({message: 'The order for this ticket does not exists'});
        res.status(500).send({message: 'An unexpected error occured, please try again later'});
    });
}

module.exports = {
    saveTicket
}