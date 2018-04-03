const pokeApi = "https://pokeapi.co/api/v2/pokemon/";
const trainerOne = ["rockruff", "lillipup", "stufful"];
const trainerTwo = ["clefairy", "ninetales", "togepi"];
let trainers = [];
let trainerA;
let trainerB;

$(document).ready(function() { 

    // create Pokemon object
    class Pokemon {

        constructor(name, types, height, weight, imgUrl, stats, abilities) {
            this.name = name;
            this.types = types;
            this.height = height/10;
            this.weight = weight/10;
            this.imgUrl = imgUrl;
            this.stats = stats;
            this.abilities = abilities;
        }
    }

    // create trainer object with name given and initialize with empty pokeDirectory
    class Trainer {

        constructor(trainerName){
            this.trainerName = trainerName;
            this.pokeDirectory = {};
        }
        
        // returns an array of all Pokemon
        all() {
            return Object.values(this.pokeDirectory);
        }

        // returns requested Pokemon object
        get(pokemon) {
            return this.pokeDirectory[pokemon];
        }

        // add new Pokemon to pokeDirectory
        add(name) {
            let self = this;
            if(!this.pokeDirectory.hasOwnProperty(name)) {
                let newPokemon;
                let apiUrl = pokeApi + name + '/';
                
                // make ajax call to get Pokemon data
                let getData = (function(){
                    return $.ajax({
                        type: 'GET',
                        dataType: 'json',
                        url: apiUrl,
                        success: function(data) {
                            return data
                        },
                        error: function(e) {
                            console.log(e);
                        } 
                    });
                });

                // use ajax data to create new Pokemon
                getData().then(function (data){
                    let pokemonName = data.name;
                    let height = data.height;
                    let weight = data.weight;
                    let imgUrl = data.sprites.front_default;
                    let statsList = {};
                    let abilitiesList = []; 
                    let typesList = []; 

                    for (let i = 0; i < data.stats.length; i++) {
                        statsList[data.stats[i].stat.name] = data.stats[i].base_stat;
                    }
                    for (let j = 0; j < data.abilities.length; j++) {
                        abilitiesList.push(data.abilities[j].ability.name);
                    }

                    for (let k = 0; k < data.types.length; k++) {
                        typesList.push(data.types[k].type.name);
                    }
                    newPokemon = new Pokemon(pokemonName, typesList, height, weight, imgUrl, statsList, abilitiesList); 
                    self.pokeDirectory[pokemonName] = newPokemon;
                });
            }
        }
    }

    // render data for all pokemon in a given trainer's pokeDirectory
    function renderPokemon(trainer) {
        let pokes = Object.keys(trainer.pokeDirectory);

        for(let poke in pokes){
            let currentPoke = trainer.pokeDirectory[pokes[poke]];
            console.log(currentPoke.name);
            console.log(currentPoke.types);
            console.log(currentPoke.height + "m");
            console.log(currentPoke.weight + "kg");
            console.log(currentPoke.abilities);
            console.log(currentPoke.imgUrl);
            $.each(currentPoke.stats, function(key, value) {      
                console.log(key, value);
            });
        }
    }

    // create new pokedex initialized with trainers named Sasha and Celina
    // with preset Pokemon added to each trainer 
    (function start(){
        trainerA = new Trainer("Sasha");
        trainerB = new Trainer("Celina");

        for (let i = 0; i < 3; i++){
            trainerA.add(trainerOne[i]);
            trainerB.add(trainerTwo[i]);
        }
        trainers.push(trainerA);
        trainers.push(trainerB);
        return trainers;
    })();

    // click triggers Sasha's Pokemon to display
    $('#Sasha').click(function(){
        renderPokemon(trainerA);
    });
    
    // click triggers Celina's Pokemon to display
    $('#Celina').click(function(){
        renderPokemon(trainerB);
    });


});

