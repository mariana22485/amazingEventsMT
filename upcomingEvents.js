
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
            <a href="./Details.html" class="btn btn-primary">Details</a>
        </div>
    </div>
</div>`
}

function createUpcomingEvents(arrayCards, container, fechaHoy) {
    let cardsEvent = ""
    for (events of arrayCards) {
        if (events.date > fechaHoy) {
            cardsEvent += createCard(events)
        }
    }
    container.innerHTML = cardsEvent
}

createUpcomingEvents(data.events, containerCard, data.currentDate)
