'use strict'

var mongoose = require('mongoose');
var app = require("./app");
var port = process.env.port || 3977;

mongoose.connect('mongodb://localhost:27017/helpdesk', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function (res) {
    console.log("La base de datos se ha conectado correctamente");

    app.listen(port, function () {
        console.log("Servidor del api rest de helpdesk escuchando en http://localhost:" + port);
    });
}).catch(function (err) {
    throw err;
});


// , (err, res) =>{
//     if(err){
//         throw err;
//     } else {
//         console.log("La base de datos se ha conectado correctamente");

//         app.listen(port, function(){
//             console.log("Servidor del api rest de musica escuchando en http://localhost:" + port);
//         });
//     }
// });