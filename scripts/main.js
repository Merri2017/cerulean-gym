const pokeApi = "https://pokeapi.co/api/v2/pokemon/";
//const pokeApi = "https://pokeapi.salestock.net/api/v2/pokemon/";
const trainerOne = ["rockruff", "lillipup", "stufful"];
const trainerTwo = ["clefairy", "ninetales", "togepi"];

$(document).ready(function() { 

    // create new Pokemon object
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
            $("#trainerName").text(trainerName);
        }
        
        // returns an array of all Pokemon
        all() {
            return Object.values(this.pokeDirectory);
        }

        // returns requested Pokemon object
        get(pokemon) {
            return this.pokeDirectory[pokemon];
        }

        // add new Pokemon to pokeDirectory and display them on screen
        add(name) {
            let self = this;
            if(!this.pokeDirectory.hasOwnProperty(name)) {
                $(".preloader-wrapper").addClass("active");
                let newPokemon;
                let apiUrl = pokeApi + name + '/';
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

                // gets ajax data, then uses it to create new Pokemon
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



    // creates new pokedex initialized with trainer name Sasha and adds preset Pokemon 
    function main(){
        let trainerA = new Trainer("Sasha");
        let trainerB = new Trainer("Meribel");

        for (let i = 0; i < pokemonNames.length; i++){
            trainerA.add(trainerOne[i]);
            trainerB.add(trainerTwo[i]);
        }
    }
});

