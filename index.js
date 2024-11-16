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
