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
        switch(this.type) {
            case 'Grass':
                return 'bg-green-300';
            case 'Fire':
                return 'bg-red-400';
            default:
                return 'bg-gray-700';
        }
    }

    get tagClassByType(): string {
        switch(this.type) {
            case 'Grass':
                return 'bg-green-500 bg-opacity-40';
            case 'Fire':
                return 'bg-red-600 bg-opacity-40';
            default:
                return 'bg-gray-700';
        }
    }
}