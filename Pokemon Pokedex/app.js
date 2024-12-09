// Function to fetch and display Pokémon data
function getPokemonData(pokemonName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json())
      .then(data => {
        // Displaying Name
        document.getElementById('pokemon-name').innerText = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  
        // Displaying Image
        document.getElementById('pokemon-image').src = data.sprites.front_default;
  
        // Displaying Type(s)
        const types = data.types.map(typeInfo => typeInfo.type.name).join(", ");
        document.getElementById('pokemon-type').innerText = types;
  
        // Displaying Abilities
        const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(", ");
        document.getElementById('pokemon-abilities').innerText = abilities;
  
        // Gender (some Pokémon don't have gender, so we check if the data is available)
        const gender = data.gender_rate !== -1 ? (data.gender_rate > 0 ? "Male and Female" : "Genderless") : "Not Available";
        document.getElementById('pokemon-gender').innerText = gender;
  
        // Variations (Shiny, etc. - Can be pulled from sprite info or other data points)
        document.getElementById('pokemon-variations').innerText = "Shiny Variant Available";
  
        // Evolutions (Fetch from the species endpoint)
        fetch(data.species.url)
          .then(speciesResponse => speciesResponse.json())
          .then(speciesData => {
            const evolutionChainUrl = speciesData.evolution_chain.url;
            fetch(evolutionChainUrl)
              .then(evolutionResponse => evolutionResponse.json())
              .then(evolutionData => {
                let evolutions = [];
                let currentEvolution = evolutionData.chain;
                while (currentEvolution) {
                  evolutions.push(currentEvolution.species.name);
                  currentEvolution = currentEvolution.evolves_to[0]; // Get the next evolution
                }
                document.getElementById('pokemon-evolutions').innerText = evolutions.join(" → ");
              });
          });
  
        // Displaying All Moves
        const moves = data.moves.map(moveInfo => moveInfo.move.name).join(", ");
        document.getElementById('pokemon-moves').innerText = moves;
      })
      .catch(error => console.error('Error fetching Pokémon data:', error));
  }
  
  // Example: Get data for Bulbasaur
  getPokemonData('bulbasaur');
  