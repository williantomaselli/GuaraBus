// public/js/mapa.js

let map;
let rotaAtual = null;
let pontosAtuais = [];
let localizacaoUsuario = null;

// ------------- OBJETO ‘rotas’ COM IDs IGUAIS AO BANCO -------------
const rotas = {
  "Guaramirim/Jaraguá via Centro": {
    id: 1,
    rota: [
      [-26.4786, -49.0852],
      [-26.4797, -49.0858],
      [-26.4813152, -49.0826138],
      [-26.4816344, -49.0822225],
      [-26.4833501, -49.0802815],
      [-26.4820873, -49.0784093],
      [-26.4819145, -49.0780606],
      [-26.4820914, -49.0772141],
      [-26.4817397, -49.0752555],
      [-26.4791674, -49.0723589],
      [-26.4816576, -49.0719189],
      [-26.4821750, -49.0717845],
      [-26.4822097, -49.0710386],
      [-26.4822262, -49.0687226],
      [-26.4816873, -49.0661807],
      [-26.4807246, -49.0617777],
      [-26.4800108, -49.0587468],
      [-26.4799837, -49.0584266],
      [-26.4799158, -49.0569776],
      [-26.4798615, -49.0561735],
      [-26.4794874, -49.0548761],
      [-26.4793332, -49.0546943],
      [-26.4791762, -49.0546145],
      [-26.4783482, -49.0545603],
      [-26.4782283, -49.0544678],
      [-26.4781969, -49.0542573],
      [-26.4781640, -49.0516955],
      [-26.4781517, -49.0500976],
      [-26.4780948, -49.0495308],
      [-26.4780948, -49.0490372],
      [-26.4779580, -49.0482192],
      [-26.4777755, -49.0477310],
      [-26.4775901, -49.0464629],
      [-26.4776537, -49.0462723],
      [-26.4776399, -49.0460075],
      [-26.4776070, -49.0456216],
      [-26.4776327, -49.0454653],
      [-26.4777227, -49.0452707],
      [-26.4777869, -49.0451272],
      [-26.4777498, -49.0449773],
      [-26.4776646, -49.0447679],
      [-26.4776703, -49.0442734],
      [-26.4776246, -49.0438796],
      [-26.4775861, -49.0436610],
      [-26.4776212, -49.0431233],
      [-26.4777201, -49.0421876],
      [-26.4778186, -49.0414517],
      [-26.4778831, -49.0408296],
      [-26.4779527, -49.0401640],
      [-26.4781089, -49.0391853],
      [-26.4781734, -49.0388761],
      [-26.4782952, -49.0380159],
      [-26.4785038, -49.0368804],
      [-26.4787637, -49.0351206],
      [-26.4787839, -49.0342771],
      [-26.4786992, -49.0338405],
      [-26.4784495, -49.0332826],
      [-26.4780822, -49.0327944],
      [-26.4776696, -49.0324600],
      [-26.4775923, -49.0324017],
      [-26.4770235, -49.0321160],
      [-26.4766314, -49.0319623],
      [-26.4764922, -49.0318713],
      [-26.4762121, -49.0317082],
      [-26.4756927, -49.0313858],
      [-26.4754581, -49.0311633],
      [-26.4752505, -49.0309139],
      [-26.4750368, -49.0305196],
      [-26.4749083, -49.0301588],
      [-26.4747971, -49.0295426],
      [-26.4747562, -49.0289270],
      [-26.4747106, -49.0285354],
      [-26.4746317, -49.0274945],
      [-26.4745617, -49.0264352],
      [-26.4745062, -49.0257346],
      [-26.4742196, -49.0224056],
      [-26.4741657, -49.0216475],
      [-26.4741918, -49.0212620],
      [-26.4741674, -49.0209199],
      [-26.4743410, -49.0200918],
      [-26.4744105, -49.0197380],
      [-26.4746024, -49.0190040],
      [-26.4750254, -49.0181240],
      [-26.4753382, -49.0175960],
      [-26.4757656, -49.0168366],
      [-26.4761003, -49.0162837],
      [-26.4761647, -49.0161634],
      [-26.4763091, -49.0158097],
      [-26.4766100, -49.0152887],
      [-26.4768472, -49.0148760],
      [-26.4771853, -49.0142935],
      [-26.4777363, -49.0133269],
      [-26.4782396, -49.0124452],
      [-26.4786112, -49.0117837],
      [-26.4787657, -49.0116111],
      [-26.4788675, -49.0114262],
      [-26.4790329, -49.0109749],
      [-26.4792661, -49.0102279],
      [-26.4794417, -49.0094384],
      [-26.4795673, -49.0078560],
      [-26.4795085, -49.0075627],
      [-26.4795267, -49.0057253],
      [-26.4795429, -49.0044149],
      [-26.4795328, -49.0031113],
      [-26.4794702, -49.0025497],
      [-26.4792077, -49.0013481],
      [-26.4786523, -48.9999766],
      [-26.4780451, -48.9985760],
      [-26.4778487, -48.9981631],
      [-26.4774940, -48.9973893],
      [-26.4767369, -48.9956977],
      [-26.4762198, -48.9945639],
      [-26.4757277, -48.9933687],
      [-26.4755565, -48.9927678],
      [-26.4754844, -48.9923601],
      [-26.4754432, -48.9918023],
      [-26.4754092, -48.9912277],
      [-26.4754141, -48.9906629],
      [-26.4754209, -48.9904543],
      [-26.4754753, -48.9901034],
      [-26.4754854, -48.9898246],
      [-26.4754430, -48.9895686],
      [-26.4754313, -48.9887968],
      [-26.4754385, -48.9879643],
      [-26.4754442, -48.9872148],
      [-26.4754419, -48.9852947],
      [-26.4754448, -48.9839640],
      [-26.4754206, -48.9833155],
      [-26.4753478, -48.9826681],
      [-26.4752267, -48.9821279],
      [-26.4750324, -48.9814036],
      [-26.4748508, -48.9808662],
      [-26.4745569, -48.9799924],
      [-26.4744927, -48.9798106],
      [-26.4744613, -48.9796033],
      [-26.4743713, -48.9793784],
    ],
    pontos: [
      { id: 1,  nome: "Terminal Jaraguá",           coords: [-26.4786, -49.0852] },
      { id: 2,  nome: "Ponto Banco do Brasil",      coords: [-26.4816344, -49.0822225] },
      { id: 3,  nome: "Ponto Igreja",               coords: [-26.4820914, -49.0772141] },
      { id: 4,  nome: "Ponto Fort",                 coords: [-26.4816167, -49.0750358] },
      { id: 5,  nome: "Ponto Multimotors",          coords: [-26.4797403, -49.0722594] },
      { id: 6,  nome: "Ponto Big Dog Brasil",       coords: [-26.4822096, -49.0710386] },
      { id: 7,  nome: "Ponto Marisol",              coords: [-26.4816873, -49.0661807] },
      { id: 8,  nome: "Ponto BalMec",               coords: [-26.4807246, -49.0617777] },
      { id: 9,  nome: "Ponto Lotérica Baependi",    coords: [-26.4800108, -49.0587468] },
      { id: 10, nome: "Ponto WEG Portaria 21",      coords: [-26.4781640, -49.0516955] },
      { id: 11, nome: "Ponto WEG Portaria 23",      coords: [-26.4776703, -49.0442734] },
      { id: 12, nome: "Ponto Viaduto",              coords: [-26.4785038, -49.0368804] },
      { id: 13, nome: "Ponto Vonpar",               coords: [-26.4742323, -49.0212759] },
      { id: 14, nome: "Ponto Costello",             coords: [-26.4757656, -49.0168366] },
      { id: 15, nome: "Ponto Enfrente Benner",      coords: [-26.4795673, -49.0078560] },
      { id: 16, nome: "Ponto Vilmar Demolições",    coords: [-26.4755202, -48.9898190] },
      { id: 17, nome: "Ponto MMG Caminhões",        coords: [-26.4744046, -48.9793600] },
      { id: 18, nome: "Ponto Transluc",             coords: [-26.4775923, -49.0324017] },
    ]
  },
  "Jaraguá/Guaramirim via Centro": {
    id: 2,
    rota: [
      [-26.4786, -49.0852],
      [-26.4797, -49.0858],
      [-26.4813152, -49.0826138],
      [-26.4816344, -49.0822225],
      [-26.4833501, -49.0802815],
      [-26.4820873, -49.0784093],
      [-26.4819145, -49.0780606],
      [-26.4820914, -49.0772141],
      [-26.4817397, -49.0752555],
      [-26.4791674, -49.0723589],
      [-26.4816576, -49.0719189],
      [-26.4821750, -49.0717845],
      [-26.4822097, -49.0710386],
      [-26.4822262, -49.0687226],
      [-26.4816873, -49.0661807],
      [-26.4807246, -49.0617777],
      [-26.4800108, -49.0587468],
      [-26.4799837, -49.0584266],
      [-26.4799158, -49.0569776],
      [-26.4798615, -49.0561735],
      [-26.4794874, -49.0548761],
      [-26.4793332, -49.0546943],
      [-26.4791762, -49.0546145],
      [-26.4783482, -49.0545603],
      [-26.4782283, -49.0544678],
      [-26.4781969, -49.0542573],
      [-26.4781640, -49.0516955],
      [-26.4781517, -49.0500976],
      [-26.4780948, -49.0495308],
      [-26.4780948, -49.0490372],
      [-26.4779580, -49.0482192],
      [-26.4777755, -49.0477310],
      [-26.4775901, -49.0464629],
      [-26.4776537, -49.0462723],
      [-26.4776399, -49.0460075],
      [-26.4776070, -49.0456216],
      [-26.4776327, -49.0454653],
      [-26.4777227, -49.0452707],
      [-26.4777869, -49.0451272],
      [-26.4777498, -49.0449773],
      [-26.4776646, -49.0447679],
      [-26.4776703, -49.0442734],
      [-26.4776246, -49.0438796],
      [-26.4775861, -49.0436610],
      [-26.4776212, -49.0431233],
      [-26.4777201, -49.0421876],
      [-26.4778186, -49.0414517],
      [-26.4778831, -49.0408296],
      [-26.4779527, -49.0401640],
      [-26.4781089, -49.0391853],
      [-26.4781734, -49.0388761],
      [-26.4782952, -49.0380159],
      [-26.4785038, -49.0368804],
      [-26.4787637, -49.0351206],
      [-26.4787839, -49.0342771],
      [-26.4786992, -49.0338405],
      [-26.4784495, -49.0332826],
      [-26.4780822, -49.0327944],
      [-26.4776696, -49.0324600],
      [-26.4775923, -49.0324017],
      [-26.4770235, -49.0321160],
      [-26.4766314, -49.0319623],
      [-26.4764922, -49.0318713],
      [-26.4762121, -49.0317082],
      [-26.4756927, -49.0313858],
      [-26.4754581, -49.0311633],
      [-26.4752505, -49.0309139],
      [-26.4750368, -49.0305196],
      [-26.4749083, -49.0301588],
      [-26.4747971, -49.0295426],
      [-26.4747562, -49.0289270],
      [-26.4747106, -49.0285354],
      [-26.4746317, -49.0274945],
      [-26.4745617, -49.0264352],
      [-26.4745062, -49.0257346],
      [-26.4742196, -49.0224056],
      [-26.4741657, -49.0216475],
      [-26.4741918, -49.0212620],
      [-26.4741674, -49.0209199],
      [-26.4743410, -49.0200918],
      [-26.4744105, -49.0197380],
      [-26.4746024, -49.0190040],
      [-26.4750254, -49.0181240],
      [-26.4753382, -49.0175960],
      [-26.4757656, -49.0168366],
      [-26.4761003, -49.0162837],
      [-26.4761647, -49.0161634],
      [-26.4763091, -49.0158097],
      [-26.4766100, -49.0152887],
      [-26.4768472, -49.0148760],
      [-26.4771853, -49.0142935],
      [-26.4777363, -49.0133269],
      [-26.4782396, -49.0124452],
      [-26.4786112, -49.0117837],
      [-26.4787657, -49.0116111],
      [-26.4788675, -49.0114262],
      [-26.4790329, -49.0109749],
      [-26.4792661, -49.0102279],
      [-26.4794417, -49.0094384],
      [-26.4795673, -49.0078560],
      [-26.4795085, -49.0075627],
      [-26.4795267, -49.0057253],
      [-26.4795429, -49.0044149],
      [-26.4795328, -49.0031113],
      [-26.4794702, -49.0025497],
      [-26.4792077, -49.0013481],
      [-26.4786523, -48.9999766],
      [-26.4780451, -48.9985760],
      [-26.4778487, -48.9981631],
      [-26.4774940, -48.9973893],
      [-26.4767369, -48.9956977],
      [-26.4762198, -48.9945639],
      [-26.4757277, -48.9933687],
      [-26.4755565, -48.9927678],
      [-26.4754844, -48.9923601],
      [-26.4754432, -48.9918023],
      [-26.4754092, -48.9912277],
      [-26.4754141, -48.9906629],
      [-26.4754209, -48.9904543],
      [-26.4754753, -48.9901034],
      [-26.4754854, -48.9898246],
      [-26.4754430, -48.9895686],
      [-26.4754313, -48.9887968],
      [-26.4754385, -48.9879643],
      [-26.4754442, -48.9872148],
      [-26.4754419, -48.9852947],
      [-26.4754448, -48.9839640],
      [-26.4754206, -48.9833155],
      [-26.4753478, -48.9826681],
      [-26.4752267, -48.9821279],
      [-26.4750324, -48.9814036],
      [-26.4748508, -48.9808662],
      [-26.4745569, -48.9799924],
      [-26.4744927, -48.9798106],
      [-26.4744613, -48.9796033],
      [-26.4743713, -48.9793784]
    ],
    pontos: [
      { id: 1,  nome: "Terminal Jaraguá",           coords: [-26.4786, -49.0852] },
      { id: 2,  nome: "Ponto Banco do Brasil",      coords: [-26.4816344, -49.0822225] },
      { id: 3,  nome: "Ponto Igreja",               coords: [-26.4820914, -49.0772141] },
      { id: 4,  nome: "Ponto Fort",                 coords: [-26.4816167, -49.0750358] },
      { id: 5,  nome: "Ponto Multimotors",          coords: [-26.4797403, -49.0722594] },
      { id: 6,  nome: "Ponto Big Dog Brasil",       coords: [-26.4822096, -49.0710386] },
      { id: 7,  nome: "Ponto Marisol",              coords: [-26.4816873, -49.0661807] },
      { id: 8,  nome: "Ponto BalMec",               coords: [-26.4807246, -49.0617777] },
      { id: 9,  nome: "Ponto Lotérica Baependi",    coords: [-26.4800108, -49.0587468] },
      { id: 10, nome: "Ponto WEG Portaria 21",      coords: [-26.4781640, -49.0516955] },
      { id: 11, nome: "Ponto WEG Portaria 23",      coords: [-26.4776703, -49.0442734] },
      { id: 12, nome: "Ponto Viaduto",              coords: [-26.4785038, -49.0368804] },
      { id: 13, nome: "Ponto Vonpar",               coords: [-26.4742323, -49.0212759] },
      { id: 14, nome: "Ponto Costello",             coords: [-26.4757656, -49.0168366] },
      { id: 15, nome: "Ponto Enfrente Benner",      coords: [-26.4795673, -49.0078560] },
      { id: 16, nome: "Ponto Vilmar Demolições",    coords: [-26.4755202, -48.9898190] },
      { id: 17, nome: "Ponto MMG Caminhões",        coords: [-26.4744046, -48.9793600] },
      { id: 18, nome: "Ponto Transluc",             coords: [-26.4775923, -49.0324017] }
    ]
  }
};

