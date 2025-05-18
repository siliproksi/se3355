import { useDispatch } from "react-redux";
import { addToRecentProducts } from '../../redux/actions/actions';
import './Sliders.css'
import { useEffect } from "react";

import ms1 from '../assets/ms1.webp';
import ms2 from '../assets/ms2.webp';
import ms3 from '../assets/ms3.webp';
import ms4 from '../assets/ms4.webp';
import ms5 from '../assets/ms5.webp';
import ms6 from '../assets/ms6.webp';
import ms7 from '../assets/ms7.webp';
import ms8 from '../assets/ms8.webp';
import ms9 from '../assets/ms9.webp';
import elektronik from '../assets/Elektronik.jpg';

const sliderImages = [ms1, ms2, ms3, ms4, ms5, ms6, ms7, ms8, ms9];

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
                image: sliderImages[0],
                title: "Kampanya 1",
                forwardLink: "#"
            },
            {
                image: sliderImages[1],
                title: "Kampanya 2",
                forwardLink: "#"
            },
            {
                image: sliderImages[2],
                title: "Kampanya 3",
                forwardLink: "#"
            },
            {
                image: sliderImages[3],
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
                    <div class="carousel-controls">
                        <button class="carousel-control-prev" type="button" data-bs-target="#productDealsSlider" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Önceki</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#productDealsSlider" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Sonraki</span>
                        </button>
                    </div>
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
                        <a href="${item.forwardLink || '#'}" target="_blank" style="display: flex; width: 100%; text-decoration: none; color: inherit;">
                            <div style="width: 45%; display: flex; align-items: center; justify-content: center; padding: 0 10px;">
                                <img src="${item.img}" alt="${item.title || 'Ürün'}" style="max-width: 100%; height: auto; max-height: 180px; object-fit: contain;" />
                            </div>
                            <div style="width: 55%; display: flex; flex-direction: column; justify-content: center; padding: 10px; height: 100%;" >
                                <div style="display: flex; flex-direction: column; margin-bottom: 8px">
                                    <div style="font-size: 1rem; font-weight: 500; margin-bottom: 6px; line-height: 1.3;">${item.title || 'Ürün'}</div>
                                    <div class="fw-bold" style="font-size: 1.2rem; color: #d2001a;">${item.discountedPrice || '0 TL'}</div>
                                </div>
                                <button class="btn btn-primary w-100 py-1" style="background-color: #ff8c00; border-color: #ff8c00;">Sepete Ekle</button>
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
                
                const prevButton = container.querySelector('.carousel-controls .carousel-control-prev');
                const nextButton = container.querySelector('.carousel-controls .carousel-control-next');
                
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
                img: sliderImages[6],
                title: "Mini Fırın Deluxe",
                discountedPrice: "7.899,00 TL",
                forwardLink: "#"
            },
            {
                img: sliderImages[7], 
                title: "Elektrikli Süpürge Pro",
                discountedPrice: "22.999,00 TL",
                forwardLink: "#"
            },
            {
                img: sliderImages[8],
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
                            
                            const productsPrev = productDealsSlider.querySelector('.carousel-controls .carousel-control-prev');
                            const productsNext = productDealsSlider.querySelector('.carousel-controls .carousel-control-next');
                        
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
                                        <img src={sliderImages[0]} className="w-100 h-100 d-block" alt="Loading..." />
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

                    <div id="productDealsSlider" className="carousel slide electronics-slider" data-bs-ride="carousel" data-bs-interval="3000" data-bs-touch="true" style={{ marginTop: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <div className="carousel-inner" style={{ flexGrow: 1 }}>
                            <div className="carousel-item active">
                                <div className="product-deal-card">
                                    <a href="#" target="_blank" style={{ display: 'flex', width: '100%', textDecoration: 'none', color: 'inherit' }}>
                                        <div style={{ width: '45%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>
                                            <img src={sliderImages[6]} alt="Mini Fırın Deluxe" style={{ maxWidth: '100%', height: 'auto', maxHeight: '180px', objectFit: 'contain' }} />
                                        </div>
                                        <div style={{ width: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10px', height: '100%' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
                                                <div style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '6px', lineHeight: '1.3' }}>Mini Fırın Deluxe</div>
                                                <div className="fw-bold" style={{ fontSize: '1.2rem', color: '#d2001a' }}>7.899,00 TL</div>
                                            </div>
                                            <button className="btn btn-primary w-100 py-1" style={{ backgroundColor: '#ff8c00', borderColor: '#ff8c00' }}>Sepete Ekle</button>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-controls">
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
        </div>
    )
}

export default Sliders
