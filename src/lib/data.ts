export const URI_DOG_CEO = "https://dog.ceo/";
export const DEFAULT_LIMIT = 9;

export const listBreedsFromAPI = async (): Promise<Response> => {
    return fetch(new URL("/api/breeds/list/all", URI_DOG_CEO))
}

export interface IBreed {
    id: string;
    label: string;
    resource: BreedsEntity;
}


export const buildPath = (resource: BreedsEntity, limit: number): string  => {
        const { breed, subBreed } = resource;
        if (!subBreed) {
            return `${breed}/images/random/${limit}`;
        }
        const breedPath = `${breed}/${subBreed}`;
        return `${breedPath}/images/random/${limit}`;
}

export const listImagesFromAPI = (breed: string, subBreed?: string): Promise<Response> => {
    const resource: BreedsEntity = { breed, subBreed };
    return fetch(new URL(`/api/breed/${buildPath(resource, DEFAULT_LIMIT)}`, URI_DOG_CEO));
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

export interface IBreeds extends Array<IBreed> { }