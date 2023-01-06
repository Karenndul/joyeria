<?php
    include("conexion.php");

    if(isset($_POST)){
        if($_POST['tipo'] == "pago"){
            $id = $_POST['id'];
            $fecha = $_POST['fecha'];            
            $query = "select * from carrito where usua = $id";
                $result = mysqli_query($conn, $query);        
                if(!$result){
                    die('Consulta fallida'.mysqli_error($conn));
                }else{
                    if(mysqli_num_rows($result)>=1){
                        while($row = mysqli_fetch_array($result)){
                            $query2 = "insert into compra (usuario,nombre,imagen,cantidad,costo,fecha) values ($id,'".$row['nombrep']."', '".$row['imagen']."', ".$row['cantidad'].",".$row['costo'].", '".$fecha."')";
                            $result2 = mysqli_query($conn, $query2);        
                            if(!$result2){
                                die('Consulta fallida'.mysqli_error($conn));
                            }else{
                                $query3 = "truncate table carrito";
                                $result3 = mysqli_query($conn, $query3);        
                                if(!$result3){
                                    die('Consulta fallida'.mysqli_error($conn));
                                }else{
                                    echo "complete";
                                }
                            }
                        }
                    }
                }
        }
    }
?>