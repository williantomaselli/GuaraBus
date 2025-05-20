function initMap() {
    
    // cria o mapa centralizado
    const map = L.map('map').setView([-26.4900, -49.0687], 13);
  
    // tiles do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // exemplo de marcador
    L.marker([-26.4900, -49.0687])
      .addTo(map)
      .bindPopup('Centro de Jaraguá do Sul')
      .openPopup();
  }
  
  // chama initMap assim que o JS for carregado
  window.onload = initMap;
  