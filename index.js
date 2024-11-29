class LeafletMap {
    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();
    }
    initTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }
    addMarker(lat, lng, name, menuItems) {
        const marker = L.marker([lat, lng]).addTo(this.map);

        let menuHtml = "<ul class='menu-list'>";
        menuItems.forEach(item => {
            menuHtml += `<li data-item="${item.name}" data-price="${item.price}">${item.name}</li>`;
        });
        menuHtml += "</ul>";

        const popupContent = `
            <h5>${name}</h5>
            <p>Menu:</p>
            ${menuHtml}
            <div id="price-display" style="margin-top: 10px; font-weight: bold;"></div>
        `;
        marker.bindPopup(popupContent);

        marker.on('popupopen', function () {
            const menuItems = marker.getPopup().getContent().querySelectorAll('.menu-list li');
            const priceDisplay = marker.getPopup().getContent().querySelector('#price-display');
            menuItems.forEach(item => {
                item.addEventListener('click', function () {
                    const itemName = item.getAttribute('data-item');
                    const itemPrice = item.getAttribute('data-price');
                  
                    priceDisplay.innerHTML = `${itemName} costs ${itemPrice}`;
                });
            });
        });
    }
    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    this.addMarker(marker.latitude, marker.longitude, marker.name, marker.menu);
                });
            })
            .catch(error => console.error('Error loading markers:', error));
    }
}
const myMap = new LeafletMap('map', [8.365441, 124.864993], 18);


myMap.loadMarkersFromJson('index.json');



