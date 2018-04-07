const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/"
const POKEMON_IMAGE_URL = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"
let uls = document.getElementsByTagName("ul")
let divs = document.getElementsByTagName("div")

class Pokemon {
    constructor(name) {
        let that = this
        let linksArray = []
        let pokemoon = []
        linksArray.push(POKEMON_URL + name)

        for (let i = 0; i < linksArray.length; i++) {
            axios.get(linksArray[i])
                .then((response) => {
                    let pMon = response.data
                    callingObjects(pMon)

                }).catch((error) => {
                    console.log(error)
                })
        }
    }
}

class TrainerOmar {
    constructor() {
        this.pokemonList = []
    }

    add(pokemon) {
        this.pokemonList.push(pokemon)
    }

    all() {
        return this.pokemonList
    }

    get(pokemon) {
        for (let pName in this.pokemonList) {
            if (this.pokemonList[pName] == pokemon)
            return this.pokemonList[pName]
        }
    }
}

let pokemonPikachu = new Pokemon("pikachu")
let pokemonPignite = new Pokemon("pignite")
let pokemonPikipek = new Pokemon("pikipek")

let omar = new TrainerOmar()
omar.add(pokemonPikachu)
omar.add(pokemonPignite)
omar.add(pokemonPikipek)


function getImageUrl(pokemon) {
    if (pokemon.id < 100) {
        pokemon.id = "0" + pokemon.id
    }
    let img = document.createElement("img")
    img.src = POKEMON_IMAGE_URL + pokemon.id + ".png"
    return img
}

function displayStatsOfPokemon(id) {
    let displays = document.getElementById(id)
    if (displays.style.display == "block"){
        displays.style.display = "none"
    }
    else{
        displays.style.display = "block"
    }
 }

function maintainBackgroundForEachPokemon(pmon, nameAndImgList, statList){
    if (pmon.id < 100){
        uls[0].appendChild(nameAndImgList)
        divs[3].appendChild(statList)
    }
    else if (pmon.id > 100 && pmon.id < 500){
        uls[1].appendChild(nameAndImgList)
        divs[4].appendChild(statList)
    }
    else
    {
        uls[2].appendChild(nameAndImgList)
        divs[5].appendChild(statList)
    } 
 }

function getAbilities(pokemon){
     let abilitiesArray = []
     pokemon.abilities.forEach(
         ability => {
            abilitiesArray.push(ability.ability.name)
         }
     )
     return abilitiesArray
 }

 function callingObjects(pmon) {
// Creating list of li tag and appending information on them
    let nameAndImgList = document.createElement("li")
    let statList = document.createElement("li")

// Appending name to the nameAndImgList li
    let name = document.createElement("h2")
    name.innerHTML =  pmon.name
    nameAndImgList.appendChild(name)

// Calling image function to get the image url and appending it to li
    let image = getImageUrl(pmon)
    nameAndImgList.appendChild(image)

// HP, Attack, Defense and Abilites information being retrieved and append to statList li
    let hp = document.createElement("p")
    hp.innerHTML =  " Hit point: " + pmon.stats[5].base_stat
    statList.appendChild(hp)

    let attack = document.createElement("p")
    attack.innerHTML = " Attack power: " + pmon.stats[4].base_stat
    statList.appendChild(attack)

    let defense = document.createElement("p")
    defense.innerHTML = " Defense power: " + pmon.stats[3].base_stat
    statList.appendChild(defense)

    let pokemonAbilities = getAbilities(pmon)
    let abilities = document.createElement("p")
    abilities.innerHTML = " Abilities are: " +  pokemonAbilities[0] + ", " + pokemonAbilities[1]   
//[pmon.abilities[0].ability.name + ",  " + pmon.abilities[1].ability.name]
    statList.appendChild(abilities)

// Creating  buttons to display all the information
    let statsButton = document.createElement("button")
    statsButton.className = " waves-effect waves-light btn choose-btn center-align  "
    statsButton.innerHTML = " Stats "

    statsButton.addEventListener("click", function(){
        displayStatsOfPokemon("pikachu-information")
    }) 

    statsButton.addEventListener("click", function(){
        displayStatsOfPokemon("pignite-information")
    }) 

    statsButton.addEventListener("click", function(){
        displayStatsOfPokemon("pikipek-information")
    }) 

    let statsButtonSpan = document.createElement("span")
    statsButtonSpan.appendChild(statsButton)
    nameAndImgList.appendChild(statsButtonSpan)

// Maintaing a background with specific Pookemon regardles of who's information return first from the API    
    maintainBackgroundForEachPokemon(pmon, nameAndImgList, statList)
    }