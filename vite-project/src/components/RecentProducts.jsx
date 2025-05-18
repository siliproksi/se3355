import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Recommendations.css'

function RecentProducts() {
    const recentProducts = useSelector((state) => state.recentProducts);

    const fetchRecentProducts = () => {
        try {
            const container = document.getElementById("recentProductsContainer");
            if (!container) {
                console.error("Container for recent products not found");
                return;
            }
            
            const carouselInner = document.createElement("div");
            carouselInner.className = "row";
            
            container.innerHTML = "";
            
            if (recentProducts && recentProducts.length > 0) {
                recentProducts.forEach((item, index) => {
                    const carouselItem = document.createElement("div");
                    carouselItem.className = "col-lg-2 col-md-3 col-sm-4 col-6 mb-3";
                    carouselItem.innerHTML = `
                    <a href="${item.forwardLink || '#'}">
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
            }
        } catch (error) {
            console.error("Error displaying recent products:", error);
        }
    }
    
    useEffect(() => {
        fetchRecentProducts();
    }, [recentProducts]);

  return (
    <div className="container-fluid px-2">
        <div className="section-title-container">
            {Object.keys(recentProducts).length !== 0 && <h2 className="section-title">Gezilen Urunler</h2>}
        </div>
        <div className="recommendation-container" id="recentProductsContainer">
            
        </div>
    </div>
  )
}

export default RecentProducts
