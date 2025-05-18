import { useEffect } from 'react';
import './QuickLinks.css'

function QuickLinks() {

    const fetchQuickLinks = () => {
        try {
            fetch('http://localhost:3000/api/quick-links', { signal: AbortSignal.timeout(2000) })
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
                
                boxItem.innerHTML = `<a href="${item.forwardLink || '#'}"><img src="/se3355/src/assets/ql${(index % 12) + 1}.webp" alt="${item.title || 'Quick Link'}" /></a>`;
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
