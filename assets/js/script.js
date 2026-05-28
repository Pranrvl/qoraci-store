/* =========================================
   HUNTERS JKT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    handleNavbarActive();
    updateCartCount();
    initDecayEffect();
    
   
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        document.body.appendChild(modal);
    });

   
    if (document.getElementById('cart-container')) {
        renderCart();
    }
});

/* -----------------------------------------
   UTILITIES&NAVBAR
   ----------------------------------------- */
function handleNavbarActive() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page") || "home"; 
    document.querySelectorAll('.nav-link').forEach(link => {
        if(link.href.includes(`page=${page}`)) {
            link.classList.add('active', 'fw-bold');
        }
    });
}

const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('riveloCart')) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    let badge = document.getElementById('cart-count');
    
    if(badge) {
        badge.innerText = totalItems > 9 ? "9+" : totalItems;
        badge.style.fontSize = totalItems > 9 ? "0.6rem" : "0.7rem";
        badge.style.display = totalItems > 0 ? 'block' : 'none';
        badge.classList.remove('animate__animated', 'animate__bounce');
        void badge.offsetWidth; 
        badge.classList.add('animate__animated', 'animate__bounce');
    }
}

/* -----------------------------------------
   CART
   ----------------------------------------- */
function addToCart(productName, price, idOpt1, idOpt2, imageName) {
    try {
        let opt1El = document.getElementById(idOpt1);
        let opt2El = document.getElementById(idOpt2);
        
        let variantParts = [];
        if (opt1El && opt1El.value) variantParts.push(opt1El.value);
        if (opt2El && opt2El.value) variantParts.push(opt2El.value);
        let variant = variantParts.length > 0 ? variantParts.join(", ") : "Original";

        let encodedImage = encodeURIComponent(imageName);

        let newItem = {
            name: productName,
            price: price,
            variant: variant,
            qty: 1,

            image: 'assets/img/' + encodedImage
        };

        let cart = JSON.parse(localStorage.getItem('riveloCart')) || [];
        let existingItem = cart.find(item => item.name === newItem.name && item.variant === newItem.variant);
        
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push(newItem);
        }

        localStorage.setItem('riveloCart', JSON.stringify(cart));
        updateCartCount(); 
        
        const activeModal = document.querySelector('.modal.show');
        if (activeModal) {
            const closeBtn = activeModal.querySelector('[data-bs-dismiss="modal"]');
            if (closeBtn) closeBtn.click(); 
        }

        Swal.fire({
            toast: true,
            position: 'top',
            icon: 'success',
            title: 'Added to cart',
            text: productName,
            showConfirmButton: false,
            timer: 2000,
            background: '#1D1D1F',
            color: '#FFFFFF',
            iconColor: '#34C759',
            customClass: {
                popup: 'rounded-4 shadow-lg mt-3 border-0',
                title: 'fw-normal fs-6'
            }
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

/* -----------------------------------------
   D. CHECKOUT & RENDER CART
   ----------------------------------------- */
function renderCart() {
    let cart = JSON.parse(localStorage.getItem('riveloCart')) || [];
    let container = document.getElementById('cart-container');
    let btnPay = document.getElementById('btn-pay');
    
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5 my-3">
                <div class="mb-4 text-muted" style="opacity: 0.3;">
                    <i class="fas fa-shopping-bag fa-4x"></i>
                </div>
                <h5 class="fw-bold mb-2" style="color: #1D1D1F; letter-spacing: -0.5px;">Your cart is empty</h5>
                <p class="text-muted mb-4" style="font-size: 0.95rem;">Looks like you haven't added anything to your cart yet.</p>
                <a href="index.php?page=menu" class="btn btn-dark btn-pill px-5 py-2 fw-bold shadow-sm" style="background-color: #1D1D1F; border: none;">Explore Catalog</a>
            </div>
        `;
        if(btnPay) btnPay.disabled = true;
        updateSummary(0);
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        let subtotal = item.price * item.qty;
        total += subtotal;

        let imgPath = decodeURIComponent(item.image);

        html += `
    <div class="cart-item d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div class="d-flex align-items-center flex-grow-1" style="min-width: 200px;">
            <div class="flex-shrink-0">
                <img src="${imgPath}" alt="${item.name}" 
                     style="width: 90px; height: 90px; object-fit: cover; border-radius: 12px;"
                     onerror="this.src='https://placehold.co/90x90?text=No+Img'">
            </div>
            
            <div class="ms-4">
                <h6 class="cart-item-title mb-1">${item.name}</h6>
                <small class="text-muted d-block mb-2" style="font-size: 0.85rem;">
                    ${item.variant}
                </small>
                <div class="cart-item-price">
                    ${formatRupiah(item.price)}
                </div>
            </div>
        </div>

        <div class="d-flex align-items-center" style="flex-wrap: nowrap;">
            <div class="d-flex align-items-center me-3 border rounded-pill px-2 py-1">
                <button class="btn btn-sm btn-qty" onclick="updateQty(${index}, -1)">
                    <i class="fas fa-minus" style="font-size: 0.8rem;"></i>
                </button>
                
                <input type="text" class="cart-qty-input mx-1" 
                       value="${item.qty}" readonly>
                
                <button class="btn btn-sm btn-qty" onclick="updateQty(${index}, 1)">
                    <i class="fas fa-plus" style="font-size: 0.8rem;"></i>
                </button>
            </div>

            <button class="btn btn-link text-muted p-0 ms-2 hover-gold" onclick="hapusItem(${index})" style="font-size: 1.2rem;">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    </div>`;
    });

    container.innerHTML = html;
    if(btnPay) btnPay.disabled = false;
    updateSummary(total);
}

/* UPDATE QUANTITY */
function updateQty(index, change) {
    let cart = JSON.parse(localStorage.getItem('riveloCart')) || [];
    if (cart[index]) {
        cart[index].qty += change;
        if (cart[index].qty < 1) cart[index].qty = 1;
        localStorage.setItem('riveloCart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
}

function updateSummary(subtotal) {
    if (!document.getElementById('subtotal-display')) return;

    document.getElementById('subtotal-display').innerText = formatRupiah(subtotal);
    document.getElementById('total-display').innerText = formatRupiah(subtotal);
}

function hapusItem(index) {
    let cart = JSON.parse(localStorage.getItem('riveloCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('riveloCart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function hapusKeranjang() {
    Swal.fire({
        title: 'Empty Cart?',
        text: "All orders will be deleted.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, Empty!'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('riveloCart');
            renderCart();
            updateCartCount();
            Swal.fire('Emptied!', '', 'success');
        }
    })
}

// Moved to single prosesBayar below

/* -----------------------------------------
   DECAY CARD 
   ----------------------------------------- */
function initDecayEffect() {    
    const svgElement = document.querySelector('.decay-svg'); 
    const displacementMap = document.getElementById('decay-displacement'); 
    
    if (!svgElement || !displacementMap) return; 

    const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cachedCursor = { ...cursor };
    const winsize = { width: window.innerWidth, height: window.innerHeight };
    
    const imgValues = {
        imgTransforms: { x: 0, y: 0, rz: 0 },
        displacementScale: 0
    };

    const lerp = (a, b, n) => (1 - n) * a + n * b;
    const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;
    const distance = (x1, x2, y1, y2) => Math.hypot(x1 - x2, y1 - y2);

    window.addEventListener('resize', () => {
        winsize.width = window.innerWidth;
        winsize.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (ev) => {
        cursor.x = ev.clientX;
        cursor.y = ev.clientY;
    });

    const render = () => {
        let targetX = lerp(imgValues.imgTransforms.x, map(cursor.x, 0, winsize.width, -50, 50), 0.1);
        let targetY = lerp(imgValues.imgTransforms.y, map(cursor.y, 0, winsize.height, -50, 50), 0.1);
        let targetRz = lerp(imgValues.imgTransforms.rz, map(cursor.x, 0, winsize.width, -5, 5), 0.1);

        const bound = 30;
        if (targetX > bound) targetX = bound + (targetX - bound) * 0.2;
        if (targetX < -bound) targetX = -bound + (targetX + bound) * 0.2;
        if (targetY > bound) targetY = bound + (targetY - bound) * 0.2;
        if (targetY < -bound) targetY = -bound + (targetY + bound) * 0.2;

        imgValues.imgTransforms.x = targetX;
        imgValues.imgTransforms.y = targetY;
        imgValues.imgTransforms.rz = targetRz;

        gsap.set(svgElement, {
            x: imgValues.imgTransforms.x,
            y: imgValues.imgTransforms.y,
            rotateZ: imgValues.imgTransforms.rz
        });

        const cursorTravelledDistance = distance(cachedCursor.x, cursor.x, cachedCursor.y, cursor.y);
        
        imgValues.displacementScale = lerp(
            imgValues.displacementScale,
            map(cursorTravelledDistance, 0, 200, 0, 200), 
            0.06
        );

        gsap.set(displacementMap, { attr: { scale: imgValues.displacementScale } });

        cachedCursor.x = cursor.x;
        cachedCursor.y = cursor.y;

        requestAnimationFrame(render);
    };

    render();
}

/* -----------------------------------------
   TYPEWRITER EFFECT
   ----------------------------------------- */
class TextTypeWriter {
    constructor(id, textArray, typingSpeed = 75, deletingSpeed = 40, pauseDuration = 1800) {
        this.el = document.getElementById(id);
        this.textArray = textArray;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
        this.pauseDuration = pauseDuration;
        this.currentTextIndex = 0;
        this.isDeleting = false;
        this.charIndex = 0;
        this.cursor = document.getElementById('typing-cursor');

        this.type();
    }

    type() {

        const currentText = this.textArray[this.currentTextIndex];
        const fullTextLength = currentText.length;

        if (this.isDeleting) {

            this.charIndex--;
        } else {
            this.charIndex++;
        }

        this.el.innerHTML = currentText.substring(0, this.charIndex);
        
        let speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

        if (!this.isDeleting && this.charIndex === fullTextLength) {
            
            speed = this.pauseDuration;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {

            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.textArray.length;
            speed = 500; 
        }

        setTimeout(() => this.type(), speed);
    }
}

// -----------------------------------------
// Function buat mengetik teks di halaman utama
// -----------------------------------------
document.addEventListener('DOMContentLoaded', () => {
   
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        document.body.appendChild(modal);
    });

    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
        renderCart();
    }

    if (document.getElementById('typewriter-text')) {
        const slogans = [
            "WELCOME", 
            "to QORACI STORE",
            "Choose Your Outfit, Choose Your Style",
            "@qoraci.id"
        ];
        new TextTypeWriter('typewriter-text', slogans);
    }
    
});

// -----------------------------------------
// Function PEMAYARAN
// -----------------------------------------
const nomorBCA = "8601064847"; 
const nomorWA  = "6281349818631";
 
// Removed duplicate prosesBayar()


function buatStrukBCA() {
    let date = new Date().toLocaleString("en-US");
    let subtotal = document.getElementById("subtotal-display").textContent;
    let total = document.getElementById("total-display").textContent;

    let shipName = document.getElementById('ship-name').value.trim();
    let shipPhone = document.getElementById('ship-phone').value.trim();
    let shipAddress = document.getElementById('ship-address').value.trim();
    let shipCity = document.getElementById('ship-city').value.trim();
    let shipZip = document.getElementById('ship-zip').value.trim();

    let items = document.querySelectorAll(".cart-item");
    let daftarProduk = "";
    let daftarProdukWA = "";

    items.forEach(item => {
        let nama = item.querySelector(".cart-item-title").textContent;
        let qty = item.querySelector(".cart-qty-input").value;
        let harga = item.querySelector(".cart-item-price").textContent;

        daftarProduk += `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="pe-3">
                    <span class="d-block fw-medium mb-1" style="font-size: 0.95rem; color: #1D1D1F; line-height: 1.2;">${nama}</span>
                    <span class="text-muted" style="font-size: 0.85rem;">Qty: ${qty}</span>
                </div>
                <span class="fw-bold" style="color: #1D1D1F; white-space: nowrap;">${harga}</span>
            </div>
        `;
        
        daftarProdukWA += `• ${nama} x${qty}%0A`;
    });

    let waText =
        "Hello, I would like to place the following order :%0A%0A" +
        daftarProdukWA +
        "%0ASubtotal: " + subtotal +
        "%0ATotal Payment: " + total +
        "%0A%0A*Shipping Details:*" +
        "%0AName: " + shipName +
        "%0APhone: " + shipPhone +
        "%0AAddress: " + shipAddress + ", " + shipCity + " " + shipZip;

    document.getElementById("struk-content").innerHTML = `
        <div class="d-flex justify-content-between mb-2 text-muted" style="font-size: 0.9rem;">
            <span>Date</span>
            <span>${date}</span>
        </div>
        <div class="d-flex justify-content-between mb-4 text-muted" style="font-size: 0.9rem;">
            <span>Method</span>
            <span class="fw-medium text-dark">Bank Transfer</span>
        </div>

        <div class="mb-4">
            <h6 class="fw-bold mb-3 text-uppercase" style="font-size: 0.75rem; letter-spacing: 1px; color: #86868B;">Product List</h6>
            ${daftarProduk}
        </div>

        <div class="border-top pt-3 mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="text-muted">Subtotal</span>
                <span class="fw-medium text-dark">${subtotal}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-3">
                <span class="fw-bold fs-5" style="color: #1D1D1F;">Total</span>
                <span class="fw-bold fs-5" style="color: #1D1D1F;">${total}</span>
            </div>
        </div>

        <div class="p-4 mb-4" style="background-color: #F5F5F7; border-radius: 16px;">
            <span class="d-block text-muted mb-2" style="font-size: 0.85rem;">Transfer to Mandiri account:</span>
            <div class="fw-bold fs-4 mb-1" style="letter-spacing: 1px; color: #1D1D1F;">1590013760425</div>
            <span class="fw-bold text-uppercase" style="font-size: 0.85rem; color: #1D1D1F;">MANDIRI P.R</span>
        </div>

        <a href="https://wa.me/6281349818631?text=${waText}" target="_blank" class="btn w-100 fw-bold btn-pill text-white mb-2" style="background-color: #25D366; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);">
            <i class="fab fa-whatsapp me-2"></i> Confirm via WhatsApp
        </a>
    `;
}

function downloadStrukPDF() {
    let date = new Date().toLocaleString("en-US");
    let subtotal = document.getElementById("subtotal-display").textContent;
    let total = document.getElementById("total-display").textContent;
    let items = document.querySelectorAll(".cart-item");
    let daftarProduk = "";

    items.forEach(item => {
        let nama = item.querySelector(".cart-item-title").textContent;
        let qty = item.querySelector(".cart-qty-input").value;
        let harga = item.querySelector(".cart-item-price").textContent;

        daftarProduk += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-family: 'Outfit', sans-serif;">
                <div style="flex: 1; padding-right: 20px;">
                    <div style="font-weight: 500; font-size: 11pt; color: #000; line-height: 1.3;">${nama}</div>
                    <div style="color: #888; font-size: 9pt; margin-top: 4px;">Qty: ${qty}</div>
                </div>
                <div style="font-weight: 600; font-size: 11pt; color: #000;">${harga}</div>
            </div>
        `;
    });

    const printContainer = document.createElement('div');
    printContainer.style.width = '800px'; 
    printContainer.style.padding = '80px 60px';
    printContainer.style.backgroundColor = '#FFFFFF';
    printContainer.style.color = '#000000';
    printContainer.style.fontFamily = "'Outfit', sans-serif";

    printContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 60px;">
            <h1 style="font-family: 'Playfair Display', serif; font-weight: 700; font-size: 36pt; margin: 0; letter-spacing: 4px; text-transform: uppercase;">Qoraci Studio</h1>
            <p style="font-size: 9pt; color: #888; margin-top: 8px; letter-spacing: 2px;">WEST JAKARTA, INDONESIA</p>
        </div>

        <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 40px;">
            <div>
                <p style="margin: 0; font-size: 8pt; color: #888; text-transform: uppercase; letter-spacing: 1px;">Invoice No.</p>
                <p style="margin: 5px 0 0 0; font-weight: 600; font-size: 12pt;">INV-${Math.floor(Math.random() * 1000000)}</p>
                
                <p style="margin: 20px 0 0 0; font-size: 8pt; color: #888; text-transform: uppercase; letter-spacing: 1px;">Billed To</p>
                <p style="margin: 5px 0 0 0; font-weight: 600; font-size: 11pt; color: #000;">${document.getElementById('ship-name').value.trim()}</p>
                <p style="margin: 2px 0 0 0; font-size: 9pt; color: #666;">${document.getElementById('ship-phone').value.trim()}</p>
                <p style="margin: 2px 0 0 0; font-size: 9pt; color: #666; max-width: 250px;">${document.getElementById('ship-address').value.trim()}, ${document.getElementById('ship-city').value.trim()} ${document.getElementById('ship-zip').value.trim()}</p>
            </div>
            <div style="text-align: right;">
                <p style="margin: 0; font-size: 8pt; color: #888; text-transform: uppercase; letter-spacing: 1px;">Date</p>
                <p style="margin: 5px 0 0 0; font-weight: 600; font-size: 12pt;">${date}</p>
            </div>
        </div>

        <div style="margin-bottom: 50px;">
            <h6 style="font-size: 8pt; color: #888; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 25px;">Purchased Items</h6>
            ${daftarProduk}
        </div>

        <div style="border-top: 1px solid #E5E5E5; padding-top: 25px; margin-bottom: 50px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                <span style="font-size: 11pt; color: #888;">Subtotal</span>
                <span style="font-size: 11pt; color: #000; font-weight: 500;">${subtotal}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                <span style="font-size: 11pt; color: #888;">Shipping</span>
                <span style="font-size: 11pt; color: #000; font-weight: 500;">Free</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-top: 2px solid #000; padding-top: 20px; margin-top: 20px;">
                <span style="font-size: 14pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Total</span>
                <span style="font-size: 16pt; font-weight: 700;">${total}</span>
            </div>
        </div>

        <div style="text-align: center; margin-top: 100px; padding-top: 40px; border-top: 1px solid #E5E5E5;">
            <p style="font-family: 'Playfair Display', serif; font-size: 18pt; font-style: italic; margin-bottom: 12px; color: #1D1D1F;">Thank you for your purchase.</p>
            <p style="font-size: 9pt; color: #888; letter-spacing: 2px;">@QORACI.ID</p>
        </div>
    `;

    const opt = {
        margin: 0,
        filename: "Qoraci-Invoice.pdf",
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(opt).from(printContainer).save();
}

function prosesBayar() {
    let methodInput = document.querySelector('input[name="payment-method"]:checked');
    let method = methodInput ? methodInput.value : 'bca';
    let cart = JSON.parse(localStorage.getItem('riveloCart'));
    if (!cart || cart.length === 0) {
        Swal.fire('Cart is Empty', 'Please select a product first.', 'warning');
        return;
    }

    let shipName = document.getElementById('ship-name').value.trim();
    let shipPhone = document.getElementById('ship-phone').value.trim();
    let shipAddress = document.getElementById('ship-address').value.trim();
    let shipCity = document.getElementById('ship-city').value.trim();
    let shipZip = document.getElementById('ship-zip').value.trim();

    if (!shipName || !shipPhone || !shipAddress || !shipCity || !shipZip) {
        Swal.fire({
            title: 'Incomplete Details',
            text: 'Please fill in all your shipping details so we can process your order.',
            icon: 'warning',
            confirmButtonColor: '#1D1D1F',
            confirmButtonText: 'Fill Details'
        });
        return;
    }

    if (method === "cod") {
        buatStrukCOD();
        let modal = new bootstrap.Modal(document.getElementById("codModal"));
        modal.show();
        return;
    }

    if (method === "bca") {
        buatStrukBCA();
        let modal = new bootstrap.Modal(document.getElementById("strukModal"));
        modal.show();
    }
}

function buatStrukCOD() {
    let date = new Date().toLocaleString("en-US");
    let subtotal = document.getElementById("subtotal-display").textContent;
    let total = document.getElementById("total-display").textContent;

    let shipName = document.getElementById('ship-name').value.trim();
    let shipPhone = document.getElementById('ship-phone').value.trim();
    let shipAddress = document.getElementById('ship-address').value.trim();
    let shipCity = document.getElementById('ship-city').value.trim();
    let shipZip = document.getElementById('ship-zip').value.trim();

    let items = document.querySelectorAll(".cart-item");
    let daftarProdukHTML = "";
    let daftarProdukWA = "";

    items.forEach(item => {
        let nama = item.querySelector(".cart-item-title").textContent;
        let qty = item.querySelector(".cart-qty-input").value;

        daftarProdukHTML += `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="d-block fw-medium" style="font-size: 0.95rem; color: #1D1D1F;">${nama}</span>
                <span class="text-muted" style="font-size: 0.85rem; white-space: nowrap;">Qty: ${qty}</span>
            </div>
        `;

        daftarProdukWA += `• ${nama} x${qty}%0A`;
    });

    let waText =
        "Hello, I would like to place the following order :%0A%0A" +
        daftarProdukWA +
        "%0ASubtotal: " + subtotal +
        "%0ATotal Payment: " + total +
        "%0A%0A*Shipping Details:*" +
        "%0AName: " + shipName +
        "%0APhone: " + shipPhone +
        "%0AAddress: " + shipAddress + ", " + shipCity + " " + shipZip;

    document.getElementById('btn-wa-cod').onclick = function() {
        window.open("https://wa.me/6281349818631?text=" + waText);
    };

    document.getElementById("cod-content").innerHTML = `
        <div class="d-flex justify-content-between mb-2 text-muted" style="font-size: 0.9rem;">
            <span>Date</span>
            <span>${date}</span>
        </div>
        <div class="d-flex justify-content-between mb-4 text-muted" style="font-size: 0.9rem;">
            <span>Method</span>
            <span class="fw-medium text-dark">COD (Cash on Delivery)</span>
        </div>

        <div class="mb-4">
            <h6 class="fw-bold mb-3 text-uppercase" style="font-size: 0.75rem; letter-spacing: 1px; color: #86868B;">Product List</h6>
            ${daftarProdukHTML}
        </div>

        <div class="border-top pt-3 mb-2">
            <div class="d-flex justify-content-between align-items-center mt-3">
                <span class="fw-bold fs-5" style="color: #1D1D1F;">Total</span>
                <span class="fw-bold fs-5" style="color: #1D1D1F;">${total}</span>
            </div>
        </div>
    `;
}

/* -----------------------------------------
   AUTO-CLOSE NAVBAR MOBILE
   ----------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    // Cari semua link di dalam navbar
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menuToggle = document.getElementById('navbarNav');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Jika menu sedang terbuka (punya class 'show'), maka tutup
            if (menuToggle.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(menuToggle, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });
});
