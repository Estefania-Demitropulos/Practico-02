//Declaración de variables
var nombreUsuario= 'Estefania Demitropulos';
var saldoCuenta= 35000;
var limiteExtraccion= 7000;
var restarSaldoDeLaCuenta= function(dinero){
    var nuevoSaldo= saldoCuenta - dinero;
}
var servicioAgua = 350;
var servicioTelefono = 425;
var servicioLuz = 210;
var servicioInternet = 570;
var cuentasAmigas = ['1234567', '7654321'] //Array
var codigoDeSeguridad = '1234';

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}


//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var limite = prompt('Ingrese el nuevo límite de extracción');
    var nuevoLimite = parseInt(limite);
    if(accionCancelar(nuevoLimite) || nuevoLimite < 100){
        alert('Solo se admiten valores númericos mayores a $100.');
    } else {
        limiteExtraccion = nuevoLimite;
        actualizarLimiteEnPantalla();
        alert('El nuevo límite de extración es de: $' + limiteExtraccion);
    }
}

function extraerDinero() {
    var dinero = prompt('Ingrese la cantidad de dinero que desea extraer');
    var dineroRetirado = parseInt(dinero);
    if(accionCancelar(dineroRetirado)){
        alert('No ingresó ningún monto.');
    } else if(!haySaldoDisponible(dineroRetirado)){
        alert('No hay saldo suficiente en tu cuenta');
    } else if (dineroRetirado > limiteExtraccion) {
        alert('El monto que quieres retirar excede el límite de extracción');
    } else if (dineroRetirado % 100 != 0){
        alert('Solo puede extrar billetes de $100');
    } else{
        var saldoAnterior = saldoCuenta;
        saldoCuenta= restarDinero(dineroRetirado); //Aqui utilizo una función genérica para restar dinero
        actualizarSaldoEnPantalla();
        alert('Has retirado: $' + dineroRetirado + '\nSaldo anterior: $' + saldoAnterior + '\nSaldo actual: $' + saldoCuenta);
    }
}

function accionCancelar(cancelar){ //función genérica
    if(isNaN(cancelar) || cancelar == null){
        return true;
    } else{
        return false;
    }
}

function haySaldoDisponible(montoAExtraer){ //función genérica
    var comprobar = montoAExtraer < saldoCuenta;
    return comprobar;
}

function restarDinero(montoARestar){ //función genérica
    return saldoCuenta - montoARestar;
}

function depositarDinero() {
    var dinero = prompt('Ingrese la cantidad de dinero que desea depositar');
    var dineroIngresado = parseInt(dinero);
    if(accionCancelar(dineroIngresado)){
        alert('No ingresó ningún monto.');
    } else {
        var saldoAnterior= saldoCuenta;
        saldoCuenta= saldoCuenta + dineroIngresado;
        actualizarSaldoEnPantalla();
        alert('Has depositado: $' + dineroIngresado + '\nSaldo anterior: $' + saldoAnterior + '\nSaldo actual: $' + saldoCuenta);
    }
}

function pagarServicio() {
    var servicio = prompt('Ingrese el número que corresponde con el servicio que quiere pagar' + '\n1- Agua' + '\n2- Teléfono' + '\n3- Luz' + '\n4- Internet');
    var servicioSeleccionado = parseInt(servicio);
    if(accionCancelar(servicioSeleccionado)){
        alert('No seleccionó ningún servicio.');
    } else {
        var verificarYPagar = function(servicio, nombreDelServicio) { //Hago una función genérica para utilizar en el switch
        if(!haySaldoDisponible(servicio)) {
            alert('No hay saldo suficiente en tu cuenta');
        } else {
            var saldoAnterior = saldoCuenta;
            saldoCuenta = restarDinero(servicio);
            alert('Has pagado el servicio ' + nombreDelServicio + '\nSaldo anterior: $' + saldoAnterior + '\nDinero descontado $' + servicio + '\nSaldo actual: $' + saldoCuenta);
        }
    }
    switch (servicioSeleccionado){
        case 1:
            verificarYPagar(servicioAgua, 'Agua');
            break;
        case 2:
            verificarYPagar(servicioTelefono, 'Teléfono');
            break;
        case 3:
            verificarYPagar(servicioLuz, 'Luz');
            break;
        case 4:
            verificarYPagar(servicioInternet, 'Internet');
            break;
        default:
            alert('No existe el servicio seleccionado.');
    }
    actualizarSaldoEnPantalla()
    }
}

function transferirDinero() {
    var quieroTrasferir = prompt('Ingrese el monto que desea transferir');
    var montoATransferir = parseInt(quieroTrasferir);
    if(accionCancelar(quieroTrasferir)){
        alert('No ha seleccionado ninguna cuenta.')
    } else if(!haySaldoDisponible(montoATransferir)) {
        alert('No hay saldo suficiente en tu cuenta');
    } else {
        var numeroDeCuentaAmiga = prompt('Ingrese el número de cuenta al que desea transferir el dinero');
        var indiceDeCuenta = cuentasAmigas.indexOf(numeroDeCuentaAmiga);
        if(indiceDeCuenta != -1){
            saldoCuenta= restarDinero(montoATransferir);
            alert('Se ha transferido $' + montoATransferir + '\nCuenta a la que transfirió: ' + numeroDeCuentaAmiga);
            actualizarSaldoEnPantalla()
        } else {
            alert('Solo puede transferir a una cuenta amiga.');
        }
    }
}

function iniciarSesion() {
    var pinDeSeguridad = prompt('Ingrese el código de su cuenta');
    if(accionCancelar(pinDeSeguridad)){
        alert('No ha ingresado ningún número.')
        iniciarSesion();
    } else if(pinDeSeguridad === codigoDeSeguridad){
        alert('Bienvenido/a' + nombreUsuario + ', ya puedes comenzar a realizar operaciones.');
    } else if(pinDeSeguridad != codigoDeSeguridad){
        saldoCuenta = 0;
        nombreUsuario = '';
        alert('El código es inconrrecto! Su dinero ha sido retenido por cuestiones de seguridad.');
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}