let map;
let rotaAtual = null;

const rotas = {
  "Guaramirim/Jaraguá via Centro": [
    [-26.4687, -49.0021], // Ponto em Guaramirim
    [-26.4800, -49.0500], // No caminho
    [-26.4900, -49.0687]  // Centro Jaraguá
  ],
  "Jaraguá/Guaramirim via Centro": [
    [-26.478641403865968, -49.085274426670075],
    [-26.47971840341887, -49.08586753461779],
    [-26.4687, -49.0021]
  ],
  "Guaramirim/Jaraguá via Corticeira": [
    [-26.4687, -49.0021],
    [-26.4700, -49.0300],
    [-26.4900, -49.0687]
  ],
  "Jaraguá/Guaramirim via Corticeira": [
    [-26.4900, -49.0687],
    [-26.4700, -49.0300],
    [-26.4687, -49.0021]
  ]
};

function initMap() {
  map = L.map('map').setView([-26.4900, -49.0687], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);


  // Escuta mudança na rota selecionada
  const seletor = document.getElementById('rota');
  seletor.addEventListener('change', function () {
    const rotaSelecionada = this.value;
    if (rotas[rotaSelecionada]) {
      desenharRota(rotas[rotaSelecionada]);
    }
  });
}

function desenharRota(pontos) {
  // Remove rota anterior se houver
  if (rotaAtual) {
    map.removeLayer(rotaAtual);
  }

  // Cria nova linha
  rotaAtual = L.polyline(pontos, {
    color: '#00caf8',
    weight: 5
  }).addTo(map);

  // Ajusta o zoom para caber a rota
  map.fitBounds(rotaAtual.getBounds());

  // Adiciona marcadores nos pontos
  pontos.forEach(ponto => {
    L.circleMarker(ponto, {
      radius: 6,
      color: '#5015bd',
      fillColor: '#027fe9',
      fillOpacity: 0.6
    }).addTo(map);
  });
}

// Inicializa quando carregar
window.onload = initMap;
