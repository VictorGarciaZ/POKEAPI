//Declaro las variables a utilizar
let numberOfPokemons = 150;
let pokemons = [];

const pokedex$$ = document.querySelector("#pokedex")

// y hago la peticion a la API para obtener todos los pokemons y luego cada pokemon
async function getPokemons() {

    async function allPokemons() {
        return fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=' + numberOfPokemons)
            .then(res => res.json());
    }

    const fetchResult = await allPokemons();
    for (let i = 0; i < numberOfPokemons; i++) {

        async function onePokemon() {
            return fetch(fetchResult.results[i].url)
                .then(res => res.json());
        }
        const onePokemonResult = await onePokemon();
        pokemons.push(onePokemonResult);
        pokedex(onePokemonResult);
    }
}

//Creo las cartas con título, imagen y numero
function pokedex(pokemon) {
    const carta$$ = document.createElement("li");
    const nombre$$ = document.createElement("h2");
    const imagen$$ = document.createElement("img");
    const number$$ = document.createElement("p");

    carta$$.className = "card";
    nombre$$.className = "card-title";
    number$$.className = "card-number";
    imagen$$.className = "card-image";

    nombre$$.textContent = pokemon.name
    imagen$$.src = pokemon.sprites.other.dream_world.front_default
    number$$.textContent = " # " + pokemon.id.toString();

    pokedex$$.appendChild(carta$$)
    carta$$.appendChild(nombre$$)
    carta$$.appendChild(imagen$$)
    carta$$.appendChild(number$$)   
};

//Creo el buscador de pokemons
const search$$ = document.querySelector('.search-input');
const search = () => {
  
    const pokemonsFiltered = pokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(search$$.value.toLowerCase());
  });

  pokedex$$.innerHTML = ""
  for (const pokemon of pokemonsFiltered) {
    pokedex(pokemon);
  }
};
search$$.addEventListener("input", search);


/*Creo funcion de filtrado por tipos
const filtrar = (type) => {
    const pokemonsTypes = pokemones.filter((pokemon) => {
      let encontrado = false;
      for (const tipo of pokemon.types) {
        if (tipo.type.name === type) {
          encontrado = true;
        }
      }
      if (encontrado) {
        return pokemon;
      }
      // return pokemon.types[0].type.name === type;
    });
    
filter$$.addEventListener("click", filtrar);


/*Creo la carta de atrás para girarla y mostrar elemento
const cardFlip$$ = document.createElement("li");
const nameFlip$$ = document.createElement("h2");
const imageFlip$$ = document.createElement("img");
const numberFlip$$ = document.createElement("p");

cardFlip$$.className = "cardFlip";
nameFlip$$.className = "nameFlipcard";
numberFlip$$.className = "numberFlip";
imageFlip$$.className = "imageFlip";

nameFlip$$.textContent = pokemon.name
imageFlip$$.src = pokemon.sprites.other.home.front_default
numberFlip$$.textContent = " # " + pokemon.id.toString().padStart(3, 0);

const pokedex2 = document.querySelector("#pokedex")
pokedex2.appendChild(cardFlip$$)
cardFlip$$.appendChild(numberFlip$$)
cardFlip$$.appendChild(nameFlip$$)
cardFlip$$.appendChild(imageFlip$$)



*/
//para que ejecute primero la función.
getPokemons();

