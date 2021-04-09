// Modules
import { Link } from 'react-router-dom';
// Models
import Pokemon from '../../../models/Pokemon';
// Resources
import PokeballSvg from '../../../common/Resources/pokeball.svg';

interface IPokemonCard {
    pokemon: Pokemon;
}

const PokemonCard = (props: IPokemonCard) => {
    const { pokemon } = props;

    const renderTypes = (types: string[]) => {
        return types.map(type => {
            return (
                <span 
                    className={`${pokemon.tagClassByType} bg-opacity-40 mb-2 mr-2 px-2 py-1 rounded-3xl shadow text-sm`}
                    key={type}
                >
                    {type}
                </span>
            )
        })
    }

    return (
        <Link 
            className={`${pokemon.backgroundClassByType} block h-32 overflow-hidden p-3 relative rounded-3xl shadow-md text-white`} 
            key={pokemon.name}
            to={{
                pathname: `/${pokemon.name}`,
                state: {
                    pokemon: pokemon
                }
            }}
        >
            <p className='font-semibold mb-3 relative text-xl whitespace-nowrap z-20'>{pokemon.name}</p>
            <div className='flex flex-row justify-between'>
                <div className='flex items-start flex-col'>
                    { renderTypes(pokemon.types) }
                </div>
                <img alt={pokemon.name} className='hover:scale-105 transform transition-all -mt-5 w-24 z-10' src={pokemon.image} />
            </div>
            <img alt='' className='absolute -bottom-10 opacity-50 -right-10 w-44 z-0' src={PokeballSvg} />
        </Link>
    )
}

export default PokemonCard;