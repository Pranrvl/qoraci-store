<?php
// ==========================================
// KATALOG DATA QORACI STUDIO
// ==========================================
$katalog = [
    [
        "id" => "1",
        "nama" => "T-Shirt Bloom Where You Are Planted",
        "series" => "Vol 1",
        "harga" => 97000, // HARUS ANGKA MURNI tanpa titik atau Rp
        "gambar" => "T-Shirt_1.png", 
        "warna" => "#1D1D1F" 
    ]
];
?>

<div class="container py-5">
    
    <div class="text-center mb-5">
        <h5 class="text-uppercase ls-2 fw-bold">designed by</h5>
        <h2 class="display-5 fw-bold">Qoraci Store</h2>
    </div>

    <div class="chroma-grid">
        <?php foreach ($katalog as $item) : ?>
            <article class="chroma-card" 
                     onclick="window.location.href='index.php?page=product&id=<?php echo $item['id']; ?>'"
                     style="cursor: pointer; --card-border: <?php echo $item['warna']; ?>;">
                
               <div class="chroma-img-wrapper">
                    <img src="assets/img/<?php echo $item['gambar']; ?>" 
                         alt="<?php echo htmlspecialchars($item['nama'], ENT_QUOTES); ?>"
                         onerror="this.src='https://placehold.co/300x400?text=Image+Error'">
                </div>

                <footer class="chroma-info">
                    <h5 class="name mb-1"><?php echo htmlspecialchars($item['nama']); ?></h5>
                    
                    <span class="price d-block mb-2">Rp <?php echo number_format($item['harga'], 0, ',', '.'); ?></span>
                    <div class="stock-status mt-3 d-flex align-items-center">
                        <span style="display:inline-block; width:6px; height:6px; background-color:#1D1D1F; border-radius:50%; margin-right:8px;"></span>
                        <span style="font-size: 0.8rem; font-weight: 500; color: #1D1D1F; letter-spacing: 0.5px;">In Stock</span>
                    </div>
                </footer>
            </article>
        <?php endforeach; ?>
        
        <div class="chroma-overlay"></div>
    </div>

</div>
