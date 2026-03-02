// script.js
    console.log("Script carregado com sucesso!");
    
// Função principal que calcula
function calcular() {
    // Pega o valor digitado
    let expressao = document.getElementById('expressao').value;
    let erroDiv = document.getElementById('erro');
    
    // Remove espaços em branco
    expressao = expressao.replace(/\s/g, '');
    
    // Esconde mensagem de erro anterior
    erroDiv.style.display = 'none';
    
    // Valida se digitou algo
    if (expressao === '') {
        mostrarErro('Digite algo!');
        return;
    }
    
    // Descobre qual operador foi usado
    let operador = '';
    let numeros = [];
    
    if (expressao.includes('+')) {
        operador = '+';
        numeros = expressao.split('+');
    } else if (expressao.includes('-')) {
        operador = '-';
        numeros = expressao.split('-');
    } else if (expressao.includes('*')) {
        operador = '*';
        numeros = expressao.split('*');
    } else if (expressao.includes('/')) {
        operador = '/';
        numeros = expressao.split('/');
    } else {
        mostrarErro('Use + - * /');
        return;
    }
    
    // Valida se tem dois números
    if (numeros.length !== 2) {
        mostrarErro('Formato: numero operador numero');
        return;
    }
    
    // Pega os números separados
    let num1 = numeros[0];
    let num2 = numeros[1];
    
    // Valida se os números existem
    if (num1 === '' || num2 === '') {
        mostrarErro('Faltou número');
        return;
    }
    
    // Converte texto para número
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    
    // Valida se são números válidos
    if (isNaN(num1) || isNaN(num2)) {
        mostrarErro('Números inválidos');
        return;
    }
    
    // Valida divisão por zero
    if (operador === '/' && num2 === 0) {
        mostrarErro('Não divide por zero');
        return;
    }
    
    // Faz o cálculo
    let resultado;
    if (operador === '+') {
        resultado = num1 + num2;
    } else if (operador === '-') {
        resultado = num1 - num2;
    } else if (operador === '*') {
        resultado = num1 * num2;
    } else if (operador === '/') {
        resultado = num1 / num2;
    }
    
    // Mostra o resultado na tela
    document.getElementById('resultado').innerHTML = resultado;
}

// Função para mostrar mensagens de erro
function mostrarErro(mensagem) {
    let erroDiv = document.getElementById('erro');
    erroDiv.innerHTML = mensagem;
    erroDiv.style.display = 'block';
    
    // Limpa o resultado anterior
    document.getElementById('resultado').innerHTML = '0';
}

// Opcional: permite calcular pressionando Enter
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calcular();
    }
});