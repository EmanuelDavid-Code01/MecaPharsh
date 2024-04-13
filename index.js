const botonEmpezar = document.getElementById("empezarBtn");
const barraProgreso = document.getElementById("barraProgreso");
const letrasCorrectasElement = document.querySelector("#letrasCorrectas span");
const letrasIncorrectasElement = document.querySelector("#letrasIncorrectas span");
const palabrasPorMinutoElement = document.querySelector("#palabrasPorMinuto span");
const final = document.querySelector("#final");
const botonReiniciar = document.querySelector("#final button");
const palabraContainer = document.querySelector("#palabraContainer");
const tiempoJuego = 60;
let jugando = false;
let letrasCorrectas;
let letrasIncorrectas;
let letrasTerminadas;
let listaLetras = [];
let indiceActual;

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("input").focus();
});

setInterval(function () {
  document.querySelector("input").focus();
}, 100);

document.querySelector("input").addEventListener("keydown", (event) => {
  const keyCode = event.keyCode;

  if (keyCode === 32 && !jugando) {
    empezar();
    return;
  }

  if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)) {
    // Acciones adicionales para teclas tipográficas
  }

  const letraIngresada = event.key.toLowerCase();
  if (letraIngresada === listaLetras[indiceActual].textContent.toLowerCase()) {
    listaLetras[indiceActual].classList.toggle("letraActual");
    crearLetraEfecto(listaLetras[indiceActual]);
    indiceActual++;
    letrasCorrectas++;
    if (indiceActual === listaLetras.length) {
      nuevaPalabra();
      letrasTerminadas++;
    }
  } else {
    letrasIncorrectas++;
  }
});

function crearLetraEfecto(element) {
  const letra = element.textContent;
  const posicionLetra = element.getBoundingClientRect();
  const nuevaLetra = document.createElement("span");
  nuevaLetra.style = `
    left: ${posicionLetra.left}px;
    top: ${posicionLetra.top}px;
  `;
  nuevaLetra.style.position = "fixed";
  nuevaLetra.classList.add("desaparecer");
  nuevaLetra.textContent = letra;
  document.body.appendChild(nuevaLetra);
}


function empezar() {
  jugando = true;
  palabraActual.classList.toggle("escondido", false);
  nuevaPalabra();
  letrasCorrectas = 0;
  letrasIncorrectas = 0;
  letrasTerminadas = 0;
  final.classList.toggle("escondido", true);
  barraProgreso.classList.toggle("completarTiempo", true);
  botonEmpezar.classList.toggle("escondido", true);
}

function nuevaPalabra() {
  if (listaLetras && listaLetras.length > 0) {
    listaLetras.forEach((letra) => {
      palabraActual.removeChild(letra);
    });
  }

  const nPalabraElegida = Math.floor(Math.random() * dictionary.length);
  const palabraElegida = dictionary[nPalabraElegida];

  listaLetras = [];
  indiceActual = 0;
  
  for (let i = 0; i < palabraElegida.length; i++) {
    const letraElement = document.createElement("span");
    letraElement.textContent = palabraElegida[i];
    palabraActual.appendChild(letraElement);
    listaLetras.push(letraElement);
  }

  setTimeout(() => {
    limpiarInput();
  }, 100);
}

function limpiarInput() {
  document.querySelector("input").value = "";
}

botonEmpezar.addEventListener("click", () => empezar());
botonReiniciar.addEventListener("click", () => empezar());

barraProgreso.addEventListener("animationend", () => {
  final.classList.toggle("escondido", false);
  barraProgreso.classList.toggle("completarTiempo", false);

  letrasCorrectasElement.textContent = letrasCorrectas;
  letrasIncorrectasElement.textContent = letrasIncorrectas;
  palabrasPorMinutoElement.textContent = letrasTerminadas*(60/tiempoJuego);

  palabraActual.classList.toggle("escondido", true);
  jugando = false;
});

document.documentElement.style.setProperty("--tiempo", tiempoJuego + "s");
