let pokemon

//prendiamo i dati dal file pokedex.json con il metodo fetch
fetch("pokemon.json-master/pokedex.json")
.then(response => {
    return response.json()
})
.then(data => {
    pokemon = data
    generaCarte(pokemon)
})
.catch(err => {
    console.log("ERROR! controlla il percorso!")
})

//inseriamo le carte in modo dinamico nel DOM con il metodo insertAd..
function generaCarte (listaPokemon) {
    const pokedex = document.getElementById("pokedex");
    pokedex.innerHTML = ""
    listaPokemon.forEach(pokemon  => {
        const card =  
        `<div class="col">
           <div class="card">
             <img src="pokemon.json-master/images/${formatId(pokemon.id)}.png" class="card-img-top" title="${pokemon.name.english}">
             <h5 style="text-align: center; margin-top: 15px" class="card-title">${pokemon.name.english}</h5>
            </div>
        </div>`
        pokedex.insertAdjacentHTML("beforeend", card);
    });
}

//aggiunge gli zeri mancanti ai corrispondenti id
function formatId(id) {
    if(id.toString().length == 1){
        return `00${id}`
    }
    if(id.toString().length == 2){ 
        return `0${id}`
    }
    return id 
}

//filtriamo l'array in base alle lettere digitate nell'input
const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keyup", (e)=>{
    const pokemonFiltrati = pokemon.filter(pkmn => {
        return pkmn.name.english.startsWith(e.target.value)
    })
    generaCarte(pokemonFiltrati)
});
