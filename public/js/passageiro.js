// public/js/passageiro.js
document.addEventListener('DOMContentLoaded', () => {
    const selRota  = document.getElementById('rota');
    const selPonto = document.getElementById('ponto');
    const btnPres  = document.getElementById('btn-presenca');
    const infoTotal = document.getElementById('total-confirmados');
    let rotaId     = null;
    let pontoId    = null;
    let presente   = false;
  
    // 1) Preenche o select de rotas
    Object.entries(window.rotas).forEach(([nome, info]) => {
      const opt = new Option(nome, nome);
      selRota.append(opt);
    });
  
    // 2) Ao mudar a rota, preenche select de pontos
    selRota.addEventListener('change', () => {
      const nomeRota = selRota.value;
      selPonto.innerHTML = '<option value="">-- selecione ponto --</option>';
      infoTotal.textContent = '';
      presente = false;
      btnPres.textContent = 'Marcar presença';
      btnPres.disabled = true;
  
      if (!window.rotas[nomeRota]) {
        rotaId = null;
        selPonto.disabled = true;
        return;
      }
  
      rotaId = window.rotas[nomeRota].id;
      selPonto.disabled = false;
  
      window.rotas[nomeRota].pontos.forEach(p => {
        const opt = new Option(p.nome, p.id);
        selPonto.append(opt);
      });
    });
  
    // 3) Ao mudar o ponto, habilita o botão
    selPonto.addEventListener('change', () => {
      pontoId = selPonto.value ? parseInt(selPonto.value, 10) : null;
      btnPres.disabled = !pontoId;
    });
  
    // 4) Ao clicar no botão, marca ou desmarca presença
    btnPres.addEventListener('click', async () => {
      if (!rotaId || !pontoId) return;
  
      // alterna ação: se não estava presente, marca; se estava, desmarca
      const action = !presente;
  
      const res = await fetch('/api/confirmar-ponto', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          rota_id: rotaId,
          ponto_id: pontoId
        })
      }).then(r => r.json());
  
      if (res.success === true) {
        presente = action;
        btnPres.textContent = presente ? 'Cancelar presença' : 'Marcar presença';
        // Opcional: se quiser mostrar o total de confirmados do ponto,
        // modifique o endpoint para retornar o total e use:
        // infoTotal.textContent = `Confirmados: ${res.total}`;
      } else {
        alert('Erro ao atualizar presença');
      }
    });
  });
  