// Função que busca ONGs no backend
async function buscarOng(nome) {
  try {
    const response = await fetch(`http://localhost:3000/api/buscar?nome=${encodeURIComponent(nome)}`);
    
    if (!response.ok) {
      console.error('Erro na resposta do servidor:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar ONGs:', error);
    return [];
  }
}

const searchInput = document.getElementById('txtbuscar');
const resultsDiv = document.getElementById('results');

// Função de debounce para evitar chamadas em excesso
function debounce(func, delay = 400) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

// Função principal de busca
async function handleSearch() {
  const query = searchInput.value.trim();
  resultsDiv.innerHTML = '';

  if (query === '') {
    resultsDiv.style.display = 'none';
    return;
  }

  const ongs = await buscarOng(query);

  if (!ongs || ongs.length === 0) {
    resultsDiv.style.display = 'none';
    return;
  }

  // Renderizar resultados
  ongs.forEach(ong => {
    const div = document.createElement('div');
    div.classList.add('result-item');

    // Destacar parte digitada
    const regex = new RegExp(`(${query})`, 'gi');
    const highlighted = ong.nome_ong.replace(regex, '<span class="highlight">$1</span>');

    div.innerHTML = `
      <img src="${ong.foto_perfil_ong || '../assets/jpg/foto-perfil-exemplo.jpg'}" alt="${ong.nome_ong}">
      <div class="result-text">
        <span>${highlighted}</span>
      </div>
    `;

    div.style.display = 'flex';

    // Ao clicar no resultado
    div.addEventListener('click', () => {
      // Exemplo: redirecionar para página de detalhes da ONG
    });

    resultsDiv.appendChild(div);
  });

  resultsDiv.style.display = 'block';
}

// Evento de input com debounce
searchInput.addEventListener('input', debounce(handleSearch, 400));
