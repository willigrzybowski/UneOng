// Evento que é disparado quando toda a página e seus recursos (imagens, CSS, etc.) são carregados 
//window.addEventListener('load', () => { 

// Esconde a tela de carregamento (com o id "loading-screen") assim que a página é carregada 
//document.getElementById('loading-screen').style.display = 'none'; 

// Exibe o conteúdo principal (com o id "main-content") após esconder a tela de carregamento 
//document.getElementById('main-content').style.display = 'block'; 
//});

// Evento que é disparado quando toda a página e seus recursos (imagens, CSS, etc.) são carregados
window.addEventListener('load', () => {
    // Define um tempo mínimo de exibição da tela de carregamento (em milissegundos)
    setTimeout(() => {
        // Esconde a tela de carregamento
        document.getElementById('loading-screen').style.display = 'none';

        // Exibe o conteúdo principal
        document.getElementById('main-content').style.display = 'block';
    }, 2500); //
});