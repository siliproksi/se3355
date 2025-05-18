import './Navbar.css'
import { useEffect } from 'react'

function Navbar() {
  useEffect(() => {
    const dropdownSubmenus = document.querySelectorAll('.dropdown-submenu');
    
    dropdownSubmenus.forEach(submenu => {
      const dropdownToggle = submenu.querySelector('.dropdown-toggle');
      
      dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const submenuDropdown = this.nextElementSibling;
        const isOpen = submenuDropdown.classList.contains('show');
        
        document.querySelectorAll('.dropdown-submenu .dropdown-menu.show').forEach(menu => {
          menu.classList.remove('show');
        });
        
        if (!isOpen) {
          submenuDropdown.classList.add('show');
        }
      });
    });
    
    document.addEventListener('click', function() {
      document.querySelectorAll('.dropdown-submenu .dropdown-menu.show').forEach(menu => {
        menu.classList.remove('show');
      });
    });
  }, []);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" id="elektronikDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Elektronik
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="elektronikDropdown">
                            <li className="dropdown-submenu">
                                <a className="dropdown-item dropdown-toggle" href="#">Bilgisayar/Tablet</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Apple</a></li>
                                    <li><a className="dropdown-item" href="#">Samsung</a></li>
                                    <li><a className="dropdown-item" href="#">Lenovo</a></li>
                                </ul>
                            </li>
                            <li className="dropdown-submenu">
                                <a className="dropdown-item dropdown-toggle" href="#">Yazıcılar & Projeksiyon</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">HP</a></li>
                                    <li><a className="dropdown-item" href="#">Canon</a></li>
                                    <li><a className="dropdown-item" href="#">Epson</a></li>
                                </ul>
                            </li>
                            <li><a className="dropdown-item" href="#">Telefon & Telefon Aksesuarlari</a></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" id="modaDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Moda
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="modaDropdown">
                            <li><a className="dropdown-item" href="#">Kadın Giyim</a></li>
                            <li><a className="dropdown-item" href="#">Erkek Giyim</a></li>
                            <li><a className="dropdown-item" href="#">Çocuk Giyim</a></li>
                            <li><a className="dropdown-item" href="#">Ayakkabı & Çanta</a></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" id="evDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Ev, Yasam, Kirtasiye, Ofis
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="evDropdown">
                            <li><a className="dropdown-item" href="#">Mobilya</a></li>
                            <li><a className="dropdown-item" href="#">Ev Tekstili</a></li>
                            <li><a className="dropdown-item" href="#">Mutfak Gereçleri</a></li>
                            <li><a className="dropdown-item" href="#">Ofis Malzemeleri</a></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" id="otoDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Oto, Bahce, Yapi Market
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="otoDropdown">
                            <li><a className="dropdown-item" href="#">Otomobil & Motorsiklet</a></li>
                            <li><a className="dropdown-item" href="#">Bahçe Mobilyası & Dekorasyonu</a></li>
                            <li><a className="dropdown-item" href="#">Elektrikli El Aletleri</a></li>
                            <li><a className="dropdown-item" href="#">Hırdavat & Nalburiye</a></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" id="anneDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Anne, Bebek, Oyuncak
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="anneDropdown">
                            <li><a className="dropdown-item" href="#">Bebek Bezleri</a></li>
                            <li><a className="dropdown-item" href="#">Bebek Giyim</a></li>
                            <li><a className="dropdown-item" href="#">Bebek Arabası & Aksesuarlar</a></li>
                            <li><a className="dropdown-item" href="#">Oyuncaklar & Oyunlar</a></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" id="sporDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Spor, Outdoor
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="sporDropdown">
                            <li><a className="dropdown-item" href="#">Spor Giyim</a></li>
                            <li><a className="dropdown-item" href="#">Spor Ayakkabılar</a></li>
                            <li><a className="dropdown-item" href="#">Outdoor Ekipmanları</a></li>
                            <li><a className="dropdown-item" href="#">Fitness & Kondisyon</a></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" id="kozmetikDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Kozmetik, Kisisel Bakim
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" id="supermarketDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Supermarket, Petshop
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" id="kitapDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Kitap, Muzik, Film, Hobi
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
