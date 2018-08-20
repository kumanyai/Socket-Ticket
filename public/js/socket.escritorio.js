var socket = io();

let seachParams = new URLSearchParams(window.location.search); //OBTENEMOS LA URL
if (!seachParams.has('escritorio')){ //PREGUNTAMOS SI VIENE EL 'ESCRITORIO' EN LA URL NOS DEVUELVE UN TRUE O UN FLASE
    window.location = 'index.html';//SINO VIENE, NOS REDIRECCIONA A INDEX.HTML
    throw new  Error('EL ESCRITORIO ES REQUERIDO')//MANDAMOS UN ERROR
}

let escritorio = seachParams.get('escritorio');//OBTENEMOS EL NUMERO DEL ESCRITORIO
var label = $('small');
console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click',function () {
    socket.emit('atenderTicket', {
        escritorio: escritorio,
    }, function (resp) {

        if (resp === 'No hay tickets'){
            alert(resp);
            return;
        }

        label.text('Ticket' + resp.numero);
    })
});