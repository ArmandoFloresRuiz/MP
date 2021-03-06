window.onload = function(){
    btnRegistro = document.getElementById("btnRegistro");
    ingreso =  document.getElementById("ingreso");
    registro =  document.getElementById("registro");
    btnRegistroR = document.getElementById("btnRegistroR");
    txtCorreo = document.getElementById("correoR");
    txtContrasena = document.getElementById("contrasenaR");
    txtConfirmar = document.getElementById("confirmacionR");
    txtFecha = document.getElementById("fecha");
    txtNombre = document.getElementById("nombreR");
    btnIngresar = document.getElementById("btnIngresar");
    txtCorreoi = document.getElementById("correoi");
    txtContrasenai = document.getElementById("contrasenai");
    enviarM = document.getElementById("enviarM");
    txtPara = document.getElementById("correoM");
    txtMensaje =  document.getElementById("mensajeM");
    nombreP=document.getElementById("nombreP");
    camera=document.getElementById("camera");
    photo=document.getElementById("photo");
    mapa=document.getElementById("mapa");
    btnOpen=document.getElementById("btnOpen");
   
    
    if (localStorage.getItem("login") !== "1")
    {
        ingreso.style.display = "block";
        principal.style.display = "none";
        redactar.style.display = "none";
        document.getElementById("camara").style.display = "none";
    }
    else
    {
        ingreso.style.display = "none";
        principal.style.display = "block";
        redactar.style.display = "block";
        nombre = localStorage.getItem("nombre");
        correo = localStorage.getItem("correo");
        document.getElementById("nombreP").innerHTML = nombre;
        leerM();
    }
    

};

btnRegistro.addEventListener("click", function(){
        ingreso.style.display = "none";
        registro.style.display = "block";
    });
btnRegistroR.addEventListener("click", function() {
    if(txtCorreo.value == ""){
        alert("Ingresa tu Correo");
        txtCorreo.classList.add("errorCampo");
        return false;
    }else{
        txtCorreo.classList.remove("errorCampo");
        txtContrasena.classList.remove("errorCampo");
        txtConfirmar.classList.remove("errorCampo");
        txtFecha.classList.remove("errorCampo");
    }
    if (txtContrasena.value == ""){
        alert("Ingresa tus credenciales");
        txtContrasena.classList.add("errorCampo");
        return false;
    }else{
        txtCorreo.classList.remove("errorCampo");
        txtContrasena.classList.remove("errorCampo");
        txtConfirmar.classList.remove("errorCampo");
        txtFecha.classList.remove("errorCampo");
    }
    if (txtConfirmar.value == ""){
        alert("Confirma tus credenciales");
        txtConfirmar.classList.add("errorCampo");
        return false;
    }else{
        txtCorreo.classList.remove("errorCampo");
        txtContrasena.classList.remove("errorCampo");
        txtConfirmar.classList.remove("errorCampo");
        txtFecha.classList.remove("errorCampo");
    }
    if (txtFecha.value == ""){
        alert("Ingresa tu Fecha");
        txtFecha.classList.add("errorCampo");
        return false;
    }else{
        txtCorreo.classList.remove("errorCampo");
        txtContrasena.classList.remove("errorCampo");
        txtConfirmar.classList.remove("errorCampo");
        txtFecha.classList.remove("errorCampo");
    }
    if (txtContrasena.value !== txtConfirmar.value) {
        alert("Las credenciales no coinciden");
        txtContrasena.classList.add("errorCampo");
        txtConfirmar.classList.add("errorCampo");
        return false;
    }else{
        txtCorreo.classList.remove("errorCampo");
        txtContrasena.classList.remove("errorCampo");
        txtConfirmar.classList.remove("errorCampo");
        txtFecha.classList.remove("errorCampo");
    }
    let datos = new FormData();
    datos.append("correoR", txtCorreo.value);
    datos.append("nombreR", txtNombre.value);
    datos.append("contrasenaR", txtContrasena.value);
    datos.append("fechaR", txtFecha.value);


    fetch("http://tpaafr.orgfree.com/registro.php", {
        method: 'POST',
        body: datos
    })

    .then(function (response){
        if (response.ok){
            alert("Usuario registrado")
            ingreso.style.display = "block";
            registro.style.display = "none";
        }
        else {
            alert("Ocurrio una falla");
            console.log(response);
        }
    })
    .catch(function(err){
        alert("Fallo  ->"+ err);
        console.log(err);
    })


    });
