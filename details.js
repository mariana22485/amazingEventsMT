const queryString = location.search
const params = new URLSearchParams(queryString)
console.log(params);
const id=params.get("id")
console.log(id);





function visualizarDetails(events){
let contenedorDetails=document.querySelector(".containerDetails")
console.log(contenedorDetails)
let concurrencia= ''
let asistenciaEstimado= ''
if (events.hasOwnProperty('Assistance')) {
    concurrencia = events.Assistance; 
    asistenciaEstimado = "Assistance";
} else {
    concurrencia = events.Estimate; 
    asistenciaEstimado = "Estimate";
}

console.log(asistenciaEstimado)
let div= document.createElement('div');
div.className='card'
div.style.maxWidth= '80%'
div.style.minHeight='20rem'
div.style.padding= '0.5rem'
div.innerHTML= `
    <img src="${events.image}" class="card-img-top custom-img" alt="imagen">

            <h5 class="card-title">${events.name}</h5>
            <p class="card-text">${events.description}</p>
            <p>Event date ${events.date}</p>
            <p> Place ${events.place}</p>
            <p>Capacity ${events.capacity}</p>
            <p> ${asistenciaEstimado}: ${concurrencia}</p>
            <p class="card-price">${events.price}</p>
             </div>`
        contenedorDetails.appendChild(div)
}

function buscarEvento(id){
    let eventoA=data.events.find(elemento=> elemento._id==id)
    console.log("buscarEvento" + eventoA)
return eventoA
}

visualizarDetails(buscarEvento(id))

