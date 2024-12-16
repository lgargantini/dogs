import { BreedsEntity, IBreed, ISubBreed } from "./types";

export const URI_DOG_CEO = "https://dog.ceo/";
export const DEFAULT_LIMIT = 9;

export const listBreedsFromAPI = async (): Promise<Response> => {
    return fetch(new URL("/api/breeds/list/all", URI_DOG_CEO))
}



export const generateURLPath = ({ breed, subBreed = null, limit }): string => {
    let generateURL = new URL("/api/breed/", URI_DOG_CEO);
    generateURL.pathname += `${breed}${subBreed ? `/ ${subBreed}` : ''}/images/random/${limit}`;
    return generateURL.toString();
}

export const buildPath = (resource: BreedsEntity, limit: number): string  => {
    const { breed, subBreed } = resource;
    if (!subBreed) {
        return generateURLPath({ breed, limit });
    }
    return generateURLPath({ breed, subBreed, limit });
}

export const listImagesFromAPI = (breed: string, subBreed?: string): Promise<Response> => {
    const resource: BreedsEntity = { breed, subBreed };
    return fetch(buildPath(resource, DEFAULT_LIMIT));
}

export const generateInstanceId = (breed: string, subBreed?: string): string => {
    return subBreed ? `${breed}-${subBreed}` : breed;
}

export const getSubBreedInstance = (breed: string, subBreed?: string): ISubBreed => {
    const label = subBreed ? `${breed} ${subBreed}` : breed;
    const id = generateInstanceId(breed, subBreed);
    return {
        id: id,
        label,
        resource: {
            breed,
            subBreed
        }
    };
};
export const getBreedInstance = (breed: string): IBreed => {
    const id = generateInstanceId(breed);
    return {
        id: id,
        label: breed,
        resource: {
            breed
        }
    };
}