btnIngresar.addEventListener("click", function() {
    if (txtCorreoi.value == ""){
        alert("Ingresa tu Correo");
        txtCorreoi.classList.add("errorCampo");
        return false
    }else{
        txtCorreoi.classList.remove("errorCampo");
    }
    if (txtContrasenai.value == ""){
        alert("Ingresa tu contrase??a");
        txtContrasenai.classList.add("errorCampo");
        return false
    }else{
        txtContrasenai.classList.remove("errorCampo");
    }

    let datosi = new FormData();
    datosi.append("correoi", txtCorreoi.value);
    datosi.append("contrasenai", txtContrasenai.value);

    fetch( "http://tpaafr.orgfree.com/ingreso.php", {
        method: 'POST',
        body: datosi
    })

    .then(function (response){
        return response.json();
    })

    .then(function(data){
        if (data.fallo == "contrasena"){
            alert("Contrase??a incorrecta");
            return false
        }

        if (data.fallo == "usuario"){
            alert("No existe el usuario");
        }
        else {
            nombre = data.nombre;
            correo = data.correo;
            ingreso.style.display = "none";
            principal.style.display = "block";
            nombreP.innerHTML = nombre;
            localStorage.setItem("login",1);
            localStorage.setItem("nombre",nombre);
            localStorage.setItem("correo",correo);
            leerM();
            document.getElementById("redactar").style.visibility="visible";
            document.getElementById("redactar").style.display="block";
        }
    })
    .catch(function(err){
        alert("Fallo  ->"+ err);
        console.log(err);
    })


    });

enviarM.addEventListener("click", function(){
    if(txtPara.value == ""){
        alert("Ingresa a quien va dirijido el mensaje");
        txtPara.classList.add("errorCampo");
        return false;
    }else{
        txtPara.classList.remove("errorCampo");
        txtMensaje.classList.remove("errorCampo");
        
        }
    if (txtMensaje.value == ""){
            alert("Ingresa un mensaje");
            txtMensaje.classList.add("errorCampo");
            return false;
    }else{
        txtPara.classList.remove("errorCampo");
        txtMensaje.classList.remove("errorCampo");
        
        }

        let datosm = new FormData();
        datosm.append("correoM", txtPara.value);
        datosm.append("mensajeM", txtMensaje.value);
    
        fetch("http://tpaafr.orgfree.com/guardarMensaje.php", {
            method: 'POST',
            body: datosm
        })

        .then(function (response){
            if (response.ok){
                alert("Mensaje Enviado")
            }
            else {
                alert("Ocurrio un error");
                console.log(response);
            }
        })
        .catch(function(err){
            alert("Error ->"+ err);
            console.log(err);
        })
});
    
function abrirBarra() {
    document.getElementById("barraMenu").style.width = "250px";
}

function cerrarBarra() {
    document.getElementById("barraMenu").style.width = "0px";
}

//leer mensajes
 function leerM() {
     let datosLM = new FormData();
     datosLM.append("correoUsuario",correo);
     fetch("http://tpaafr.orgfree.com/leerMensajes.php", {
        method: 'POST',
        body: datosLM
    })
    .then(function (response){
        return response.json();
        
    })
    .then(function (data){
        for (let x = 0; x < data.length; x++) {
         document.getElementById("mensajes").innerHTML=
         document.getElementById("mensajes").innerHTML + data[x].mensaje + "<br>"+
         data[x].fechahora + "<br>";
        }
    });
    
   
}

function tomarFoto(){
    redactar.style.display="none";
    document.getElementById("mensajes").style.display="none";
    document.getElementById("camara").style.display="block";
    cerrarBarra();
}

function mensajes(){
    redactar.style.display="block";
    document.getElementById("mensajes").style.display="block";
    document.getElementById("camara").style.display="none";
    cerrarBarra();
}
document.getElementById("btnOpen").addEventListener("click", function(){
    camera.click();
});

camera.addEventListener("change", function(e){
    ruta = URL.createObjectURL(e.target.files[0]);
    obtenerLugar();
    photo.src = ruta;
    if (obtenerSO() == "iOS") {
        let link = document.createElement('a');
        link.download = "test.png";
        link.href = ruta;
        link.click();
        alert("Foto capturada");
    }
});

function cerrarSesion() {
    cerrarBarra();
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.setItem("login", 0 );
    
    redactar.style.display = "none";
    document.getElementById("principal").style.display = "none";
    document.getElementById("mensajes").style.display = "none";
    document.getElementById("camara").style.display = "none";
    document.getElementById("ingreso").style.display = "block";

}

function obtenerSO() {
    let so = null;
    let platform = window.navigator.platform,
        iosPlatforms = ['iPhone','iPad','iPod'];
    if (iosPlatforms.includes(platform)){
        so = 'iOS';   
    }
    return so;
}

mapa.addEventListener('click', function(){
    window.open("http://www.openstreetmap.org/?mlat=" + coordenadas.lat + "&mlon=" + coordenadas.lon + "&zoom=20");
});

function obtenerLugar() {
    coordenadas = {lat: 0, lon: 0};
    navigator.geolocation.getCurrentPosition(function(position) {
        coordenadas = {lat: position.coords.latitude, lon: position.coords.longitude}

        fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat="+ coordenadas.lat + "&lon=" + coordenadas.lon)
        .then ( response => response.json())
        .then ( data => {
            document.getElementById("lugar").value = data.address.country + "" + data.address.state;
        })
        .catch(error=> {
            console.log(error);
            coordenadas={lat:0, lon:0 };
        });
    });
    
}
if ('serviceWorker' in navigator){
    window.addEventListener('load',() => {
        navigator.serviceWorker.register('../sw.js').then( () => {
            console.log('Service Worker Registered')
        })
    })
}



 