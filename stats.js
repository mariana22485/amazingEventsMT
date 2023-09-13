let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing'


async function traerEventos() {
    try {
        let response = await fetch(urlApi);
        let evento = await response.json();
        return evento
    }
    catch (error) {
        console.log("Error")
    }
}

function calcularPorcentajeAsistencia(evento) {
    return ((evento.assistance / evento.capacity) * 100);
}

function generarArregloEventosPasados(arregloEventos, fechaActual) {
    let arregloEventosPasados = []
    for (evento of arregloEventos) {
        if (evento.date <= fechaActual) {
            arregloEventosPasados.push(evento)
        }
    }
    return arregloEventosPasados
}

async function obtenerEventoAsistenciaMayor() {
    try {
        let data = await traerEventos();
        let eventosPasados = generarArregloEventosPasados(data.events, data.currentDate);
        if (eventosPasados.length > 0) {
            let eventoMayor = eventosPasados[0];
            for (elemento of eventosPasados) {
                if (calcularPorcentajeAsistencia(elemento) > calcularPorcentajeAsistencia(eventoMayor)) {
                    eventoMayor = elemento;
                }
            }
            return eventoMayor.name;
        }
    }
    catch (error) { console.log("error"); }
}

let tdMayorAsistencia = document.getElementById('mayorAsistencia');
obtenerEventoAsistenciaMayor().then((nombreEvento) => {
    let divContenedor = document.createElement("div");
    let boton = document.createElement("button");
    boton.innerText = nombreEvento;
    boton.classList.add("btn", "btn-outline-secondary");
    divContenedor.appendChild(boton);
    divContenedor.style.textAlign = "center";
    divContenedor.style.verticalAlign = "middle";
    tdMayorAsistencia.appendChild(divContenedor);
});



async function obtenerEventoAsistenciaMenor() {
    try {
        let data = await traerEventos();
        let eventosPasados = generarArregloEventosPasados(data.events, data.currentDate);
        if (eventosPasados.length > 0) {
            let eventoBuscado = eventosPasados[0];
            for (elemento of eventosPasados) {
                if (calcularPorcentajeAsistencia(elemento) < calcularPorcentajeAsistencia(eventoBuscado)) {
                    eventoBuscado = elemento;
                }
            }
            return eventoBuscado.name;
        }
    }
    catch (error) { console.log("error"); }
}

let tdMenorAsistencia = document.getElementById('menorAsistencia');
obtenerEventoAsistenciaMenor().then((nombreEvento) => {
    let divContenedor = document.createElement("div");
    let boton = document.createElement("button");
    boton.innerText = nombreEvento;
    boton.classList.add("btn", "btn-outline-secondary");
    divContenedor.appendChild(boton);
    divContenedor.style.textAlign = "center";
    divContenedor.style.verticalAlign = "middle";
    tdMenorAsistencia.appendChild(divContenedor);
});


//Buscar Evento con Mayor capacidad
async function obtenerEventoCapacidadMayor() {
    try {
        let data = await traerEventos();
        let arregloEventos = data.events
        if (arregloEventos.length > 0) {
            let eventoBuscado = arregloEventos[0];
            for (elemento of arregloEventos) {
                if (elemento.capacity > eventoBuscado.capacity) {
                    eventoBuscado = elemento;
                }
            }
            return eventoBuscado.name;
        }
    }
    catch (error) { console.log("error"); }
}

let tdMayorCapacidad = document.getElementById('mayorCapacidad');
obtenerEventoCapacidadMayor().then((nombreEvento) => {
   
    let divContenedor = document.createElement("div");
    let boton = document.createElement("button");
    boton.innerText = nombreEvento;
    boton.classList.add("btn", "btn-outline-secondary");
    divContenedor.appendChild(boton);
     divContenedor.style.textAlign = "center";
    divContenedor.style.verticalAlign = "middle";
    tdMayorCapacidad.appendChild(divContenedor);
});


function generarArregloEventosFuturos(arregloEventos, fechaActual) {
    let arregloEventosFuturos = []
    for (evento of arregloEventos) {
        if (evento.date > fechaActual) {
            arregloEventosFuturos.push(evento)

        }
    }
    console.log(arregloEventosFuturos);
    return arregloEventosFuturos

}
function generarArregloEventosPasados(arregloEventos, fechaActual) {
    let arregloEventosPasados = []
    for (evento of arregloEventos) {
        if (evento.date <= fechaActual) {
            arregloEventosPasados.push(evento)

        }
    }
    return arregloEventosPasados

}

function extraerCategoria(arreglo) {
    return arreglo.map(elemento => elemento.category).filter((categoria, indice, categorias) => categorias.indexOf(categoria) === indice)

}

function generarEventosPorCategoria(arregloEventos, categoria) {
    let eventosCategoria = arregloEventos.filter((elemento) => (elemento.category.toLowerCase() === categoria.toLowerCase()));
    return eventosCategoria

}


