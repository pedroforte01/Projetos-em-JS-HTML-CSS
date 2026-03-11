
/*-------MENU DE NAVEGAÇÃO-------*/

const inicioBtn = document.querySelector('.inicio');

if(inicioBtn){
    inicioBtn.addEventListener('click', function(e){
        e.preventDefault();
        location.reload();
        window.scrollTo(0,0);
    });
}


/*-------LISTAGEM DE LUTAS E DADOS DOS CAMPEONATOS-------*/

const lutas = [
{
    evento: "AJP TOUR Fortaleza",
    resultado: 1,
    medalha: "🏅",

    lutas: 4,
    vitorias: 4,
    derrotas: 0,

    finalizacoes: 2,
    tempoTotal: 780
},
{
    evento: "Open Ceará",
    resultado: 2,
    medalha: "🥈",

    lutas: 3,
    vitorias: 2,
    derrotas: 1,

    finalizacoes: 1,
    tempoTotal: 640
},
{
    evento: "Nordeste BJJ",
    resultado: 1,
    medalha: "🥇",

    lutas: 4,
    vitorias: 4,
    derrotas: 0,

    finalizacoes: 3,
    tempoTotal: 700
},
{
    evento: "Brasileiro BJJ",
    resultado: 3,
    medalha: "🥉",

    lutas: 2,
    vitorias: 1,
    derrotas: 1,

    finalizacoes: 0,
    tempoTotal: 540
}
];

let totalLutas = 0;
let vitorias = 0;
let derrotas = 0;

let finalizacoes = 0;
let tempoTotal = 0;

let primeiro = 0;
let segundo = 0;
let terceiro = 0;


/*-------ORDENA EVENTOS-------*/

lutas.sort((a,b)=>a.resultado-b.resultado);


/*-------LISTA EVENTOS-------*/

const lista = document.querySelector(".lista-eventos");

lutas.forEach(luta => {

    const item = document.createElement("li");

    let textoResultado = "";

    if(luta.resultado === 1) textoResultado = "CAMPEÃO";
    if(luta.resultado === 2) textoResultado = "2º Lugar";
    if(luta.resultado === 3) textoResultado = "3º Lugar";

    item.textContent = `${luta.evento} - ${textoResultado} ${luta.medalha}`;

    lista.appendChild(item);

});


/*-------CALCULAR ESTATÍSTICAS-------*/

function calcularEstatisticas(){

    lutas.forEach(camp => {

        totalLutas += camp.lutas;
        vitorias += camp.vitorias;
        derrotas += camp.derrotas;

        finalizacoes += camp.finalizacoes;
        tempoTotal += camp.tempoTotal;

        if(camp.resultado === 1) primeiro++;
        if(camp.resultado === 2) segundo++;
        if(camp.resultado === 3) terceiro++;

    });

}

calcularEstatisticas();


/*-------TEMPO MÉDIO-------*/

const tempoMedio = tempoTotal / totalLutas;

function formatarTempo(segundos){

    const minutos = Math.floor(segundos / 60);
    const restoSegundos = Math.floor(segundos % 60);

    return `${minutos}:${restoSegundos.toString().padStart(2,'0')}`;
}

const tempoMedioFormatado = formatarTempo(tempoMedio);


/*-------TAXAS-------*/

const taxaVitoria = ((vitorias / totalLutas) * 100).toFixed(1);
const taxaFinalizacao = ((finalizacoes / totalLutas) * 100).toFixed(1);


/*-------ATUALIZAR ESTATÍSTICAS-------*/

function atualizarEstatisticas(){

    animarNumero("total-lutas", totalLutas)
    animarNumero("total-vitorias", vitorias)
    animarNumero("total-derrotas", derrotas)

    animarNumero("total-ouro", primeiro)
    animarNumero("total-prata", segundo)
    animarNumero("total-bronze", terceiro)

    document.getElementById("taxa-vitoria").textContent = taxaVitoria + "%"
    document.getElementById("taxa-finalizacao").textContent = taxaFinalizacao + "%"
    document.getElementById("tempo-medio").textContent = tempoMedioFormatado

}

atualizarEstatisticas();


/*-------ANIMAÇÃO DONUT-------*/

function atualizarGrafico(){

    const total = vitorias + derrotas
    const porcentagemFinal = (vitorias / total) * 100

    const donut = document.getElementById("donut-chart")
    const texto = document.getElementById("porcentagem-vitoria")

    let progresso = 0

    const animacao = setInterval(()=>{

        progresso += 1

        donut.style.background = `
            conic-gradient(
                #2ecc71 0% ${progresso}%,
                #e74c3c ${progresso}% 100%
            )
        `

        texto.textContent = progresso + "%"

        if(progresso >= porcentagemFinal){
            clearInterval(animacao)
            texto.textContent = Math.round(porcentagemFinal) + "%"
        }

    },15)

}

atualizarGrafico();


/*-------CONTADOR ANIMADO-------*/

function animarNumero(id,valorFinal,duracao=1200){

    const elemento = document.getElementById(id)

    let inicio = 0
    const incremento = valorFinal/(duracao/16)

    const timer = setInterval(()=>{

        inicio += incremento

        if(inicio >= valorFinal){
            inicio = valorFinal
            clearInterval(timer)
        }

        elemento.textContent = Math.floor(inicio)

    },16)

}


/*-------ANIMAÇÃO ENTRADA-------*/

function animarEntrada(){

    const painel = document.querySelector(".area-campanha")

    const observer = new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){
                painel.classList.add("ativo")
            }

        })

    },{threshold:0.3})

    observer.observe(painel)

}

animarEntrada()


/*-------PARTÍCULAS-------*/

function criarParticulas(){

    const container = document.querySelector(".particulas")

    for(let i=0;i<40;i++){

        const p = document.createElement("span")

        p.style.left = Math.random()*100+"%"
        p.style.animationDuration = 8 + Math.random()*10 + "s"
        p.style.opacity = Math.random()*0.5

        container.appendChild(p)

    }

}

criarParticulas()


/*-------SETA SCROLL-------*/

document.addEventListener("DOMContentLoaded",()=>{

    const seta = document.querySelector(".seta-scroll")

    if(seta){

        window.addEventListener("scroll",()=>{

            if(window.scrollY > 100){
                seta.style.opacity = "0"
            }else{
                seta.style.opacity = "1"
            }

        })

        seta.addEventListener("click",()=>{

            document.querySelector(".secao-inferior").scrollIntoView({
                behavior:"smooth"
            })

        })

    }

})

