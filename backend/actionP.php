<?php
    include("conexion.php");
    if(isset($_POST)){
        if(isset($_POST['tipo'])){
            if ($_POST['tipo']=="añadir") {
                $id = $_POST['id'];
                $im = $_POST['imagen'];
                $nom = $_POST['nombre'];
                $sep = explode(" ", $_POST['costo']);
                $cos = $sep[1];
                $can = $_POST['cantidad'];
                $query = "insert into carrito (usua, nombrep, imagen, cantidad, costo) values ($id, '$nom', '$im', $can, $cos)";
                $result = mysqli_query($conn, $query);        
                if(!$result){
                    die('Consulta fallida'.mysqli_error($conn));
                }else{
                    echo "ok";
                }
            }
        }
    }    
?>