<div class="container py-5">
    
    <h2 class="fw-bold mb-4">Shopping Cart</h2>

    <div class="row">
        
        <div class="col-sm-8 col-lg-8 mb-4">
            <div class="bg-white rounded-4 p-4 mb-4" style="box-shadow: 0 10px 40px rgba(0,0,0,0.02);">
                <div id="cart-container">
                    <div class="text-center py-5">
                        <div class="spinner-border text-secondary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p class="mt-2 text-muted">Loading collection data...</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-4 p-4 mb-4" style="box-shadow: 0 10px 40px rgba(0,0,0,0.02);">
                <h5 class="fw-bold mb-4" style="letter-spacing: -0.5px;">Shipping Details</h5>
                
                <form id="shipping-form">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label text-muted" style="font-size: 0.9rem;">Full Name *</label>
                            <input type="text" class="form-control form-premium" id="ship-name" required placeholder="e.g. John Doe">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-muted" style="font-size: 0.9rem;">WhatsApp / Phone *</label>
                            <input type="text" class="form-control form-premium" id="ship-phone" required placeholder="e.g. 08123456789">
                        </div>
                        <div class="col-12">
                            <label class="form-label text-muted" style="font-size: 0.9rem;">Full Address *</label>
                            <textarea class="form-control form-premium" id="ship-address" rows="3" required placeholder="Street name, building, house number..."></textarea>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-muted" style="font-size: 0.9rem;">City / Province *</label>
                            <input type="text" class="form-control form-premium" id="ship-city" required placeholder="e.g. West Jakarta">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-muted" style="font-size: 0.9rem;">Postal Code *</label>
                            <input type="text" class="form-control form-premium" id="ship-zip" required placeholder="e.g. 11470">
                        </div>
                    </div>
                </form>
            </div>

        </div>

        <div class="col-sm-4 col-lg-4">
            <div class="cart-summary sticky-top p-4" style="top: 100px;"> 
                <div class="bg-white rounded-4 p-4 mb-4" style="box-shadow: 0 10px 40px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.05);">
                    <h5 class="fw-bold mb-4" style="letter-spacing: -0.5px;">Order Summary</h5>
                    
                    <div class="d-flex justify-content-between mb-3 text-muted">
                        <span>Subtotal</span>
                        <span id="subtotal-display" class="fw-medium text-dark">Rp 0</span>
                    </div>
                    
                    <div class="border-top pt-3 mb-4 mt-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="fw-bold fs-5" style="color: #1D1D1F;">Total</span>
                            <span class="fw-bold fs-5 text-dark" id="total-display">Rp 0</span>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label fw-bold mb-3" style="font-size: 0.95rem; color: #1D1D1F;">Payment Method</label>
                        
                        <label class="payment-card border rounded-4 p-3 mb-2 d-flex align-items-center w-100" style="cursor: pointer; transition: all 0.3s ease;">
                            <input type="radio" name="payment-method" value="bca" class="form-check-input me-3" checked style="width: 1.2em; height: 1.2em; cursor: pointer;">
                            <div class="flex-grow-1">
                                <span class="d-block fw-bold" style="color: #1D1D1F; font-size: 0.95rem;">Bank Transfer</span>
                                <span class="text-muted" style="font-size: 0.8rem;">Mandiri Virtual Account</span>
                            </div>
                            <i class="fas fa-university text-muted"></i>
                        </label>
                        
                        <label class="payment-card border rounded-4 p-3 mb-4 d-flex align-items-center w-100" style="cursor: pointer; transition: all 0.3s ease;">
                            <input type="radio" name="payment-method" value="cod" class="form-check-input me-3" style="width: 1.2em; height: 1.2em; cursor: pointer;">
                            <div class="flex-grow-1">
                                <span class="d-block fw-bold" style="color: #1D1D1F; font-size: 0.95rem;">Cash on Delivery</span>
                                <span class="text-muted" style="font-size: 0.8rem;">Pay when it arrives</span>
                            </div>
                            <i class="fas fa-truck text-muted"></i>
                        </label>
                    </div>

                    <button onclick="prosesBayar()" class="btn btn-dark w-100 fw-bold py-3 mb-3" style="border-radius: 12px; font-size: 1.05rem; letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);" id="btn-pay">
                        Pay Now <i class="fas fa-arrow-right ms-2"></i>
                    </button>
                    
                    <a href="#" onclick="hapusKeranjang(); return false;" class="text-muted text-decoration-none d-block text-center w-100 py-2" style="font-size: 0.9rem; transition: color 0.3s ease;" onmouseover="this.style.color='#dc3545'" onmouseout="this.style.color='#6c757d'">
                        <i class="fas fa-trash-alt me-1"></i> Empty Cart
                    </a>
                </div>

                    <!-- Modal Struk Pembayaran -->
                        <div class="modal fade" id="strukModal" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content border-0 shadow-lg" style="border-radius: 24px;">

                            <div class="modal-header border-0 pb-0 px-4 pt-4">
                                <h5 class="fw-bold" style="font-family: 'Poppins', sans-serif;">Mandiri Payment Receipt</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <div class="modal-body px-4" id="struk-content">
                            </div>

                            <div class="modal-footer border-0 px-4 pb-4 pt-2">
                                <button class="btn btn-outline-dark w-100 fw-bold btn-pill" onclick="downloadStrukPDF()">Download Receipt</button>
                            </div>
                            </div>
                        </div>
                        </div>

                  <!-- Modal COD -->
                        <div class="modal fade" id="codModal" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content border-0 shadow-lg" style="border-radius: 24px;">

                            <div class="modal-header border-0 pb-0 px-4 pt-4">
                                <h5 class="modal-title fw-bold" style="font-family: 'Poppins', sans-serif;">COD Confirmation</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <div class="modal-body px-4" id="cod-content">
                            
                            </div>

                            <div class="modal-footer border-0 px-4 pb-4 pt-2">
                                <button class="btn btn-outline-dark w-100 fw-bold btn-pill" id="btn-wa-cod">
                                Send to WhatsApp
                                </button>
                            </div>

                            </div>
                        </div>
                        </div>

                </div>
            </div>
        </div>

    </div>
</div>