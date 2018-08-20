const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

    //Emitir un evento 'estadoActual'

    client.emit('estadoActual', { //PONER EL ULTIMO TICKET EN PANTALLA ACTUAL
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio){//VERIFICAMOS SI EN LA DATA NO VIENE EL ESCRITORIO
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio); //LLAMAMOS LA FUNCION atendetTicket

        callback(atenderTicket); //RETORNAMOS EL TICKET PARA QUE EL FRONTEND LO PUEDA TRABAJAR

        //Actualizar / notificar cambios en los ultimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    })

});