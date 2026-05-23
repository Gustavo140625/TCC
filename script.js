function voltarPagina() {
    window.history.back();
}

// Dados das matérias por dia
const materiasPorDia = {
    segunda: ['Matemática Básica', 'Física', 'Português'],
    terca: ['Química', 'História', 'Biologia'],
    quarta: ['Matemática Avançada', 'Redação', 'Inglês'],
    quinta: ['Física Avançada', 'Literatura', 'Química Orgânica'],
    sexta: ['Revisão Geral', 'Exercícios', 'Simulado'],
    sabado: ['Estudo Complementar', 'Pesquisa', 'Aulas Online'],
    domingo: ['Descanso', 'Revisão Leve', 'Planejamento']
};

document.addEventListener('DOMContentLoaded', function() {
    const botoesDia = document.querySelectorAll('.btn-dia');
    const listaMaterias = document.getElementById('lista-materias');
    const diaSelecionado = document.querySelector('.dia-selecionado');
    
    // Função para carregar matérias do dia
    function carregarMaterias(dia) {
        // Limpa a lista anterior
        listaMaterias.innerHTML = '';
        
        // Pega as matérias do dia selecionado
        const materias = materiasPorDia[dia] || [];
        
        // Cria um item para cada matéria COM O CHECKBOX CUSTOMIZADO
        materias.forEach((materia, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <label class="cl-checkbox">
                    <input type="checkbox" id="materia-${index}" data-dia="${dia}">
                    <span></span>
                </label>
                <label for="materia-${index}">${materia}</label>
            `;
            listaMaterias.appendChild(li);
        });
        
        // Atualiza o nome do dia no título
        diaSelecionado.textContent = dia.charAt(0).toUpperCase() + dia.slice(1);
        
        // Carrega o estado salvo (se houver)
        carregarEstadoSalvo(dia);
        
        // Adiciona event listeners aos checkboxes
        atualizarCheckboxes();
    }
    
    // Função para atualizar checkboxes
    function atualizarCheckboxes() {
        const checkboxes = document.querySelectorAll('.lista-materias input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const dia = this.getAttribute('data-dia');
                salvarEstado(dia);
                atualizarProgresso(dia);
            });
        });
    }
    
    // Função para atualizar a barra de progresso
    function atualizarProgresso(dia) {
        const checkboxes = document.querySelectorAll(`input[data-dia="${dia}"]`);
        const marcadas = Array.from(checkboxes).filter(cb => cb.checked).length;
        const total = checkboxes.length;
        const percentual = total > 0 ? Math.round((marcadas / total) * 100) : 0;
        
        // Atualiza a barra visualmente
        document.querySelector('.progresso-fill').style.width = percentual + '%';
        document.querySelector('.progresso-percent').textContent = percentual + '%';
    }
    
    // Função para salvar estado (localStorage)
    function salvarEstado(dia) {
        const checkboxes = document.querySelectorAll(`input[data-dia="${dia}"]`);
        const estados = Array.from(checkboxes).map((cb, index) => ({
            index: index,
            checked: cb.checked
        }));
        
        localStorage.setItem(`materias-${dia}`, JSON.stringify(estados));
    }
    
    // Função para carregar estado salvo
    function carregarEstadoSalvo(dia) {
        const estados = JSON.parse(localStorage.getItem(`materias-${dia}`) || '[]');
        const checkboxes = document.querySelectorAll(`input[data-dia="${dia}"]`);
        
        estados.forEach(estado => {
            if (checkboxes[estado.index]) {
                checkboxes[estado.index].checked = estado.checked;
            }
        });
        
        // Atualiza a barra de progresso
        atualizarProgresso(dia);
    }
    
    // Evento de clique nos dias
    botoesDia.forEach(botao => {
        botao.addEventListener('click', function() {
            // Remove ativo de todos
            botoesDia.forEach(btn => btn.classList.remove('ativo'));
            // Adiciona ativo ao clicado
            this.classList.add('ativo');
            
            // Carrega as matérias do dia
            const dia = this.getAttribute('data-dia');
            carregarMaterias(dia);
        });
    });

    // Carrega o primeiro dia por padrão (Segunda)
    if (botoesDia.length > 0) {
        botoesDia[0].click();
    }
});