function obtenerGananciaPorCategoriaFuturas(category, eventosFuturos) {
    let eventosFuturosCategoria = []
    let gananciaTotal = 0;
    eventosFuturosCategoria = generarEventosPorCategoria(eventosFuturos, category);
    let ganancias = eventosFuturosCategoria.map(event => event.estimate * event.price);
    for (ganancia of ganancias) {
        gananciaTotal += ganancia;
    }
    return gananciaTotal;
}


function obtenerGananciaPorCategoriaPasadas(category, eventosPasados) {
    let eventosPasadosCategoria = []
    let gananciaTotal = 0;
    eventosPasadosCategoria = generarEventosPorCategoria(eventosPasados, category);
    let ganancias = eventosPasadosCategoria.map(event => event.assistance * event.price);
    for (ganancia of ganancias) {
        gananciaTotal += ganancia;
    }
    return gananciaTotal;
}



function obtenerPorcentajeEstimadaPorCategoria(category, eventosFuturos) {
    let eventosFuturosCategoria = [];
    let totalAsistencias = 0;
    eventosFuturosCategoria = generarEventosPorCategoria(eventosFuturos, category)
    let asistenciaEstimada = eventosFuturosCategoria.map(event => (event.estimate / event.capacity) * 100);
    for (asistencia of asistenciaEstimada) {
        totalAsistencias += asistencia;
    }


    return totalAsistencias / asistenciaEstimada.length;
}

function obtenerPorcentajeAsistenciaPorCategoria(category, eventosPasados) {
    let eventosPasadosCategoria = [];
    let totalAsistencias = 0;
    eventosPasadosCategoria = generarEventosPorCategoria(eventosPasados, category)
    let asistenciaEstimada = eventosPasadosCategoria.map(event => (event.assistance / event.capacity) * 100);
    for (asistencia of asistenciaEstimada) {
        totalAsistencias += asistencia;
    }


    return totalAsistencias / asistenciaEstimada.length;
}



async function llenarTablaDinamicaFutura() {
    try {

        let data = await traerEventos();
        let eventosFuturos = generarArregloEventosFuturos(data.events, data.currentDate);
        let categorias = extraerCategoria(eventosFuturos);

        // Llenar las celdas del encabezado
        document.getElementById("Categories").textContent = "Category";
        document.getElementById("Revenues").textContent = "Revenues";
        document.getElementById("PercentageAssistance").textContent = "Percentage of assistance";

        let tablaBody = document.getElementById("tablaBody");

        for (category of categorias) {
            let ganancias = obtenerGananciaPorCategoriaFuturas(category, eventosFuturos);
            let asistencias = obtenerPorcentajeEstimadaPorCategoria(category, eventosFuturos);

            let row = document.createElement("tr");

            // Llenar las celdas de la fila

            let categoryCell = document.createElement("td");
            categoryCell.textContent = category;
            categoryCell.classList.add("table-cell", "bg-custom");
            row.appendChild(categoryCell);

            let gananciasCell = document.createElement("td");
            gananciasCell.textContent = ganancias;
            gananciasCell.classList.add("table-cell","bg-custom");
            row.appendChild(gananciasCell);

            let asistenciasCell = document.createElement("td");
            asistenciasCell.textContent = asistencias + "%";
            asistenciasCell.classList.add("table-cell","bg-custom");
            row.appendChild(asistenciasCell);

            tablaBody.appendChild(row);
        }

    } catch (error) {
        console.error("Error al llenar la tabla dinámica: " + error);
    }
}

llenarTablaDinamicaFutura();



async function llenarTablaDinamicaPasado() {
    try {

        let data = await traerEventos();
        let eventosPasados = generarArregloEventosPasados(data.events, data.currentDate);
        let categorias = extraerCategoria(eventosPasados);

        // Llenar las celdas del encabezado
        document.getElementById("cat").textContent = "Category";
        document.getElementById("rev").textContent = "Revenues";
        document.getElementById("porc").textContent = "Percentage of assistance";

        let tablaBody = document.getElementById("tablaBody2");

        for (category of categorias) {
            let ganancias = obtenerGananciaPorCategoriaPasadas(category, eventosPasados);
            let asistencias = obtenerPorcentajeAsistenciaPorCategoria(category, eventosPasados);

            let row = document.createElement("tr");

            // Llenar las celdas de la fila

            let categoryCell = document.createElement("td");
            categoryCell.textContent = category;
            categoryCell.classList.add("table-cell","bg-custom");
            row.appendChild(categoryCell);

            let gananciasCell = document.createElement("td");
            gananciasCell.textContent = ganancias;
            gananciasCell.classList.add("table-cell","bg-custom");
            row.appendChild(gananciasCell);

            let asistenciasCell = document.createElement("td");
            asistenciasCell.textContent = asistencias + "%";
            asistenciasCell.classList.add("table-cell", "bg-custom");
            row.appendChild(asistenciasCell);

            tablaBody.appendChild(row);
        }

    } catch (error) {
        console.error("Error al llenar la tabla dinámica");
    }
}

llenarTablaDinamicaPasado();


