import React, { useState, useEffect, useCallback, memo } from "react";
import { getBreed } from "./lib/data";
import { IBreedComponent, IBreedsResponse } from "./lib/types";

export const Breed = memo(function Br({ selectedBreed }: IBreedComponent): JSX.Element {
    const [doggos, setDoggos] = useState<IBreedsResponse["message"]>([]);

    const fetchBreed = useCallback(async () => {
        const { resource: { breed, subBreed } } = selectedBreed;
        await getBreed(breed, subBreed)
            .then((response) => response.json())
            .then((json: IBreedsResponse) => {
                //identify json.message as an array of doggo images
                if (json.status !== 'success') {
                    console.error('Error loading selected doggo', json);
                    throw new Error('Error loading selected doggo');
                }
                // make sure response is an array of doggo images, then set the state
                setDoggos(json.message)
            })
            .catch(() => setDoggos([]));
    }, [selectedBreed]);

    useEffect(() => {
        if (selectedBreed) {
            fetchBreed()
                .catch((error) => {
                    console.error(error);
                    setDoggos([]);
                });
        }
    }, [selectedBreed, fetchBreed]);

    if (!selectedBreed) {
        return <></>;
    }

    return (
        <>
            <h2>{selectedBreed.label}</h2>
            <div className="img-container" data-testid="breed">
                {doggos.length > 0 && doggos.map((src: string) => (
                    <img key={src} src={src} alt="doggo" />
                ))}
            </div>
        </>
    );
});
