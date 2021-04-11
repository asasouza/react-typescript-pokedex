interface IPokemon {
    about?: { abilities: string, base_experience: number, height: number, weight: number };
    evolutions?: Array<{ name: string, image: string }>;
    id: number,
    image: string;
    name: string;
    stats?: Array<{ name: string, value: number }>;
    type?: string;
    types: string[];
}

export default class Pokemon implements IPokemon {
    about?: { abilities: string, base_experience: number,  height: number, weight: number };
    evolutions?: Array<{ image: string, name: string }>;
    id: number;
    image: string;
    name: string;
    stats?: Array<{ name: string, value: number }>;
    type: string;
    types: string[];

    constructor({ about, evolutions, id, image, name, stats, types }: IPokemon) {
        this.about = about;
        this.evolutions = evolutions;
        this.id = id;
        this.image = image;
        this.name = name;
        this.stats = stats;
        this.type = types[0];
        this.types = types;
    }

    get backgroundClassByType(): string {
        switch (this.type) {
            case 'Bug':
                return 'bg-green-200 hover:bg-green-300';
            case 'Dragon':
                return 'bg-purple-400 hover:bg-purple-500';
            case 'Electric':
                return 'bg-yellow-200 hover:bg-yellow-300';
            case 'Fighting':
                return 'bg-red-600 hover:bg-red-700';
            case 'Fire':
                return 'bg-red-400 hover:bg-red-500';
            case 'Flying':
                return 'bg-indigo-300 hover:bg-indigo-400';
            case 'Ghost':
                return 'bg-purple-700 hover:bg-purple-800';
            case 'Grass':
                return 'bg-green-300 hover:bg-green-400';
            case 'Ground':
                return 'bg-yellow-500 hover:bg-yellow-600';
            case 'Ice':
                return 'bg-blue-100 hover:bg-blue-200';
            case 'Normal':
                return 'bg-gray-400 hover:bg-gray-500';
            case 'Poison':
                return 'bg-purple-500 hover:bg-purple-600';
            case 'Psychic':
                return 'bg-pink-400 hover:bg-pink-500';
            case 'Rock':
                return 'bg-yellow-700 hover:bg-yellow-800';
            case 'Water':
                return 'bg-blue-300 hover:bg-blue-400';
            default:
                return 'bg-gray-700 hover:bg-gray-800';
        }
    }

    get tagClassByType(): string {
        switch (this.type) {
            case 'Bug':
                return 'bg-green-500';
            case 'Dragon':
                return 'bg-purple-500';
            case 'Electric':
                return 'bg-yellow-500';
            case 'Fighting':
                return 'bg-red-700';
            case 'Fire':
                return 'bg-red-700 ';
            case 'Flying':
                return 'bg-indigo-400';
            case 'Ghost':
                return 'bg-purple-800';
            case 'Grass':
                return 'bg-green-500';
            case 'Ground':
                return 'bg-yellow-600';
            case 'Ice':
                return 'bg-blue-300';
            case 'Normal':
                return 'bg-gray-500';
            case 'Poison':
                return 'bg-purple-600';
            case 'Psychic':
                return 'bg-pink-500';
            case 'Rock':
                return 'bg-yellow-800';
            case 'Water':
                return 'bg-blue-400';
            default:
                return 'bg-gray-800';
        }
    }
}