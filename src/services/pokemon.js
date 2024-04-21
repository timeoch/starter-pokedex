import axios from 'axios';

async function getPokemonByName(pokemonName) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération des détails du Pokémon ${pokemonName}:`, error);
        throw error;
    }
}

async function getPokemonList() {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de la liste des Pokémon:', error);
        throw error;
    }
}

async function searchPokemonByName(pokemonName) {
    try {
        const pokemonList = await getPokemonList();

        const pokemon = pokemonList.results.find(pokemon => pokemon.name === pokemonName.toLowerCase());

        if (!pokemon) {
            throw new Error(`Le Pokémon ${pokemonName} n'a pas été trouvé.`);
        }

        const pokemonDetailsResponse = await axios.get(pokemon.url);
        return pokemonDetailsResponse.data;
    } catch (error) {
        console.error(`Erreur lors de la recherche du Pokémon ${pokemonName}:`, error);
        throw error;
    }
}

export { searchPokemonByName, getPokemonByName };
