// Modules
import axios from 'axios';
// Models
import Pokemon from '../models/Pokemon';
// Utils
import { upperCaseFirstLetter } from '../common/Utils/StringUtils';

interface IPokemonRepository {
    getPokemons(offset?: number, limit?: number): Promise<Pokemon[]>; 
}

class PokemonRepository implements IPokemonRepository {
    
    async getPokemons(): Promise<Pokemon[]> {
        const pokemons: Pokemon[] = [];
        for (let i = 1; i < 10; i++) {
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
        return pokemons;
    }
}

export default PokemonRepository;