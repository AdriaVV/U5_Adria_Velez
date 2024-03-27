// Declaramos e iniciamos un array con las cuestiones, las opciones y las respuestas correctas
const cuestionario = [
    {
        pregunta: "¿Cuál es el planeta más grande del sistema solar?",
        opciones: ["Júpiter", "Marte", "Saturno", "Neptuno"],
        respuesta: "Júpiter"
    },
    {
        pregunta: "¿Cuál es el símbolo químico del agua?",
        opciones: ["O", "H2O", "W", "Ag"],
        respuesta: "H2O"
    },
    {
        pregunta: "¿Qué isótopo del uranio se usa para hacer bombas?",
        opciones: ["238", "234", "235", "237"],
        respuesta: "235"
    },
    {
        pregunta: "¿Cuál es el mejor científico de la historia?",
        opciones: ["Einstein", "Galileo", "Maxwell", "Newton"],
        respuesta: "Newton"
    },
    {
        pregunta: "¿Cuál es el componente más abundante en la atmósfera terrestre?",
        opciones: ["Nitrógeno", "Oxígeno", "Dióxido de carbono", "Hidrógeno"],
        respuesta: "Nitrógeno"
    },

];

// Declaramos e iniciamos a 0 las variables para mostrar el número de pregunta actual y la puntuación final
let indicePreguntaActual = 0;
let puntuacion = 0;


// Función para inicializar el cuestionario
function iniciadorCuestionario() {
    mostrarPregunta();
    actualizarContador();
}

// Función para mostrar la pregunta actual y sus opciones de respuesta
function mostrarPregunta() {
    const cuestionActual = cuestionario[indicePreguntaActual];
    const preguntaContainer = document.getElementById('pregunta-container');
    const opcionesContainer = document.getElementById('opciones-container');

    preguntaContainer.textContent = cuestionActual.pregunta;

    // Mostramos y damos estilos a los botones de las opciones
    opcionesContainer.innerHTML = '';
    cuestionActual.opciones.forEach(opcion => {
        const button = document.createElement('button');
        button.textContent = opcion;
        button.classList.add('bg-gray-300', 'hover:bg-gray-400', 'text-gray-800', 'font-semibold', 'py-2', 'px-4', 'mr-2', 'mb-2', 'rounded', 'opcion-button');

        button.addEventListener('click', () => {
            // Resaltar el botón seleccionado y deshabilitar los demás
            document.querySelectorAll('.opcion-button').forEach(btn => {
                if (btn === button) {
                    btn.classList.add('bg-gray-400');
                } else {
                    btn.disabled = true;
                    btn.classList.remove('hover:bg-gray-400')
                }
            });
            seleccionarOpcion(opcion);
        });

        opcionesContainer.appendChild(button);
    });
}

// Variable para almacenar temporalmente la respuesta seleccionada por el usuario
let opcionSeleccionada = null;

// Función para almacenar la respuesta seleccionada por el usuario
function seleccionarOpcion(opcion) {
    opcionSeleccionada = opcion;
}

// Función para avanzar a la siguiente pregunta y verificar la respuesta seleccionada
function siguienteCuestion() {
    if (opcionSeleccionada !== null) {
        const cuestionActual = cuestionario[indicePreguntaActual];
        if (opcionSeleccionada === cuestionActual.respuesta) {
            puntuacion++;
        }
        opcionSeleccionada = null; // Restablecemos la variable para la siguiente pregunta
        indicePreguntaActual++;
        // Mostrar preguntas hasta finalizar el cuestionario y mostrar la puntuación obtenida
        if (indicePreguntaActual < cuestionario.length) {
            mostrarPregunta();
            actualizarContador();
        } else {
            mostrarResultado();
        }
    }
}

// Asignamos eventos de clic a los botones de las opciones
document.querySelectorAll('.opcion-button').forEach(button => {
    button.addEventListener('click', () => seleccionarOpcion(button.textContent));
});

// Asignamos evento de clic al botón "Siguiente"
document.getElementById('siguiente').addEventListener('click', siguienteCuestion);




// Función para mostrar la puntuación final
function mostrarResultado() {
    const container = document.getElementById('pregunta-container');
    container.innerHTML = `<h2 class="text-xl font-semibold mb-4">Tu puntuación final es: ${puntuacion} de ${cuestionario.length}</h2>`;
    document.getElementById('opciones-container').innerHTML = '';
    document.getElementById('siguiente').style.display = 'none';
    document.getElementById('contador').style.display = 'none';
}

// Función para actualizar el contador de preguntas
function actualizarContador() {
    const contador = document.getElementById('contador');
    contador.textContent = `Pregunta ${indicePreguntaActual + 1} de ${cuestionario.length}`;
}

// Inicializar el cuestionario al cargar la página
window.onload = iniciadorCuestionario;