// --------------------------------------------------
// initMap: inicializa o Leaflet e configura eventos
// --------------------------------------------------
function initMap() {
  map = L.map('map').setView([-26.4900, -49.0687], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  pedirLocalizacao();

  const seletor = document.getElementById('rota');
  seletor.addEventListener('change', function () {
    const rotaSelecionada = this.value;
    if (rotas[rotaSelecionada]) {
      desenharRota(rotaSelecionada);
      popularCardDeConfirmacao(rotaSelecionada);
    } else {
      limparRotaAnterior();
      esconderCardDeConfirmacao();
    }
  });

  const btnConfirm = document.getElementById('confirm-btn');
  btnConfirm.addEventListener('click', function () {
    const selectPontos = document.getElementById('pontoSelector');
    const pontoNome    = selectPontos.value;
    const pontosArray  = rotas[document.getElementById('rota').value].pontos;
    const pontoObj     = pontosArray.find(p => p.nome === pontoNome);

    if (!pontoObj) {
      mostrarFeedback('Selecione um ponto válido.', 'danger');
      return;
    }

    const rotaId  = rotas[document.getElementById('rota').value].id;
    const pontoId = pontoObj.id;
    marcarPresencaServidor(rotaId, pontoId);
  });
}

// --------------------------------------------------
// desenharRota: remove rota antiga, pinta nova rota
// --------------------------------------------------
function desenharRota(nomeRota) {
  limparRotaAnterior();

  const { rota, pontos } = rotas[nomeRota];

  rotaAtual = L.polyline(rota, {
    color: '#00caf8',
    weight: 5
  }).addTo(map);

  map.fitBounds(rotaAtual.getBounds());

  // Bolinhas nos extremos
  [0, rota.length - 1].forEach((i) => {
    const marker = L.circleMarker(rota[i], {
      radius: 8,
      color: '#0d47a1',
      fillColor: '#42a5f5',
      fillOpacity: 0.8
    }).addTo(map);
    pontosAtuais.push(marker);
  });

  // Marcadores de cada ponto
  pontos.forEach((p) => {
    const marker = L.marker(p.coords).addTo(map).bindPopup(p.nome);
    pontosAtuais.push(marker);
  });
}

// --------------------------------------------------
// limparRotaAnterior: remove polyline + marcadores
// --------------------------------------------------
function limparRotaAnterior() {
  if (rotaAtual) {
    map.removeLayer(rotaAtual);
    rotaAtual = null;
  }
  pontosAtuais.forEach((p) => map.removeLayer(p));
  pontosAtuais = [];
}

// --------------------------------------------------
// popularCardDeConfirmacao: exibe card e preenche pontos
// --------------------------------------------------
function popularCardDeConfirmacao(nomeRota) {
  const containerCard = document.getElementById('confirm-card');
  const selectPontos  = document.getElementById('pontoSelector');
  const pontos        = rotas[nomeRota].pontos;

  // Limpa opções antigas
  selectPontos.innerHTML = '<option value="">-- selecione um ponto --</option>';

  // Adiciona cada ponto
  pontos.forEach((p) => {
    const opt = document.createElement('option');
    opt.value = p.nome;
    opt.textContent = p.nome;
    selectPontos.appendChild(opt);
  });

  // Mostra o card, limpa feedback e desabilita o botão inicialmente
  containerCard.style.display = 'block';
  mostrarFeedback('', '');
  document.getElementById('confirm-btn').disabled = true;

  // Se mudar o select de pontos, habilita/desabilita botão
  selectPontos.addEventListener('change', (e) => {
    document.getElementById('confirm-btn').disabled = !e.target.value;
  });
}

// --------------------------------------------------
// esconderCardDeConfirmacao: oculta o card por completo
// --------------------------------------------------
function esconderCardDeConfirmacao() {
  const containerCard = document.getElementById('confirm-card');
  containerCard.style.display = 'none';
  mostrarFeedback('', '');
  document.getElementById('pontoSelector').innerHTML = '';
  document.getElementById('confirm-btn').disabled = true;
}

// --------------------------------------------------
// marcarPresencaServidor: faz o POST para o backend
// --------------------------------------------------
function marcarPresencaServidor(rotaId, pontoId) {
  fetch('/api/confirmar-presenca', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ rota_id: rotaId, ponto_id: pontoId })
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((data) => {
          throw new Error(data.error || 'Erro desconhecido');
        });
      }
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        mostrarFeedback('Presença confirmada com sucesso!', 'success');
      } else {
        mostrarFeedback('Não foi possível confirmar presença.', 'danger');
      }
    })
    .catch((err) => {
      mostrarFeedback(`Erro: ${err.message}`, 'danger');
    });
}

