const queryString = location.search
const params = new URLSearchParams(queryString)
console.log(params);
const id = params.get("id")
console.log(id);

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


function visualizarDetails(events) {
    let contenedorDetails = document.querySelector(".containerDetails")
    let concurrencia = ''
    let asistenciaEstimado = ''
    if (events.hasOwnProperty('assistance')) {
        concurrencia = events.assistance;
        asistenciaEstimado = "Assistance";
    } else {
        concurrencia = events.estimate;
        asistenciaEstimado = "Estimate";
    }
    let div = document.createElement('div');
    div.className = 'card'
    div.style.maxWidth = '70%'
    div.style.minHeight = '20rem'
    div.style.padding = '0.5rem'
    div.innerHTML = ` <div class="row g-0">
                 <div class="p-1 col-md-8">
                      <img src="${events.image}" class="card-img-top custom-img" alt="imagen">
                  </div>
                  <div class="cardBody p-1">
                      <h5 class="card-title">${events.name}</h5>
                      <p class="card-text">${events.description}</p>
                      <p>Event date ${events.date}</p>
                      <p> Place ${events.place}</p>
                      <p>Capacity ${events.capacity}</p>
                      <p> ${asistenciaEstimado}: ${concurrencia}</p>
                      <p class="card-price">${events.price}</p>
                  </div>
            </div>`
    contenedorDetails.appendChild(div)
}


function buscarEvento(id) {
    let eventoA = data.events.find(elemento => elemento._id == id)
    console.log("buscarEvento" + eventoA)
    return eventoA
}


let data;
traerEventos().then((info)=> {
    data=info;
    visualizarDetails(buscarEvento(id));
 } )

