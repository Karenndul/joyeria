$(document).ready(function(){
    console.log("todo chido");
    // verificación de inicio de sesión
    if(localStorage.getItem("user")!="0"){
        $('#logs').text("Perfil");
        $('#logs').attr("href","/servicios/count/usuario.html");
    }
    // función para cerrar sesión
    $('#cerrar').click(function(){
        localStorage.setItem("user","0");
        $(location).attr('href','/servicios/');
    });
    // función para boton de datos personales
    $('#personal').click(function(){
        // modificación de titulo de contenido
        $('#titulo').html(`<h3>Datos</h3>`);
        var datosD = new FormData;
        datosD.append("tipo","personal");        
        datosD.append("id",localStorage.getItem("user"));
        $.ajax({
            type:'POST',
            cache:false,
            contentType:false,
            processData: false,
            data: datosD,
            url: '/servicios/backend/dCcU.php'  
        }).done(function(res){  
            let dat = JSON.parse(res);
            var estado = "";
            var colonia = "";
            var calle = "";
            var numero = 0;
            var codigo = 0;
            var telefono = 0;
            if (dat[0].val=="complete") {
                estado = dat[0].estado;
                colonia = dat[0].colonia;
                calle = dat[0].calle;
                numero = dat[0].numero;
                codigo = dat[0].codigo;
                telefono = dat[0].telefono;
            }
            $('#principal').html(
                `<form>
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nombre" value="${dat[0].nombre}">
                    </div>
                    <div class="mb-3">
                        <label for="correo" class="form-label">Correo electrónico</label>
                        <input type="email" class="form-control" id="correo" aria-describedby="emailHelp" value="${dat[0].correo}">
                    </div>
                    <div class="mb-3">
                        <label for="contra" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="contra" value="${dat[0].contrasena}">
                    </div>
                    <hr>
                    <div class="mb-3">
                        <label for="esta" class="form-label">Estado</label>
                        <input type="text" class="form-control" id="esta" value="${estado}">
                    </div>
                    <div class="mb-3">
                        <label for="col" class="form-label">Colonia</label>
                        <input type="text" class="form-control" id="col" value="${colonia}">
                    </div>
                    <div class="mb-3">
                        <label for="cal" class="form-label">Calle</label>
                        <input type="text" class="form-control" id="cal" value="${calle}">
                    </div>
                    <div class="mb-3">
                        <label for="num" class="form-label">Número</label>
                        <input type="text" class="form-control" id="num" value="${numero}">
                    </div>
                    <div class="mb-3">
                        <label for="cod" class="form-label">Código</label>
                        <input type="text" class="form-control" id="cod" value="${codigo}">
                    </div>
                    <div class="mb-3">
                        <label for="tele" class="form-label">Teléfono</label>
                        <input type="text" class="form-control" id="tele" value="${telefono}">
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </form>`
            );
        }).fail();
        // formulario de datos        
    });
    // función para carrito de compras
    $('#carrito').click(function(){
        // modificación de titulo de contenido
        $('#titulo').html(`<h3>Selección</h3>`);
        mpC();
        // tabla de productos        
    });    
    function mpC(){
        var datosD = new FormData;
        datosD.append("tipo","carrito");        
        datosD.append("id",localStorage.getItem("user"));
        $.ajax({
            type:'POST',
            cache:false,
            contentType:false,
            processData: false,
            data: datosD,
            url: '/servicios/backend/dCcU.php'  
        }).done(function(res){  
            let dat = JSON.parse(res);     
            console.table(dat);   
            var pagi = 0;
            if(dat[0].tipo != "noll"){
                dat.forEach(d=>{
                    pagi=pagi + parseInt(d.valores.costo);                            
                });
            }            
            $('#principal').html(
                `<div class="card">
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Producto</th>
                                    <th scope="col">Imagen</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Costo</th>
                                    <th scope="col">Descartar</th>
                                </tr>
                            </thead>
                            <tbody id = "carritoB">                    
                            </tbody>
                        </table>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col"></div>
                                <div class="col-md-auto"><h3>Cantidad a pagar:</h3></div>
                                <div class="col col-lg-2" id="pago">                                    
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#metodos">
                            pagar
                        </button>
                    </div>
                </div>
                <div class="modal fade" id="metodos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Simulación de pago</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                            <h5 class="card-title">Pago referenciado</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Código de barras</h6>
                            <p class="card-text">Pago en dependencias OXXO, Bodega Aurrera, Farmacias Guadalajara.</p>
                        </div>
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                            <h5 class="card-title">Cantidad a pagar</h5>
                            <h6 class="card-subtitle mb-2 text-muted">$ ${pagi}.00 MXN</h6>                            
                        </div>
                    </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="final">Aceptar</button>
                    </div>
                    </div>
                </div>
                </div>
                `
            ); 
            $('#final').click(function(){
                let fecha = new Date(),
                formateada = fecha.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                var datosD = new FormData;
                datosD.append("tipo","pago");        
                datosD.append("id",localStorage.getItem("user"));
                datosD.append("fecha",formateada);
                $.ajax({
                    type:'POST',
                    cache:false,
                    contentType:false,
                    processData: false,
                    data: datosD,
                    url: '/servicios/backend/pago.php'  
                }).done(function(re){
                    if(re == "complete"){
                        mpC();
                        alert("Se completo la compra");
                    }
                }).fail();
            });   
            let template = ""    ;
            var suma = 0;
            if(dat[0].tipo=="ok"){ 
                var a = 1;
                dat.forEach(d=>{
                    suma=suma + parseInt(d.valores.costo);
                    template +=
                        `<tr>
                            <td>${a}</td>
                            <td>${d.valores.nombre}</td>
                            <td class="im"><img src="${d.valores.imagen}" alt="producto"></td>
                            <td>${d.valores.cantidad}</td>
                            <td>${d.valores.costo}</td>
                            <td><a class="basura borra"><i class="fa-solid fa-trash-can"></i></a></td>
                        </tr>
                        `                    
                    a++;                 
                });
                $('#carritoB').html(template)
                $('#pago').html(`<h3>$ ${suma}.00</h3>`);
                const borrado = document.querySelectorAll(".borra");
                borrado.forEach(bo=>{
                    bo.addEventListener("click",function() {
                        var c = $(this).parent(); 
                        var t = c.parent();
                        var d = t.find(".im");
                        var o = d.find("img");
                        console.log(o.attr("src"));
                        var datosD = new FormData;
                        datosD.append("tipo","eliminar");
                        datosD.append("imagen",o.attr("src"));
                        $.ajax({
                            type:'POST',
                            cache:false,
                            contentType:false,
                            processData: false,
                            data: datosD,
                            url: '/servicios/backend/dCcU.php'  
                        }).done(function(ress){
                            if(ress == "okay"){
                                mpC();
                                alert("Se elimino el producto del carrito");
                            }
                        }).fail();
                    });
                });
            }       
        }).fail();
    }    
    // función de compras realizadas
    $('#compra').click(function(){
        // modificación de titulo de contenido
        $('#titulo').html(`<h3>Historial</h3>`);
        var datosD = new FormData;
        datosD.append("tipo","compras");        
        datosD.append("id",localStorage.getItem("user"));
        $.ajax({
            type:'POST',
            cache:false,
            contentType:false,
            processData: false,
            data: datosD,
            url: '/servicios/backend/dCcU.php'  
        }).done(function(resc){
            let dat = JSON.parse(resc);
            $('#principal').html(
                `<div class="card">
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Producto</th>
                                    <th scope="col">Imagen</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Costo</th>
                                    <th scope="col">Fecha</th>
                                </tr>
                            </thead>
                            <tbody id = "comprasB">                    
                            </tbody>
                        </table>
                    </div>
                </div>
                `
            ); 
            console.log(dat[0].tipo);          
            if(dat[0].tipo=="ok"){ 
                let template = ""    ;
                var a = 1;
                dat.forEach(d=>{                    
                        template+=`<tr>
                            <td>${a}</td>
                            <td>${d.valores.nombre}</td>
                            <td><img src="${d.valores.imagen}" alt="producto"></td>
                            <td>${d.valores.cantidad}</td>
                            <td>${d.valores.costo}</td>
                            <td>${d.valores.fecha}</td>
                        </tr>
                        `
                    a++;
                });
                $('#comprasB').html(template);
            } 
        }).fail();
        // tabla de compras        
    });  
    const collares = document.querySelectorAll(".pC");
        collares.forEach(collar => {
            collar.addEventListener("click",function() {
                var c = $(this).parent();         
                var t = c.parent();
                var d = t.find(".tpC");
                var d1 = t.find(".npC");
                var d2 = t.find(".cpC");
                var d3 = t.find("input");
                var datosD = new FormData;
                datosD.append("tipo","añadir");        
                datosD.append("id",localStorage.getItem("user"));
                datosD.append("imagen",d.attr("src"));
                datosD.append("nombre",d1.html());
                datosD.append("cantidad",d3.val());
                datosD.append("costo",d2.html());
                $.ajax({
                    type:'POST',
                    cache:false,
                    contentType:false,
                    processData: false,
                    data: datosD,
                    url: '/servicios/backend/actionP.php'  
                }).done(function(ress){
                    if(ress == "ok"){
                        alert("Se ha añadido el producto al carrito");
                    }
                }).fail();
            });
        });            
});