// Modules
import axios from 'axios';
// Models
import Pokemon from '../models/Pokemon';
// Utils
import { upperCaseFirstLetter } from '../common/Utils/StringUtils';

interface IPokemonRepository {
    getPokemons({ limit, pageParam } : {limit?: number, pageParam?: number}): Promise<{ pokemons: Pokemon[], nextPage?: number}>; 
}

class PokemonRepository implements IPokemonRepository {
    readonly POKEMON_FIRST_GENERATION = 152;

    async getPokemons({ limit = 10, pageParam = 0 }): Promise<{pokemons: Pokemon[], nextPage?: number}> {
        const POKEMON_FIRST_GENERATION = 152;
        const pokemons: Pokemon[] = [];
        const offset = pageParam * limit;
        const limitFirstGeneration = (offset + limit) > POKEMON_FIRST_GENERATION ? POKEMON_FIRST_GENERATION : (offset + limit);
        for (let i = (offset + 1); i <= limitFirstGeneration; i++) {
            const { data, status } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            if (status !== 200) {
                throw new Error('Ocorreu um erro no fetch da api');
            }
            pokemons.push(new Pokemon({
                name: upperCaseFirstLetter(data.name),
                types: data.types.map((type: { type: { name: string; }; }) => upperCaseFirstLetter(type.type.name)),
                image: data.sprites.other['official-artwork'].front_default
            }));
        }

        const maxPages = Math.ceil(POKEMON_FIRST_GENERATION / limit);

        return { pokemons, nextPage: pageParam <= maxPages ? pageParam + 1 : undefined};
    }
}

export default PokemonRepository;