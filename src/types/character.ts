export interface Character{
    id: number;
    name: string;
    ki: string;
    race: string;
    gender: string;
    description: string;
    image: string;
    originPlanet:{
        id: number;
        name: string;
        description: string;
        image: string;
    }
    transformation:{
        id: number;
        name: string;
        image: string;
        ki: string;
    }
}