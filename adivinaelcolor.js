"use strict";

const codigocolor = document.getElementById("codigocolor");
const contenedorcolor = document.getElementById("contenedorcolores");
const pantallapuntos = document.getElementById("puntos");
const botonInicio = document.getElementById("comenzar");
const selectorDificultad = document.getElementById("dificultad");

let colorcorrecto;
let puntuacion = 0;
let fallos = 0;
let rondasJugadas = 0;
let cajasDeColor = 10;

function numeroaleatorio() {
    return Math.floor(Math.random() * 256);
}

function generarcolor() {
    const rojo = numeroaleatorio();
    const verde = numeroaleatorio();
    const azul = numeroaleatorio();
    return `rgb(${rojo}, ${verde}, ${azul})`;
}

function iniciarjuego() {
    botonInicio.disabled = true;
    selectorDificultad.disabled = true;
    rondasJugadas++;
    colorcorrecto = generarcolor();
    codigocolor.textContent = colorcorrecto.toUpperCase();
    contenedorcolor.innerHTML = "";

    const colorincorrecto = [];
    while (colorincorrecto.length < cajasDeColor - 1) {
        const color = generarcolor();
        if (color !== colorcorrecto && !colorincorrecto.includes(color)) {
            colorincorrecto.push(color);
        }
    }

    const colores = [colorcorrecto, ...colorincorrecto];
    colores.sort(() => Math.random() - 0.5);
    colores.forEach(color => {
        const cajadecolor = document.createElement("div");
        cajadecolor.classList.add("color-box");
        cajadecolor.style.backgroundColor = color;
        cajadecolor.addEventListener("click", verificarcolor);
        contenedorcolor.appendChild(cajadecolor);
    });
}

function verificarcolor(evento) {
    if (evento.target.style.backgroundColor === colorcorrecto) {
        puntuacion++;
    } else {
        fallos++;
    }
    pantallapuntos.textContent = `Aciertos: ${puntuacion} / Fallos: ${fallos}`;

    if (puntuacion === 3 || fallos === 3) {
        terminarjuego();
    } else {
        iniciarjuego();
    }
}

function terminarjuego() {
    botonInicio.disabled = false;
    selectorDificultad.disabled = false;
    if (puntuacion === 3) {
        alert("¡Has ganado!");
    } else {
        alert("¡Has perdido!");
    }
    rondasJugadas = 0;
    puntuacion = 0;
    fallos = 0;
    pantallapuntos.textContent = `Aciertos: ${puntuacion} / Fallos: ${fallos}`;
}

selectorDificultad.addEventListener("change", function() {
    const dificultad = parseInt(selectorDificultad.value);
    switch (dificultad) {
        case 1:
            cajasDeColor = 10;
            break;
        case 2:
            cajasDeColor = 20;
            break;
        case 3:
            cajasDeColor = 40;
            break;
        default:
            cajasDeColor = 10;
            break;
    }
});

botonInicio.addEventListener("click", iniciarjuego);