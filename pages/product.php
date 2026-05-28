<?php
// pages/product.php
// Pastikan variabel $id tersedia dari $_GET
$id = isset($_GET['id']) ? $_GET['id'] : 1;

// Simulasi database produk
$katalog = [
    "1" => [
        "nama" => "T-Shirt Bloom Where You Are Planted",
        "series" => "Vol 1",
        "harga" => 97000,
        "deskripsi" => "To bloom where you are planted is to gracefully embrace the soil you currently inhabit, finding the quiet courage to unfurl your petals exactly where you are. Rather than longing for a distant, perfect garden, it is the choice to radiate purpose and cultivate resilience in the present moment.",
        "gambar" => ["detail_1.png", "detail_2.png"], 
        "bahan" => "Heavy Cotton 24s Premium"
    ]
];

$product = isset($katalog[$id]) ? $katalog[$id] : $katalog["1"];

$jsName = addslashes($product['nama']); 
$jsImage = addslashes($product['gambar'][0]);
$select1ID = "opt1_prod";
$select2ID = "opt2_prod"; // Dummy for script.js structure if needed
?>

<div class="container py-5 mt-4">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.php?page=menu" class="text-muted text-decoration-none">Catalog</a></li>
            <li class="breadcrumb-item active fw-bold" aria-current="page" style="color: #1D1D1F;"><?php echo htmlspecialchars($product['nama']); ?></li>
        </ol>
    </nav>

    <div class="row mt-4 mb-5">
        
        <!-- Kolom Kiri: Slider Gambar -->
        <div class="col-lg-6 mb-4 mb-lg-0">
            <div id="productCarousel" class="carousel slide product-carousel shadow-sm" data-bs-ride="carousel" style="border-radius: 24px; overflow: hidden; background: #fff;">
                <div class="carousel-indicators">
                    <?php foreach ($product['gambar'] as $index => $img) : ?>
                        <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="<?php echo $index; ?>" class="<?php echo $index === 0 ? 'active' : ''; ?>" aria-current="true"></button>
                    <?php endforeach; ?>
                </div>
                
                <div class="carousel-inner">
                    <?php foreach ($product['gambar'] as $index => $img) : ?>
                        <div class="carousel-item <?php echo $index === 0 ? 'active' : ''; ?>">
                            <img src="assets/img/<?php echo $img; ?>" class="d-block w-100" style="object-fit: cover; aspect-ratio: 4/5;" alt="<?php echo htmlspecialchars($product['nama']); ?>" onerror="this.src='https://placehold.co/600x750?text=Please+Upload+<?php echo $img; ?>'">
                        </div>
                    <?php endforeach; ?>
                </div>
                
                <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true" style="background-color: rgba(0,0,0,0.5); border-radius: 50%; padding: 20px;"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true" style="background-color: rgba(0,0,0,0.5); border-radius: 50%; padding: 20px;"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>

        <!-- Kolom Kanan: Detail Produk -->
        <div class="col-lg-6 px-lg-5 d-flex flex-column justify-content-center">
            <div class="mb-2">
                <span class="badge text-uppercase" style="background-color: #F5F5F7; color: #86868B; letter-spacing: 1px; font-weight: 600; padding: 8px 12px; border-radius: 8px;"><?php echo htmlspecialchars($product['series']); ?></span>
            </div>
            
            <h1 class="fw-bold mb-3" style="font-family: 'Syne', sans-serif; font-size: 2.5rem; color: #1D1D1F; letter-spacing: -1px; line-height: 1.1;">
                <?php echo htmlspecialchars($product['nama']); ?>
            </h1>
            
            <h2 class="fw-bold mb-4" style="color: #1D1D1F; font-size: 1.75rem;">
                Rp <?php echo number_format($product['harga'], 0, ',', '.'); ?>
            </h2>
            
            <p class="text-muted mb-4" style="line-height: 1.6;">
                <?php echo htmlspecialchars($product['deskripsi']); ?>
            </p>


            
            <hr class="mb-4" style="opacity: 0.1;">

            <!-- Pemilihan Ukuran -->
            <div class="row align-items-end mb-4">
                <div class="col-md-8">
                    <label class="fw-bold mb-2 text-muted" style="font-size: 0.9rem;">Select Size</label>
                    <select class="form-select form-select-lg form-premium" id="<?php echo $select1ID; ?>" style="border-radius: 12px; border: 2px solid #E5E5EA; background-color: #F5F5F7; font-weight: 500;">
                        <option value="Size M">Medium (M)</option>
                        <option value="Size L">Large (L)</option>
                        <option value="Size XL">Extra Large (XL)</option>
                    </select>
                </div>
            </div>

            <!-- Tombol Aksi -->
            <button class="btn w-100 fw-bold btn-pill text-white shadow-sm mb-3" 
                    style="background-color: #1D1D1F; padding: 18px 0; font-size: 1.1rem; letter-spacing: 1px;"
                    onclick="addToCart('<?php echo $jsName; ?>', <?php echo $product['harga']; ?>, '<?php echo $select1ID; ?>', '<?php echo $select2ID; ?>', '<?php echo $jsImage; ?>')">
                ADD TO CART
            </button>
            
            <div class="d-flex align-items-center justify-content-center text-muted" style="font-size: 0.85rem;">
                <i class="fas fa-box me-2"></i> Free exclusive stickers included in every purchase
            </div>
            
        </div>
    </div>
</div>
