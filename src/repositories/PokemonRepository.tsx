// Modules
import axios from 'axios';
// Models
import Pokemon from '../models/Pokemon';
// Utils
import { pascalCase, upperCaseFirstLetter } from '../common/Utils/StringUtils';

interface IPokemonRepository {
    getPokemon(pokemonName: string): Promise<Pokemon>;
    getPokemons({ limit, pageParam }: { limit?: number, pageParam?: number }): Promise<{ pokemons: Pokemon[], nextPage?: number }>;
}
class PokemonRepository implements IPokemonRepository {
    readonly POKEMON_FIRST_GENERATION = 153;

    async getPokemon(pokemonName: string): Promise<Pokemon> {
        const { data: pokemonData, status: pokemonStatus } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        checkHttpStatus(pokemonStatus);
        const { data: { evolution_chain: { url: evolution_url } }, status: speciesStatus } = await axios.get(pokemonData.species.url);
        checkHttpStatus(speciesStatus);
        const { data: evolutionData, status: evolutionStatus } = await axios.get(evolution_url);
        checkHttpStatus(evolutionStatus);

        return new Pokemon({
            about: {
                abilities: pokemonData.abilities.reduce((acc: string, ability: any) => `${acc === '' ? '' : `${acc}, `}${pascalCase(ability.ability.name)}`, ''),
                base_experience: pokemonData.base_experience,
                height: pokemonData.height,
                weight: pokemonData.weight,
            },
            evolutions: await populateEvolutions(evolutionData),
            id: pokemonData.id,
            image: pokemonData.sprites.other['official-artwork'].front_default,
            name: pascalCase(pokemonData.name),
            stats: pokemonData.stats.map((stat: any) => ({ name: pascalCase(stat.stat.name), value: stat.base_stat })),
            types: pokemonData.types.map((type: { type: { name: string; }; }) => upperCaseFirstLetter(type.type.name)),
        });
    }

    async getPokemons({ limit = 10, pageParam = 0 }): Promise<{ pokemons: Pokemon[], nextPage?: number }> {
        const POKEMON_FIRST_GENERATION = 153;
        const pokemons: Pokemon[] = [];
        const offset = pageParam * limit;
        const limitFirstGeneration = (offset + limit) > POKEMON_FIRST_GENERATION ? POKEMON_FIRST_GENERATION : (offset + limit);
        for (let i = (offset + 1); i <= limitFirstGeneration; i++) {
            const { data, status } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            checkHttpStatus(status);
            pokemons.push(new Pokemon({
                name: pascalCase(data.name),
                id: data.id,
                image: data.sprites.other['official-artwork'].front_default,
                types: data.types.map((type: { type: { name: string; }; }) => upperCaseFirstLetter(type.type.name)),
            }));
        }

        const maxPages = Math.ceil(POKEMON_FIRST_GENERATION / limit);

        return { pokemons, nextPage: pageParam <= maxPages ? pageParam + 1 : undefined };
    }
}

const populateEvolutions = async (evolutionData: any): Promise<Array<{ image: string, name: string }>> => {
    const { chain: { evolves_to, species } } = evolutionData;

    const { data: { sprites: { other } } } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${species.name}`);

    const pokemons = [{ image: other['official-artwork'].front_default, name: pascalCase(species.name) }];
    if (evolves_to.length === 0) {
        return pokemons;
    } else if(evolves_to.length > 1) {
        for(let i = 0; i < evolves_to.length; i++) {
            const evData = evolves_to[i];
            const { data: { sprites: { other } }, status } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evData.species.name}`);
            checkHttpStatus(status);
            pokemons.push({ image: other['official-artwork'].front_default, name: pascalCase(evData.species.name) });
        }
        return pokemons;
    }

    const evolutions = await populateEvolutions({ chain: evolves_to[0] });
    return [...pokemons, ...evolutions];
}

const checkHttpStatus = (status: number): void => {
    if (status !== 200) {
        throw new Error();
    }
}

export default PokemonRepository;