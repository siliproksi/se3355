import { useDispatch } from "react-redux";
import { addToRecentProducts } from '../../redux/actions/actions';
import './Sliders.css'
import { useEffect } from "react";

function Sliders() {

    const dispatch = useDispatch();

    function fetchSliderData() {
        try {
            fetch('http://localhost:3000/api/slider', { signal: AbortSignal.timeout(2000) })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    renderSlider(data);
                })
                .catch(error => {
                    console.error('Error fetching slider data:', error);
                    renderStaticSlider();
                });
        } catch (error) {
            console.error('Error in slider fetch operation:', error);
            renderStaticSlider();
        }
    }
    
    function renderSlider(data) {
        try {
            const container = document.getElementById("mainSlider");
            if (!container) {
                console.error("Main slider container not found");
                return;
            }
            
            if (!container.querySelector('.carousel-inner')) {
                container.innerHTML = `
                    <div class="carousel-inner"></div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#mainSlider" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Önceki</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#mainSlider" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Sonraki</span>
                    </button>
                `;
            } else {
                container.querySelector('.carousel-inner').innerHTML = '';
            }
            
            const carouselInner = container.querySelector('.carousel-inner');
            
            data.forEach((item, index) => {
                const carouselItem = document.createElement("div");
                carouselItem.className = index === 0 ? "carousel-item active" : "carousel-item";
                carouselItem.addEventListener("click", () => {
                    dispatch(addToRecentProducts(item))
                });
                
                carouselItem.innerHTML = `
                    <div class="slider-split-content">
                        <div class="slider-image-container">
                            <a href="${item.forwardLink || '#'}" target="_blank">
                                <img src="${item.image}" class="w-100 h-100 d-block" alt="${item.title || 'Slider görsel'}" />
                            </a>
                        </div>
                    </div>
                    <div class="slide-counter">${index+1}/${data.length}</div>
                `;
                
                carouselInner.appendChild(carouselItem);
            });
            
            initializeCarousel(container);
        } catch (err) {
            console.error('Error rendering slider:', err);
        }
    }
    
    function renderStaticSlider() {
        const staticSlides = [
            {
                image: "https://picsum.photos/id/10/800/350",
                title: "Kampanya 1",
                forwardLink: "#"
            },
            {
                image: "https://picsum.photos/id/20/800/350",
                title: "Kampanya 2",
                forwardLink: "#"
            },
            {
                image: "https://picsum.photos/id/30/800/350",
                title: "Kampanya 3",
                forwardLink: "#"
            },
            {
                image: "https://picsum.photos/id/40/800/350",
                title: "Kampanya 4",
                forwardLink: "#"
            }
        ];
        
        renderSlider(staticSlides);
    }
    
    function initializeCarousel(container) {
        if (typeof bootstrap !== 'undefined') {
            try {
                const existingCarousel = bootstrap.Carousel.getInstance(container);
                if (existingCarousel) {
                    existingCarousel.dispose();
                }
                
                const carousel = new bootstrap.Carousel(container, {
                    interval: 5000,
                    wrap: true,
                    touch: true,
                    keyboard: true
                });
                
                const prevButton = container.querySelector('.carousel-control-prev');
                const nextButton = container.querySelector('.carousel-control-next');
                
                if (prevButton) {
                    prevButton.onclick = (e) => {
                        e.preventDefault();
                        carousel.prev();
                    };
                }
                
                if (nextButton) {
                    nextButton.onclick = (e) => {
                        e.preventDefault();
                        carousel.next();
                    };
                }
            } catch (err) {
                console.error('Error initializing carousel:', err);
            }
        }
    }

    function fetchElectronicsProductData() {
        try {
            fetch('http://localhost:3000/api/electronics-slider', { signal: AbortSignal.timeout(2000) })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    renderElectronicsSlider(data);
                })
                .catch(error => {
                    console.error('Error fetching electronics product data:', error);
                    renderStaticElectronicsSlider();
                });
        } catch (error) {
            console.error('Error in electronics fetch operation:', error);
            renderStaticElectronicsSlider();
        }
    }
    
    function renderElectronicsSlider(data) {
        try {
            const container = document.getElementById("productDealsSlider");
            if (!container) {
                console.error("Electronics slider container not found");
                return;
            }
            
            if (!container.querySelector('.carousel-inner')) {
                container.innerHTML = `
                    <div class="carousel-inner"></div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#productDealsSlider" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Önceki</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#productDealsSlider" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Sonraki</span>
                    </button>
                `;
            } else {
                container.querySelector('.carousel-inner').innerHTML = '';
            }
            
            const carouselInner = container.querySelector('.carousel-inner');
            
            data.forEach((item, index) => {
                const carouselItem = document.createElement("div");
                carouselItem.className = index === 0 ? "carousel-item active" : "carousel-item";
                carouselItem.addEventListener("click", () => {
                    dispatch(addToRecentProducts(item))
                });
                
                carouselItem.innerHTML = `
                    <div class="product-deal-card">
                        <a href="${item.forwardLink || '#'}" target="_blank">
                            <div style="width: 50%; padding-right: 12px; display: flex; align-items: center; justify-content: flex-start; padding-left: 0;">
                                <img src="${item.img}" alt="${item.title || 'Ürün'}" style="margin-left: -20px; max-width: 100%; height: auto;" />
                            </div>
                            <div style="width: 50%; display: flex; flex-direction: column; justify-content: center; height: 100%; padding-right: 10px;" >
                                <div style="display: flex; flex-direction: column; margin-bottom: 2px">
                                    <div style="font-size: 1.1rem; font-weight: 500; margin-bottom: 3px;">${item.title || 'Ürün'}</div>
                                    <div class="fw-bold" style="font-size: 1.2rem">${item.discountedPrice || '0 TL'}</div>
                                </div>
                                <button class="btn btn-light w-100 border py-1">Sepete Ekle</button>
                            </div>
                        </a>
                    </div>
                `;
                
                carouselInner.appendChild(carouselItem);
            });
            
            try {
                const existingCarousel = bootstrap.Carousel.getInstance(container);
                if (existingCarousel) {
                    existingCarousel.dispose();
                }
                
                const productCarousel = new bootstrap.Carousel(container, {
                    interval: 3000,
                    wrap: true,
                    touch: true
                });
                
                const prevButton = container.querySelector('.carousel-control-prev');
                const nextButton = container.querySelector('.carousel-control-next');
                
                if (prevButton) {
                    prevButton.onclick = (e) => {
                        e.preventDefault();
                        productCarousel.prev();
                    };
                }
                
                if (nextButton) {
                    nextButton.onclick = (e) => {
                        e.preventDefault(); 
                        productCarousel.next();
                    };
                }
            } catch (err) {
                console.error('Error initializing electronics carousel:', err);
            }
        } catch (err) {
            console.error('Error rendering electronics slider:', err);
        }
    }
    
    function renderStaticElectronicsSlider() {
        const staticElectronics = [
            {
                img: "https://picsum.photos/id/26/220/220",
                title: "Mini Fırın Deluxe",
                discountedPrice: "7.899,00 TL",
                forwardLink: "#"
            },
            {
                img: "https://picsum.photos/id/96/220/220", 
                title: "Elektrikli Süpürge Pro",
                discountedPrice: "22.999,00 TL",
                forwardLink: "#"
            },
            {
                img: "https://picsum.photos/id/180/220/220",
                title: "Çamaşır Makinesi XXL",
                discountedPrice: "18.499,00 TL",
                forwardLink: "#"
            }
        ];
        
        renderElectronicsSlider(staticElectronics);
    }

    useEffect(() => {
        fetchSliderData();
        fetchElectronicsProductData();
        setTimeout(() => {
            const mainSlider = document.getElementById('mainSlider');
            const productDealsSlider = document.getElementById('productDealsSlider');
            
            if (typeof bootstrap !== 'undefined') {
                try {
                    if (mainSlider) {
                        try {
                            let mainCarouselInstance = bootstrap.Carousel.getInstance(mainSlider);
                            
                            if (!mainCarouselInstance) {
                                mainCarouselInstance = new bootstrap.Carousel(mainSlider, {
                                    interval: 5000,
                                    wrap: true,
                                    touch: true,
                                    pause: 'hover'
                                });
                            }
                            
                            const mainPrev = mainSlider.querySelector('.carousel-control-prev');
                            const mainNext = mainSlider.querySelector('.carousel-control-next');
                            
                            if (mainPrev) {
                                mainPrev.onclick = (e) => { 
                                    e.preventDefault();
                                    mainCarouselInstance.prev(); 
                                };
                            }
                            
                            if (mainNext) {
                                mainNext.onclick = (e) => { 
                                    e.preventDefault();
                                    mainCarouselInstance.next(); 
                                };
                            }
                        } catch (error) {
                            console.error('Main slider initialization error:', error);
                        }
                    }
                    
                    if (productDealsSlider) {
                        try {
                            let productsCarouselInstance = bootstrap.Carousel.getInstance(productDealsSlider);
                            
                            if (!productsCarouselInstance) {
                                productsCarouselInstance = new bootstrap.Carousel(productDealsSlider, {
                                    interval: 3000,
                                    wrap: true,
                                    touch: true
                                });
                            }
                            
                            const productsPrev = productDealsSlider.querySelector('.carousel-control-prev');
                            const productsNext = productDealsSlider.querySelector('.carousel-control-next');
                        
                            if (productsPrev) {
                                productsPrev.onclick = (e) => { 
                                    e.preventDefault();
                                    productsCarouselInstance.prev(); 
                                };
                            }
                            
                            if (productsNext) {
                                productsNext.onclick = (e) => { 
                                    e.preventDefault();
                                    productsCarouselInstance.next(); 
                                };
                            }
                        } catch (error) {
                            console.error('Product slider initialization error:', error);
                        }
                    }
                } catch (err) {
                    console.error('Error initializing carousels:', err);
                }
            }
        }, 1000); 
    }, []);

    return (
        <div className="sliders-section">
            <div className="sliders-row">
                <div className="main-slider-container">
                    <div id="mainSlider" className="carousel slide" data-bs-ride="carousel" data-bs-touch="true">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="slider-split-content">
                                    <div className="slider-image-container">
                                        <img src="https://picsum.photos/id/10/800/350" className="w-100 h-100 d-block" alt="Loading..." />
                                    </div>
                                </div>
                                <div className="slide-counter">1/10</div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#mainSlider" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Önceki</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#mainSlider" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Sonraki</span>
                        </button>
                    </div>
                </div>

                <div className="secondary-slider-container rounded">
                    <div className="electronics-title">
                        HER GÜN YENİLENEN<br />
                        <span>ELEKTRONİK</span><br />
                        <span>FIRSATLAR</span>
                    </div>

                    <div style={{ position: 'absolute', top: '15px', left: '15px', width: '35%' }}>
                        <img src="/src/assets/Elektronik.jpg" className="img-fluid rounded mb-2" alt="Laptop" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                    </div>

                    <div id="productDealsSlider" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-touch="true" style={{ marginTop: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <div className="carousel-inner" style={{ flexGrow: 1 }}>
                            <div className="carousel-item active">
                                <div className="product-deal-card">
                                    <div style={{ width: '50%', paddingRight: '12px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 0 }}>
                                        <img src="https://picsum.photos/id/26/220/220" className="img-fluid" alt="Loading..." style={{ marginLeft: '-20px' }} />
                                    </div>
                                    <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', paddingRight: '10px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '2px' }}>
                                            <div style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '3px' }}>Mini Fırın Deluxe</div>
                                            <div className="fw-bold" style={{ fontSize: '1.2rem' }}>7.899,00 TL</div>
                                        </div>
                                        <button className="btn btn-light w-100 border py-1">Sepete Ekle</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#productDealsSlider" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Önceki</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#productDealsSlider" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Sonraki</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sliders
