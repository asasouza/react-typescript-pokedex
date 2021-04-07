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
                    className={`${pokemon.tagClassByType} mb-2 mr-2 px-2 py-1 rounded-3xl shadow text-sm`}
                    key={type}
                >
                    {type}
                </span>
            )
        })
    }

    return (
        <div className={`${pokemon.backgroundClassByType} overflow-hidden p-3 relative  rounded-3xl shadow-md text-white`} key={pokemon.name}>
            <p className='font-semibold mb-3 text-xl'>{pokemon.name}</p>
            <div className='flex flex-row justify-between'>
                <div className='flex items-start flex-col'>
                    { renderTypes(pokemon.types) }
                </div>
                <img alt={pokemon.name} className='-mt-5 w-24 z-10' src={pokemon.image} />
            </div>
            <img alt='' className='absolute -bottom-10 opacity-50 -right-10 w-44 z-0' src={PokeballSvg} />
        </div>
    )
}

export default PokemonCard;