import React, { useState, useEffect } from "react";
import { Breed } from "./Breed";
import { getBreed, getSubBreed, IBreed, IBreeds, listBreedsFromAPI } from "./lib/data";
import SearchBar from "./SearchBar";

interface IBreedResponse {
    message: {
        [key: string]: string[];
    };
}

export const Breeds = () => {
    const [breeds, setBreeds] = useState<IBreeds>([]);
    const [breed, setBreed] = useState<IBreed | null>(null);
    const [error, setError] = useState<string | null>(null);



    useEffect(() => {
        const loadBreeds = (async () => {
            await listBreedsFromAPI().
                then((result) => {
                    return result.json()
                }).
                then(({ message }: IBreedResponse) => {
                    const breeds: IBreeds = [];
                    Object.entries(message).map(
                        ([breed, subBreeds]) => {
                            //iterate over subBreed to get all available breeds on the API
                            if (Array.isArray(subBreeds) && subBreeds.length > 0) {
                                // iterate over subBreeds to get all available subBreeds
                                subBreeds.map((subBreed) => (
                                    breeds.push(getSubBreed(breed, subBreed))
                                ));
                            } else if (breed !== null) {
                                breeds.push(getBreed(breed));
                            }
                        },
                    );
                    if (breeds.length > 0) {
                        setBreeds(breeds);
                    } else {
                        throw new Error("No breeds available");
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setError('Error loading breeds');
                    setBreeds([]);
                });
        });

        loadBreeds()
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const resetBreed = () => setBreed(null);

    return (
        <div data-testid="breeds">
            <SearchBar
                list={breeds}
                selectedItem={breed}
                setSelectedItem={setBreed}
                resetSelectedItem={resetBreed}
            />
            {error && <p>{error}</p>}
            <Breed selectedBreed={breed} />
        </div>
    );
};