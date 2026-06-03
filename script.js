function voltarPagina() {
    window.history.back();
}

// Funcionalidade de seleção dos dias da semana
document.addEventListener('DOMContentLoaded', function() {
    const botoesDia = document.querySelectorAll('.btn-dia');
    
    botoesDia.forEach(botao => {
        botao.addEventListener('click', function() {
            // Remove a classe 'ativo' de todos os botões
            botoesDia.forEach(btn => btn.classList.remove('ativo'));
            
            // Adiciona a classe 'ativo' ao botão clicado
            this.classList.add('ativo');
        });
    });
});
