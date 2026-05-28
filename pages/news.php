<div class="container py-5">
    
    <div class="mb-5">
        <h2 class="fw-bold">Fashion & Streetwear Terkini</h2>
        <p class=>Informasi tren pakaian dan gaya busana terkini (Sumber: Google News)</p>
    </div>

    <?php
    $rss_url = "https://news.google.com/rss/search?q=fashion+streetwear+indonesia+trend&hl=id&gl=ID&ceid=ID:id";
    $rss = @simplexml_load_file($rss_url);

    $gambar_fashion = [
        'assets/img/slide1.png',
        'assets/img/slide2.png',
        'assets/img/slide3.png',
        'assets/img/slide4.png'
    ];

    if ($rss) {
        $limit = 2; 
        $count = 0;

        foreach ($rss->channel->item as $item) {
            if ($count >= $limit) break;

            $judul = $item->title;
            $link = $item->link;
            $tanggal = date('d M Y, H:i', strtotime($item->pubDate));
            
            $random_img = $gambar_fashion[array_rand($gambar_fashion)];
            
            $cache_buster = time() . mt_rand(100, 999);
            ?>
            <div class="card mb-4 border-0 shadow-sm overflow-hidden animate__animated animate__fadeInUp">
                <div class="row g-0 align-items-center">
                    <div class="col-md-8 p-4">
                        <span class="badge bg-success mb-2">Live News</span>
                        
                        <small class="text-muted ms-2"><i class="fas fa-clock"></i> <?php echo $tanggal; ?></small>
                        
                        <h5 class="card-title fw-bold mt-2">
                            <a href="<?php echo $link; ?>" target="_blank" class="news-link">
                                <?php echo $judul; ?>
                            </a>
                        </h5>
                        
                        <a href="<?php echo $link; ?>" target="_blank" class="btn btn-outline-dark btn-sm rounded-pill px-3">
                            Selengkapnya <i class="fas fa-external-link-alt ms-1"></i>
                        </a>
                    </div>
                    
                    <div class="col-md-4">
                        <div style="height: 220px; overflow: hidden;">
                            <img src="<?php echo $random_img; ?>?v=<?php echo $cache_buster; ?>" 
                                 class="img-fluid w-100 h-100" 
                                 style="object-fit: cover;" 
                                 alt="Fashion News"
                                 onerror="this.src='assets/img/slide1.jpg'">
                        </div>
                    </div>
                </div>
            </div>
            <?php
            $count++;
        }
    } else {
    ?>
        <div class="alert alert-warning">
            Jaringan bermasalah atau sumber berita tidak tersedia
        </div>
        </div>
    <?php 
    } 
    ?>

</div>