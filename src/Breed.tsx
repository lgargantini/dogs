import React, { useState, useEffect, useCallback, memo } from "react";
import { listImagesFromAPI } from "./lib/data";
import { IBreedComponent, IBreedsResponse } from "./lib/types";

export const Breed = memo(function Br({ selectedBreed }: IBreedComponent): JSX.Element {
    const [doggos, setDoggos] = useState<IBreedsResponse["message"]>([]);

    const loadDoggos = useCallback(async () => {
        const { resource: { breed, subBreed } } = selectedBreed;
        await listImagesFromAPI(breed, subBreed)
            .then((response) => response.json())
            .then((json: IBreedsResponse) => {
                //identify json.message as an array of doggo images
                if (json.status !== 'success') {
                    console.error('Error loading doggos');
                    throw new Error('Error loading doggos');
                }
                // make sure response is an array of doggo images, then set the state
                setDoggos(json.message)
            })
            .catch(() => setDoggos([]));
    }, [selectedBreed]);

    useEffect(() => {
        if (selectedBreed) {
            loadDoggos()
                .catch((error) => {
                    console.error(error);
                    setDoggos([]);
                });
        }
    }, [selectedBreed, loadDoggos]);

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
