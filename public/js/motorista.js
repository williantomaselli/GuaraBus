let map;
let rotaAtual = null;
let pontosAtuais = [];
let localizacaoUsuario = null;

const rotas = {
  "Guaramirim/Jaraguá via Centro": {
    rota: [
      [-26.4687, -49.0021],
      [-26.4800, -49.0500],
      [-26.4900, -49.0687]
    ],
    pontos: [
      { nome: "Terminal Guaramirim", coords: [-26.4687, -49.0021] },
      { nome: "Ponto 1", coords: [-26.4750, -49.0200] },
      { nome: "Ponto 2", coords: [-26.4850, -49.0600] },
      { nome: "Centro Jaraguá", coords: [-26.4900, -49.0687] }
    ]
  },
  "Jaraguá/Guaramirim via Centro": {
    rota: [
      [-26.4786, -49.0852],
      [-26.4797, -49.0858],
      [-26.481315263856363, -49.08261381091635],
      [-26.48163446148541, -49.08222256024249],
      [-26.48335019046367, -49.080281501956726],
      [-26.482087389728402, -49.07840932007058],
      [-26.48191453381229, -49.07806063290369],
      [-26.48209144047052, -49.07721414579413]
      
    ],
    pontos: [
      { nome: "Terminal Jaraguá", coords: [-26.4786, -49.0852] },
      { nome: "Ponto perto do Banco do Brasil", coords: [-26.48163446148541, -49.08222256024249] },
      { nome: "Terminal Guaramirim", coords: [-26.4687, -49.0021] },
      { nome: "Ponto perto da Igreja de Jesus Cristo dos Santos dos Últimos Dias", coords: [-26.48209144047052, -49.07721414579413] }
    ]
  },
  "Guaramirim/Jaraguá via Corticeira": {
    rota: [
      [-26.4687, -49.0021],
      [-26.4700, -49.0300],
      [-26.4900, -49.0687]
    ],
    pontos: [
      { nome: "Terminal Guaramirim", coords: [-26.4687, -49.0021] },
      { nome: "Ponto Corticeira", coords: [-26.4700, -49.0300] },
      { nome: "Centro Jaraguá", coords: [-26.4900, -49.0687] }
    ]
  },
  "Jaraguá/Guaramirim via Corticeira": {
    rota: [
      [-26.4900, -49.0687],
      [-26.4700, -49.0300],
      [-26.4687, -49.0021]
    ],
    pontos: [
      { nome: "Centro Jaraguá", coords: [-26.4900, -49.0687] },
      { nome: "Ponto Corticeira", coords: [-26.4700, -49.0300] },
      { nome: "Terminal Guaramirim", coords: [-26.4687, -49.0021] }
    ]
  }
};

function initMap() {
  map = L.map('map').setView([-26.4900, -49.0687], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  pedirLocalizacao();

  const seletor = document.getElementById('rota');
  seletor.addEventListener('change', function () {
    const rotaSelecionada = this.value;
    if (rotas[rotaSelecionada]) {
      desenharRota(rotaSelecionada);
    }
  });
}

function desenharRota(nomeRota) {
  // Remove rota anterior
  if (rotaAtual) {
    map.removeLayer(rotaAtual);
  }

  pontosAtuais.forEach(p => map.removeLayer(p));
  pontosAtuais = [];

  const rota = rotas[nomeRota].rota;
  const pontos = rotas[nomeRota].pontos;

  // Linha da rota
  rotaAtual = L.polyline(rota, {
    color: '#00caf8',
    weight: 5
  }).addTo(map);

  map.fitBounds(rotaAtual.getBounds());

  // Apenas bolinhas nos extremos da rota
  [0, rota.length - 1].forEach(i => {
    const marker = L.circleMarker(rota[i], {
      radius: 8,
      color: '#0d47a1',
      fillColor: '#42a5f5',
      fillOpacity: 0.8
    }).addTo(map);
    pontosAtuais.push(marker);
  });

  // Pontos de ônibus com nome
  pontos.forEach(p => {
    const marker = L.marker(p.coords)
      .addTo(map)
      .bindPopup(p.nome);
    pontosAtuais.push(marker);
  });
}

function pedirLocalizacao() {
  if (!navigator.geolocation) {
    alert("Geolocalização não suportada pelo navegador.");
    return;
  }

  navigator.geolocation.watchPosition(pos => {
    const { latitude, longitude } = pos.coords;

    if (localizacaoUsuario) {
      localizacaoUsuario.setLatLng([latitude, longitude]);
    } else {
      localizacaoUsuario = L.circleMarker([latitude, longitude], {
        radius: 8,
        color: '#2196f3',
        fillColor: '#2196f3',
        fillOpacity: 0.9
      }).addTo(map).bindPopup("Você está aqui").openPopup();
    }
  }, () => {
    alert("Não foi possível obter sua localização.");
  }, {
    enableHighAccuracy: true
  });
}

window.onload = initMap;
