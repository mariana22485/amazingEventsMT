
let containerCard = document.querySelector(".contenedorCard");

function createCard(events) {
    return `<div class="card" style="width: 18rem;">
    <img src="${events.image}" class="card-img-top custom-img" alt="imagen">
    <div class="card-body">
        <div class="card-text-container">
            <h5 class="card-title">${events.name}</h5>
            <p class="card-text">${events.description}</p>
            <p>Event date ${events.date}</p>
        </div>
        <div class="card-footer">
            <p class="card-price">${events.price}</p>
            <a href="./Details.html?id=${events._id}" class="btn btn-primary">Details</a>
        </div>
    </div>
</div>`
}

function createPastEvents(arrayCards,fechaHoy) {
    let cardsEvent = ""
    for (events of arrayCards) {
        if (events.date <= fechaHoy) {
            cardsEvent += createCard(events)
        }
    }
    return cardsEvent;
}


containerCard.innerHTML = createPastEvents(data.events, data.currentDate)


/////////////////////////


const inputTexto = document.querySelector('#texto')   

inputTexto.addEventListener("input", () => {
    let arregloFiltrarPorCategoria = filtrarEventos(filtrarPorCategoria(data.events), inputTexto.value)
    if (arregloFiltrarPorCategoria.length == 0){
        containerCard.innerHTML="No hay resultados para la busqueda"
    }else{
        containerCard.innerHTML = createPastEvents(arregloFiltrarPorCategoria, data.currentDate)
    }
   
})




function filtrarEventos(arregloDeEventos, texto) {
    let categoriaFiltrada = arregloDeEventos.filter
    (elemento => elemento.name.toLowerCase().includes(texto.trim().toLowerCase()) ||
    elemento.place.toLowerCase().includes(texto.trim().toLowerCase()) ||
    elemento.description.toLowerCase().includes(texto.trim().toLowerCase()))
   
    return categoriaFiltrada
}


//Creamos los checkbox//

let categorias = extraerCategoria(data.events)
let checkCategorias=document.querySelector(".listaDeFiltros")




function crearSwitch(elemento) {
    return `<div class="form-check form-switch d-flex flex-wrap gap-0  col-md-8 col-lg-6 " style="font-size: 15px">
                   <input class="form-check-input " type="checkbox" role="switch" id="${elemento.trim}" value="${elemento}">
                   <label class="form-check-label" for="${elemento.trim}">${elemento}</label>
                 </div>`;
}
function visualizarSwitch(arregloCategoria, contenedor) {
    
       let html = ''
    arregloCategoria.forEach(elemento => {
        html += crearSwitch(elemento)
        
    }) 
       contenedor.innerHTML = html
    
}
visualizarSwitch(extraerCategoria(data.events), checkCategorias)


function extraerCategoria(arreglo) {
   return arreglo.map(elemento => elemento.category).filter((categoria, indice, categorias) => categorias.indexOf(categoria) === indice)
 }

 // esta funcion deveulve un arreglo de eventos a mostrar
function filtrarPorCategoria(arreglo){
let checkboxes = Array.from(document.querySelectorAll('.form-check-input'))
let checkboxesAzules= checkboxes.filter(check=> check.checked)
let valores=checkboxesAzules.map(checkAzul=> checkAzul.value)
if(valores.length == 0){
    return arreglo
}
let arrayFiltrado= arreglo.filter(evento=> valores.includes(evento.category)) 
return arrayFiltrado
}

// //funcion que genera las tarjetas para cada uno de los eventos de un 
function refrescarContenido(){

      containerCard.innerHTML=createPastEvents(filtrarPorCategoria(data.events), data.currentDate);
}

checkCategorias.addEventListener("change",refrescarContenido)


