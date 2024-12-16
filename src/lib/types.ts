export interface IBreed {
    id: string;
    label: string;
    resource: BreedsEntity;
}

export interface BreedsEntityFromAPI {
    [key: string]: string[];
}

export interface BreedsEntity {
    breed: string;
    subBreed?: string;
}

export interface ISubBreed {
    id: string;
    label: string;
    resource: BreedsEntity;
}

export interface IBreeds extends Array<IBreed | ISubBreed> {
}

export interface IBreedResponse {
    message: {
        [key: string]: string[];
    };
}

export interface IBreedsResponse {
    message: string[];
    status: string;
}

export interface IBreedComponent {
    selectedBreed?: IBreed;
}