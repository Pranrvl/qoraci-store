<div class="hero-container">
    
    <div id="bgCarousel" class="carousel slide hero-carousel" data-bs-ride="carousel" data-bs-interval="5000" data-bs-pause="false">
    <div class="carousel-inner">
        
        <div class="carousel-item active">
            <img src="assets/img/slide1.png" class="d-block w-100" style="object-fit: cover; height: 100vh;" alt="Collection 1">
        </div>
        
        <div class="carousel-item">
            <img src="assets/img/slide2.png" class="d-block w-100" style="object-fit: cover; height: 100vh;" alt="Collection 2">
        </div>
        
        <div class="carousel-item">
            <img src="assets/img/slide3.png" class="d-block w-100" style="object-fit: cover; height: 100vh;" alt="Collection 3">
        </div>

        <div class="carousel-item">
            <img src="assets/img/slide4.png" class="d-block w-100" style="object-fit: cover; height: 100vh;" alt="Collection 4">
        </div>

         <div class="carousel-item">
            <img src="assets/img/slide5.png" class="d-block w-100" style="object-fit: cover; height: 100vh;" alt="Collection 5">
        </div>
    </div>
</div>
    <div class="hero-overlay"></div>

       <div class="hero-content">
        
        <div class="decay-container animate__animated animate__fadeInDown">
            <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" class="decay-svg">
                
                <defs>
                    <filter id="decayFilter">
                        <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="5" seed="4" result="turbulence" />
                        
                        <feDisplacementMap id="decay-displacement" in2="turbulence" in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
                
                <image 
                    href="assets/img/LogoRC_blacktheme.png" 
                    x="50" y="50" width="500" height="500" 
                    filter="url(#decayFilter)" 
                />
            </svg>
        </div>

        <h1 class="big-title animate__animated animate__fadeInUp" style="min-height: 2.5em; display: flex; flex-direction: column; justify-content: center; margin-bottom: 2rem;">
            <div>
                <span id="typewriter-text"></span>
                <span id="typing-cursor" class="typing-cursor">|</span>
            </div>
        </h1>
        
        <div class="d-flex justify-content-center gap-4 animate__animated animate__fadeInUp animate__delay-1s mt-4">
            <a href="index.php?page=menu" class="btn-white-box shadow-lg">View Catalog</a>
            <a href="index.php?page=credit" class="btn-outline-white">About Us</a>
        </div>
    </div>

</div>