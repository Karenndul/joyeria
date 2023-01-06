$(document).ready(function(){
    localStorage.setItem("user","0");
    // función de la interfaz de login
    document.getElementById("btn_iniciar").addEventListener("click",iniciar);
    document.getElementById("btn_register").addEventListener("click",register);

    window.addEventListener("resize",anchoPage);

    var contenedor_login_register = document.querySelector(".contenedor_login_register");
    var formulario_login = document.querySelector(".formulario_login");
    var formulario_register = document.querySelector(".formulario_register");
    var caja_trasera_login = document.querySelector(".caja_trasera_login");
    var caja_trasera_register = document.querySelector(".caja_trasera_register");    
    function anchoPage(){
        if(window.innerWidth>850){
            caja_trasera_login.style.display = "block";
            caja_trasera_register.style.display = "block";        
        }else{
            caja_trasera_register.style.display = "block";
            caja_trasera_register.style.opacity = "1";
            caja_trasera_login.style.display = "none";
            formulario_login.style.display = "block";
            formulario_register.style.display = "none";
            contenedor_login_register.style.left = "0px";
        }
    }

    anchoPage();

    function iniciar(){
        if(window.innerWidth>850){
            formulario_register.style.display = "none";
            contenedor_login_register.style.left = "10px";
            formulario_login.style.display = "block";
            caja_trasera_register.style.opacity = "1";
            caja_trasera_login.style.opacity = "0";
        }else{
            formulario_register.style.display = "none";
            contenedor_login_register.style.left = "0px";
            formulario_login.style.display = "block";
            caja_trasera_register.style.display = "block";
            caja_trasera_login.style.display = "none";
        }  
    }

    function register(){
        if(window.innerWidth>850){
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "410px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.opacity = "0";
            caja_trasera_login.style.opacity = "1";
        }else{
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.display = "none";
            caja_trasera_login.style.display = "none";
            caja_trasera_login.style.opacity = "1"
        }
        
    }  
    // fin de login   
    $('#logi').submit(function(e){
        e.preventDefault();
        var datos = new FormData;
        datos.append("tipo","log");
        datos.append("correo",$('#correoLog').val());
        datos.append("pas",$('#passLog').val());
        $.ajax({
            type:'POST',
            cache:false,
            contentType:false,
            processData: false,
            data: datos,
            url: '/servicios/backend/logreg.php'  
        }).done(function(res){            
            let dat = JSON.parse(res);
            if(dat[0].val=="cero"){
                console.table(dat);
            }else if(dat[0].val=="false"){
                console.table(dat);
            }else if(dat[0].val=="true"){                
                localStorage.setItem("user",dat[0].id);
                $(location).attr('href','usuario.html');
            }
        }).fail();
        // localStorage.setItem("user","1");
        // $(location).attr('href','usuario.html');
    }); 
    $('#reg').submit(function(f){
        f.preventDefault();
        var datosR = new FormData;
        datosR.append("tipo","reg");
        datosR.append("nombre",$('#nomSin').val());
        datosR.append("correo",$('#correoSin').val());
        datosR.append("passw",$('#passSin').val());       
        $.ajax({
            type:'POST',
            cache:false,
            contentType:false,
            processData: false,
            data: datosR,
            url: '/servicios/backend/logreg.php'
        }).done(function(resr){
            let datr = JSON.parse(resr);
            if(datr[0].val=="ok"){
                localStorage.setItem("user",datr[0].id);
                $(location).attr('href','usuario.html');
            }
        }).fail();
    });
});
    