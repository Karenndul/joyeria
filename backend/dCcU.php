<?php
    include("conexion.php");

    if(isset($_POST)){
        if(isset($_POST['tipo'])){
            if($_POST['tipo']=="personal"){
                $id = $_POST['id'];
                $query = "select * from usuario where id = $id";
                $result = mysqli_query($conn, $query);        
                if(!$result){
                    die('Consulta fallida'.mysqli_error($conn));
                }else{
                    $json = array();
                    if(mysqli_num_rows($result)==1){
                        $query2 = "select * from direccion where usu = $id";
                        $result2 = mysqli_query($conn, $query2);        
                        if(!$result2){
                            die('Consulta fallida'.mysqli_error($conn));
                        }else{
                            if(mysqli_num_rows($result2)==1){
                                $row =  mysqli_fetch_array($result);
                                $row2 =  mysqli_fetch_array($result2);
                                $json[]=array(
                                    'val' => 'complete',
                                    'nombre' => $row['nombre'],                            
                                    'correo' => $row['correo'],
                                    'contrasena' => $row['contrasena'],
                                    'estado' => $row2['estado'],
                                    'colonia' => $row2['colonia'],
                                    'calle' => $row2['calle'],
                                    'numero' => $row2['numero'],
                                    'codigo' => $row2['codigo'],
                                    'telefono' => $row2['tel']
                                );
                                $string = json_encode($json);
                                mysqli_close($conn);                            
                                echo $string;
                            }else{
                                $row =  mysqli_fetch_array($result);
                                $json[]=array(
                                    'val' => 'uncom',
                                    'nombre' => $row['nombre'],                            
                                    'correo' => $row['correo'],
                                    'contrasena' => $row['contrasena']
                                );
                                $string = json_encode($json);
                                mysqli_close($conn);                            
                                echo $string;
                            }
                        }                        
                    }
                }
            }else if($_POST['tipo']=="carrito") {
                $id = $_POST['id'];
                $query = "select * from carrito where usua = $id";
                $result = mysqli_query($conn, $query);        
                if(!$result){
                    die('Consulta fallida'.mysqli_error($conn));
                }else{
                    $json = array();
                    if (mysqli_num_rows($result)>0) {
                        while($row = mysqli_fetch_array($result)){
                            $json[]=array( 
                                'tipo' => 'ok',
                                'valores' => array(
                                    'nombre' => $row['nombrep'],
                                    'imagen' => $row['imagen'],
                                    'cantidad' => $row['cantidad'],
                                    'costo' => $row['costo']
                                )                                
                            );                            
                        }
                        $string = json_encode($json);
                        mysqli_close($conn);                            
                        echo $string;
                    }else{
                        $json[] = array(
                            'tipo'=>'noll'
                        );
                        $string = json_encode($json);
                        mysqli_close($conn);                            
                        echo $string;
                    }                        
                }
            }else if($_POST['tipo']=="compras"){
                $id = $_POST['id'];
                $query = "select * from compra where usuario = $id";
                $result = mysqli_query($conn, $query);        
                if(!$result){
                    die('Consulta fallida'.mysqli_error($conn));
                }else{
                    $json = array();
                    if (mysqli_num_rows($result)>=1) {
                        while($row = mysqli_fetch_array($result)){
                            $json[]=array( 
                                'tipo' => 'ok',
                                'valores' => array(
                                    'nombre' => $row['nombre'],
                                    'imagen' => $row['imagen'],
                                    'cantidad' => $row['cantidad'],
                                    'costo' => $row['costo'],
                                    'fecha' => $row['fecha']
                                )                                
                            );                            
                        }
                        $string = json_encode($json);
                        mysqli_close($conn);                            
                        echo $string;
                    }else{
                        $json[] = array(
                            'tipo'=>'false'
                        );
                        $string = json_encode($json);
                        mysqli_close($conn);                            
                        echo $string;
                    }
                }
            }else if($_POST['tipo']=="eliminar"){
                $ima = $_POST['imagen'];
                $query = "delete from carrito where imagen='$ima'";
                $result = mysqli_query($conn, $query);        
                if(!$result){
                    die('Consulta fallida'.mysqli_error($conn));
                }else{
                    echo"okay";
                }
            }
        }
    }
?>