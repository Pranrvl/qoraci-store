<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Qoraci Store</title>
     
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-default/default.css" rel="stylesheet">

    <style>
        body { display: flex; flex-direction: column; min-height: 100vh; }
        main { flex: 1; }
    </style>
</head>
<body>

    <?php include 'includes/navbar.php'; ?>

    <?php 
    $page = isset($_GET['page']) ? $_GET['page'] : 'home';
    

    if ($page == 'home') {
        $mainClass = 'container-fluid p-0';
    } else {
        $mainClass = 'container page-spacer';
    }
    ?>

    <main class="<?php echo $mainClass; ?> page-animation">
        <?php
        switch ($page) {
            case 'home': include 'pages/home.php'; break;
            case 'menu': include 'pages/menu.php'; break;
            case 'news': include 'pages/news.php'; break;
            case 'credit': include 'pages/credit.php'; break;
            case 'checkout': include 'pages/checkout.php'; break;
            case 'product': include 'pages/product.php'; break;
            default: include 'pages/home.php'; break;
        }
        ?>
    </main>

      <?php include 'includes/dock.php'; ?>
    <?php include 'includes/footer.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
    
    <script src="assets/js/script.js"></script>

</body>
</html>
</body>
</html>