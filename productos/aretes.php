<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>                
    <link rel="stylesheet" href="../css/style.css">
    <title>Aretes y piercings</title>
</head>
<body>
    <?php
        include ("../backend/pArete.php");
    ?>
    <!-- header -->
    <div w3-include-html="../header.html"></div>
    <!-- fin de header -->
    <!-- main -->
    <main class="my-5 mx-5">    
        <!-- primera fila de productos -->
        <div class="row row-cols-1 row-cols-md-4 g-4">            
    <?php
    while($row = mysqli_fetch_array($result)){
    ?>    
            <div class="col">
                <div class="card h-100">
                    <img src="<?php echo $row['imagen'] ?>" class="card-img-top tpC" alt="arete">
                    <div class="card-body">
                        <h5 class="card-title npC"><?php echo $row['nombre'] ?></h5>
                        <h5 class="card-title cpC">$ <?php echo $row['costo'] ?> MXN</h5>
                        <p>Cantidad:</p><input type="number" name="canti" min="1" max = "10" value = "1">
                    </div>
                    <div class="card-footer">
                        <a href="#" class="btn btn-primary me-2 pC">Añadir al carrito</a> <a href="#" class="btn btn-primary">Comprar</a>
                    </div>
                </div>
            </div>                         
    <?php
    }
    ?>
        </div>                
    </main>
    <!-- fin de main -->
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center mt-2">                
            <li class="page-item"><a class="page-link" href = "/servicios/productos/aretes.php?p=1">1</a></li>
            <li class="page-item"><a class="page-link" href = "/servicios/productos/aretes.php?p=2">2</a></li>             
        </ul>
    </nav>
    <!-- complementos de boostrap y fontawesome -->
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <script src="/servicios/js/funcionalidad.js"></script>    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/ff88d5f5cd.js" crossorigin="anonymous"></script>
    <script src="http://www.w3schools.com/lib/w3data.js"></script>
    <script>
        w3IncludeHTML();
    </script>    
    <!-- fin de complementos -->
</body>
</html>