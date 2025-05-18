import { useEffect } from 'react';
import './QuickLinks.css'
import { API_BASE_URL } from '../config'

import ql1 from '../assets/ql1.webp';
import ql2 from '../assets/ql2.webp';
import ql3 from '../assets/ql3.webp';
import ql4 from '../assets/ql4.webp';
import ql5 from '../assets/ql5.webp';
import ql6 from '../assets/ql6.webp';
import ql7 from '../assets/ql7.webp';
import ql8 from '../assets/ql8.webp';
import ql9 from '../assets/ql9.webp';
import ql10 from '../assets/ql10.webp';
import ql11 from '../assets/ql11.webp';
import ql12 from '../assets/ql12.webp';

const quickLinkImages = [
    ql1, ql2, ql3, ql4, ql5, ql6, ql7, ql8, ql9, ql10, ql11, ql12
];

function QuickLinks() {

    const fetchQuickLinks = () => {
        try {
            fetch(`${API_BASE_URL}/api/quick-links`, { signal: AbortSignal.timeout(2000) })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    renderQuickLinks(data);
                })
                .catch(error => {
                    console.error('Error fetching quick links:', error);
                    renderStaticQuickLinks();
                });
        } catch (error) {
            console.error('Error in quick links fetch operation:', error);
            renderStaticQuickLinks();
        }
    }
    
    const renderQuickLinks = (data) => {
        try {
            const container = document.getElementById("quick-links-container");
            if (!container) {
                console.error("Quick links container not found");
                return;
            }
            
            container.innerHTML = "";
            
            data.forEach((item, index) => {
                const boxItem = document.createElement("div");
                boxItem.className = "box-item";
                
                const imageUrl = quickLinkImages[index % 12];
                boxItem.innerHTML = `<a href="${item.forwardLink || '#'}"><img src="${imageUrl}" alt="${item.title || 'Quick Link'}" /></a>`;
                container.appendChild(boxItem);
            });
        } catch (error) {
            console.error('Error rendering quick links:', error);
        }
    }
    
    const renderStaticQuickLinks = () => {
        const staticQuickLinks = Array.from({ length: 12 }, (_, i) => ({
            title: `Kampanya ${i+1}`,
            forwardLink: "#",
        }));
        
        renderQuickLinks(staticQuickLinks);
    }

    useEffect(() => {
        fetchQuickLinks();
    }, [])

    return (
        <div className="container-fluid px-2">
            <div className="boxes-container" id="quick-links-container">
                
            </div>
        </div>
    )
}

export default QuickLinks