// --------------------------------------------------
// mostrarFeedback: exibe texto de sucesso ou erro
// --------------------------------------------------
function mostrarFeedback(msg, tipo) {
  const feedbackEl = document.getElementById('confirm-feedback');
  feedbackEl.textContent = msg;
  feedbackEl.className = ''; // limpa classes
  if (tipo === 'success') {
    feedbackEl.classList.add('text-success');
  } else if (tipo === 'danger') {
    feedbackEl.classList.add('text-danger');
  }
}

// --------------------------------------------------
// pedirLocalizacao: plota “Você está aqui” se permitido
// --------------------------------------------------
function pedirLocalizacao() {
  if (!navigator.geolocation) {
    alert('Geolocalização não suportada pelo navegador.');
    return;
  }
  navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      if (localizacaoUsuario) {
        localizacaoUsuario.setLatLng([latitude, longitude]);
      } else {
        localizacaoUsuario = L.circleMarker([latitude, longitude], {
          radius: 8,
          color: '#2196f3',
          fillColor: '#2196f3',
          fillOpacity: 0.9
        })
          .addTo(map)
          .bindPopup('Você está aqui')
          .openPopup();
      }
    },
    () => {
      alert('Não foi possível obter sua localização.');
    },
    {
      enableHighAccuracy: true
    }
  );
}

window.onload = initMap;
