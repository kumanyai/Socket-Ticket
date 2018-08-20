//Comando para establecer la conexion
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function () {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('Desconectado del servidor');
});

//on 'estadoActual'
socket.on('estadoActual', function (res) { //PONE EL ULTIMO TICKET EN PANTALLA ACTUAL
   label.text(res.actual);
});

$('button').on('click', function () { //ESCUCHAMOS LOS EVENTOS CLICK DE LOS BOTONES

    socket.emit('siguienteTicket', null, function (siguienteTicket) {
        label.text(siguienteTicket); //PONE EL TICKET EN PANTALLA ACTUAL
    });

});