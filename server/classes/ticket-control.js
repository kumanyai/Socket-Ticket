//TODA CLASE DEBE LLEVAR SU CONTRUCTOR PARA PODER INICIALIZARLA.
const fs = require('fs');

class Ticket { //NO AYUDA A CONTROLAR LOS TICKET
    constructor(numero, escritorio){ //necesitamos el numero de ticket que deseamos atender y el escritorio
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor(){ //CUANDO TRABAJAMOS DENTRO DE LAS CLASES SE LES CONOCE COMO PROPIEDADES
        this.ultimo = 0; //ULTIMO TICKET
        this.hoy = new Date().getDate(); //OBTENER EL DIA DE HOY
        this.tickets = []; //VA A CONTENER TODOS LOS TICKETS PENDIENTES DE REVISION
        this.ultimos4 = [];
        let data = require('../data/data'); //LEER EL ARCHIVO JSON

        //CADA INICIO DE UN NUEVO DIA SE REINICIAN LOS TICKET
        
        if (data.hoy === this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        }else{
            this.grabarArchivo();
        }

    }

    siguiente(){
        this.ultimo = this.ultimo + 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket(){
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4(){
        return this.ultimos4;
    }

    atenderTicket(escritorio){ //recibimos un escritorio
        if (this.tickets.length === 0){ //Validamos si hay tickets en espera
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero; //TOMAMOS EL PRIMER TICKET QUE TENEMOS PENDIENTE Y ROMPEMOS CON LA RELACION DE JS QUE TODOS LOS OBJETOS SON PASADOS POR REFRENCIA
        this.tickets.shift(); //BORRAMOS LA PRIMERA POSICION DEL ARREGLO

        let atenderTicket = new Ticket(numeroTicket, escritorio);//CREAMOS UN NUEVO TICKET QUE SE VA ATENDER QUE TIENE EL NUMERO DE TICKET Y EL ESCRITORIO AL CUAL SE VA ATENDER
        this.ultimos4.unshift(atenderTicket); //AGREGAMOS EL TICKET AL INICIO DEL ARREGLO

        //QUE SOLO EXISTAN 4 TICKETS EN ESTE ARREGLO.
        if (this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1)//BORRAMOS EL ULTIMO ELEMENTO
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);
        this.grabarArchivo();

        return atenderTicket; //REGRESAMOS EL TICKET QUE TENEMOS QUE ATENDER
    }

    reiniciarConteo(){
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha actualizado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo(){
        let jsonData ={ //LA INFORMACION QUE SE VA A GRABAR
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets : this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData); //MANDAMOS EL JSON COMO UN STRING
        fs.writeFileSync('./server/data/data.json', jsonDataString); //GUARDAMOS E EL ARCHIVO EL JSON QUE CREAMOS
        console.log('SE HA INICIALIZADO EL SISTEMA');
    }
}

module.exports = {
    TicketControl
};