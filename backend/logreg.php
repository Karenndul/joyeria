<?php
    include ("conexion.php");

    if (isset($_POST)){        
        if(isset($_POST['tipo'])){                
            if($_POST['tipo']=="log"){
                $correo = $_POST['correo'];
                $pass = $_POST['pas'];
                $query = "select * from usuario where correo = '".$correo."'";
                $result = mysqli_query($conn, $query);        
                if(!$result){
                    die('Consulta fallida'.mysqli_error($conn));
                }else{
                    $json = array();
                    if(mysqli_num_rows($result)==1){
                        $row =  mysqli_fetch_array($result);
                        if($row['contrasena']==$pass){
                            $json[]=array(
                                'val' => 'true',
                                'id' => $row['id']
                            );
                            $string = json_encode($json);
                            mysqli_close($conn);                            
                            echo $string;
                        }else{  
                            $json[] = array(
                                'val' => 'false'                                
                            );
                            $string = json_encode($json);
                            mysqli_close($conn);                            
                            echo $string;
                        }
                    }else{
                        $json[] = array(
                            'val' => 'cero'                                
                        );
                        $string = json_encode($json);
                        mysqli_close($conn);                            
                        echo $string;
                    }        
                }
            }else if($_POST['tipo']=="reg"){
                $nom = $_POST['nombre'];
                $correo = $_POST['correo'];
                $passw = $_POST['passw'];
                $query = "insert into usuario (nombre, correo, contrasena) values ('$nom','$correo','$passw')";
                $result = mysqli_query($conn, $query);        
                if(!$result){
                    die('Consulta fallida'.mysqli_error($conn));
                }else{
                    $query2 = "select * from usuario where nombre = '.$nom.'";
                    $result2 = mysqli_query($conn, $query2);        
                    if(!$result2){
                        die('Consulta fallida'.mysqli_error($conn));
                    }else{
                        $json2 = array();
                        if(mysqli_num_rows($result2)==1){
                            $row2 =  mysqli_fetch_array($result2);
                            $json2[] = array(
                                'val' => 'ok',
                                'id' => $row2['id']
                            );
                            $string2 = json_encode($json2);
                            mysqli_close($conn);                            
                            echo $string2;
                        }
                    }
                }
            }
        }
    }
?>