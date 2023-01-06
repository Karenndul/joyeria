<?php
    include ('conexion.php');

    if(isset($_GET)){
        $pag = $_GET['p'];
        if($pag == 1){
            $query = "select * from productos where categoria = 'arete' limit 0,8";
            $result = mysqli_query($conn, $query);        
            if(!$result){
                die('Consulta fallida'.mysqli_error($conn));
            }                    
        }else if($pag == 2){
            $query = "select * from productos where categoria = 'arete' limit 9,6";
            $result = mysqli_query($conn, $query);        
            if(!$result){
                die('Consulta fallida'.mysqli_error($conn));
            }
        }
    }                
?>