export const listBreedsFromAPI = (): Promise<Response> => {
    return fetch("https://dog.ceo/api/breeds/list/all")
}

export interface BreedsEntityFromAPI {
    [key: string]: string[];
}

export interface BreedsEntity {
    breed: string;
    subBreed?: string;
}

export interface IBreed {
    id: string;
    label: string;
    resource: BreedsEntity;
}

export interface ISubBreed {
    id: string;
    label: string;
    resource: BreedsEntity;
}

export interface IBreeds extends Array<IBreed> { }