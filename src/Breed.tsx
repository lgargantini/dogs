import React, { useState, useEffect, useCallback, memo } from "react";
import { IBreed, listImagesFromAPI } from "./lib/data";

export interface IBreedComponent {
    selectedBreed?: IBreed;
}

interface IBreedResponse {
    message: string[];
    status: string;
}

export const Breed = memo(function Br({ selectedBreed }: IBreedComponent): JSX.Element {
    const [doggos, setDoggos] = useState([]);

    const loadDoggos = useCallback(async () => {
        const { resource: { breed, subBreed } } = selectedBreed;
        await listImagesFromAPI(breed, subBreed)
            .then((response) => response.json())
            .then((json: IBreedResponse) => {
                //identify json.message as an array of doggo images
                if (json.status !== 'success') {
                    throw new Error('Error loading doggos');
                }
                setDoggos(json.message)
            })
            .catch(() => setDoggos([]));
    }, [selectedBreed]);

    useEffect(() => {
        if (selectedBreed) {
            loadDoggos().then(() => {
                console.log('Doggos loaded');
            }).catch((error) => {
                console.error(error);
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
