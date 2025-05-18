import { useDispatch } from "react-redux";
import { addToRecentProducts } from '../../redux/actions/actions';
import { useEffect } from 'react';
import './Recommendations.css'

// Import placeholder images for our static products
import placeholder1 from '../assets/ms1.webp';
import placeholder2 from '../assets/ms2.webp';
import placeholder3 from '../assets/ms3.webp';
import placeholder4 from '../assets/ms4.webp';
import placeholder5 from '../assets/ms5.webp';
import placeholder6 from '../assets/ms6.webp';

const placeholderImages = [
    placeholder1, placeholder2, placeholder3, placeholder4, placeholder5, placeholder6
];

function Recommendations() {
    const dispatch = useDispatch();

    function fetchProducts() {
        try {
            fetch('http://localhost:3000/api/products', { signal: AbortSignal.timeout(2000) })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    renderProducts(data);
                })
                .catch(error => {
                    console.error('Error fetching products data:', error);
                    renderStaticProducts();
                });
        } catch (error) {
            console.error('Error in fetch operation:', error);
            renderStaticProducts();
        }
    }
    
    function renderProducts(data) {
        try {
            const container = document.getElementById("recommendationContainer");
            if (!container) {
                console.error("Container for recommendations not found");
                return;
            }
            
            const carouselInner = document.createElement("div");
            carouselInner.className = "row";

            container.innerHTML = "";

            data.forEach((item, index) => {
                const carouselItem = document.createElement("div");
                carouselItem.className = "col-lg-2 col-md-3 col-sm-4 col-6 mb-3";
                carouselItem.addEventListener("click", () => {
                    dispatch(addToRecentProducts(item))
                });
                carouselItem.innerHTML = `
                <a href="${item.forwardLink || '#'}" target="_blank">
                    <div class="product-card">
                        <div class="product-image-container">
                            <img src="${item.img}" class="product-image" alt="${item.title || 'Ürün'}" />
                            <button class="favorite-btn" aria-label="Favorilere ekle">♡</button>
                        </div>
                        <div class="product-details">
                            <h5 class="product-name">${item.title || 'Ürün'}</h5>
                            <div class="product-rating">
                                <span class="stars">${item.rating || '★★★★☆'}</span>
                                <span class="rating-count">(${item.votes || '0'})</span>
                            </div>
                            <button class="add-to-cart-btn">Sepete Ekle</button>
                            <div class="product-price">
                                <span class="price">${item.discountedPrice || '0 TL'}</span>
                            </div>
                        </div>
                    </div>
                </a>
                `;
                carouselInner.appendChild(carouselItem);
            });
            container.appendChild(carouselInner);
        } catch (error) {
            console.error('Error rendering products:', error);
        }
    }
    
    function renderStaticProducts() {
        const staticProducts = [
            {
                img: placeholderImages[0],
                title: "Akıllı Telefon Pro Max",
                rating: "★★★★☆",
                votes: "126",
                discountedPrice: "24.999 TL",
                forwardLink: "#"
            },
            {
                img: placeholderImages[1],
                title: "Bluetooth Kulaklık",
                rating: "★★★★★",
                votes: "345",
                discountedPrice: "1.299 TL",
                forwardLink: "#"
            },
            {
                img: placeholderImages[2],
                title: "Akıllı Saat Pro",
                rating: "★★★★☆",
                votes: "221",
                discountedPrice: "3.499 TL",
                forwardLink: "#"
            },
            {
                img: placeholderImages[3],
                title: "Dijital Fotoğraf Makinesi",
                rating: "★★★☆☆",
                votes: "87",
                discountedPrice: "8.750 TL",
                forwardLink: "#"
            },
            {
                img: placeholderImages[4],
                title: "Elektrikli Kahve Makinesi",
                rating: "★★★★☆",
                votes: "158",
                discountedPrice: "2.899 TL",
                forwardLink: "#"
            },
            {
                img: placeholderImages[5],
                title: "Kablosuz Şarj Cihazı",
                rating: "★★★★★",
                votes: "412",
                discountedPrice: "549 TL",
                forwardLink: "#"
            }
        ];
        
        renderProducts(staticProducts);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container-fluid px-2">
            <div className="section-title-container">
                <div className="section-title">Sana Özel Öneriler</div>
            </div>
            <div className="recommendation-container" id="recommendationContainer">
                <div className="row">
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-3">
                        <div className="product-card">
                            <div className="product-image-container">
                                <img src={placeholderImages[0]} className="product-image" alt="Product 1" />
                                <button className="favorite-btn" aria-label="Add to favorites">♡</button>
                            </div>
                            <div className="product-details">
                                <h5 className="product-name">Akıllı Telefon Pro Max</h5>
                                <div className="product-rating">
                                    <span className="stars">★★★★☆</span>
                                    <span className="rating-count">(126)</span>
                                </div>
                                <button className="add-to-cart-btn">Sepete Ekle</button>
                                <div className="product-price">
                                    <span className="price">24.999 TL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-3">
                        <div className="product-card">
                            <div className="product-image-container">
                                <img src={placeholderImages[1]} className="product-image" alt="Product 2" />
                                <button className="favorite-btn" aria-label="Add to favorites">♡</button>
                            </div>
                            <div className="product-details">
                                <h5 className="product-name">Bluetooth Kulaklık</h5>
                                <div className="product-rating">
                                    <span className="stars">★★★★★</span>
                                    <span className="rating-count">(345)</span>
                                </div>
                                <button className="add-to-cart-btn">Sepete Ekle</button>
                                <div className="product-price">
                                    <span className="price">1.299 TL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-3">
                        <div className="product-card">
                            <div className="product-image-container">
                                <img src={placeholderImages[2]} className="product-image" alt="Product 3" />
                                <button className="favorite-btn" aria-label="Add to favorites">♡</button>
                            </div>
                            <div className="product-details">
                                <h5 className="product-name">Akıllı Saat Pro</h5>
                                <div className="product-rating">
                                    <span className="stars">★★★★☆</span>
                                    <span className="rating-count">(221)</span>
                                </div>
                                <button className="add-to-cart-btn">Sepete Ekle</button>
                                <div className="product-price">
                                    <span className="price">3.499 TL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-3">
                        <div className="product-card">
                            <div className="product-image-container">
                                <img src={placeholderImages[3]} className="product-image" alt="Product 4" />
                                <button className="favorite-btn" aria-label="Add to favorites">♡</button>
                            </div>
                            <div className="product-details">
                                <h5 className="product-name">Dijital Fotoğraf Makinesi</h5>
                                <div className="product-rating">
                                    <span className="stars">★★★☆☆</span>
                                    <span className="rating-count">(87)</span>
                                </div>
                                <button className="add-to-cart-btn">Sepete Ekle</button>
                                <div className="product-price">
                                    <span className="price">8.750 TL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-3">
                        <div className="product-card">
                            <div className="product-image-container">
                                <img src={placeholderImages[4]} className="product-image" alt="Product 5" />
                                <button className="favorite-btn" aria-label="Add to favorites">♡</button>
                            </div>
                            <div className="product-details">
                                <h5 className="product-name">Elektrikli Kahve Makinesi</h5>
                                <div className="product-rating">
                                    <span className="stars">★★★★☆</span>
                                    <span className="rating-count">(158)</span>
                                </div>
                                <button className="add-to-cart-btn">Sepete Ekle</button>
                                <div className="product-price">
                                    <span className="price">2.899 TL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-3">
                        <div className="product-card">
                            <div className="product-image-container">
                                <img src={placeholderImages[5]} className="product-image" alt="Product 6" />
                                <button className="favorite-btn" aria-label="Add to favorites">♡</button>
                            </div>
                            <div className="product-details">
                                <h5 className="product-name">Kablosuz Şarj Cihazı</h5>
                                <div className="product-rating">
                                    <span className="stars">★★★★★</span>
                                    <span className="rating-count">(412)</span>
                                </div>
                                <button className="add-to-cart-btn">Sepete Ekle</button>
                                <div className="product-price">
                                    <span className="price">549 TL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recommendations
