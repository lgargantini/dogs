import React, { useState, useEffect, Suspense, useCallback } from "react";
import { Breed } from "./Breed";
import { IBreed, IBreeds, ISubBreed, listBreedsFromAPI } from "./lib/data";
import SearchBar from "./SearchBar";

export const Breeds = () => {
    const [breeds, setBreeds] = useState<IBreeds>([]);
    const [breed, setBreed] = useState<IBreed | null>(null);

    const getSubBreed = (breed: string, subBreed: string): ISubBreed => {
        const label = subBreed ? `${breed} ${subBreed}` : breed;
        const id = `${breed}-${subBreed}`;
        return {
            id: id,
            label,
            resource: {
                breed,
                subBreed
            }
        };
    };

    const getBreed = (breed: string): IBreed => {
        const id = breed;
        return {
            id: id,
            label: breed,
            resource: {
                breed
            }
        };
    }

    useEffect(() => {
        listBreedsFromAPI().
            then((result) => result.json()).
            then(({ message }) => {
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
                setBreeds([]);
            });
    }, []);

    const resetBreed = () => {
        setBreed(null);
    }

    const shouldShowBreed = breed !== null;

    return (
        <div data-testid="breeds">
            <SearchBar list={breeds} selectedItem={breed} setSelectedItem={setBreed} resetSelectedItem={resetBreed} />
            <Suspense fallback={<div>Loading...</div>}>
                {shouldShowBreed &&
                    <Breed selectedBreed={breed} />
                }
            </Suspense>
        </div>
    );
};