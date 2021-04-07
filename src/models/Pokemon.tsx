interface IPokemon {
    image: string;
    name: string;
    type?: string;
    types: string[];
}

export default class Pokemon implements IPokemon {
    image: string;
    name: string;
    type: string;
    types: string[];

    constructor({ image, name, types }: IPokemon) {
        this.image = image;
        this.name = name;
        this.type = types[0];
        this.types = types;
    }

    get backgroundClassByType(): string {
        switch (this.type) {
            case 'Bug':
                return 'bg-green-200';
            case 'Dragon':
                return 'bg-purple-400';
            case 'Electric':
                return 'bg-yellow-200';
            case 'Fighting':
                return 'bg-red-600';
            case 'Fire':
                return 'bg-red-400';
            case 'Flying':
                return 'bg-indigo-300';
            case 'Ghost':
                return 'bg-purple-700';
            case 'Grass':
                return 'bg-green-300';
            case 'Ground':
                return 'bg-yellow-500';
            case 'Ice':
                return 'bg-blue-100';
            case 'Normal':
                return 'bg-gray-400';
            case 'Poison':
                return 'bg-purple-500';
            case 'Psychic':
                return 'bg-pink-400';
            case 'Rock':
                return 'bg-yellow-700';
            case 'Water':
                return 'bg-blue-300';
            default:
                return 'bg-gray-700';
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