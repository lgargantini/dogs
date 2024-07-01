import React, { useState, useEffect } from "react";
import { IBreed, listImagesFromAPI } from "./lib/data";

export interface IBreedComponent {
    selectedBreed: IBreed;
}

export const Breed = ({ selectedBreed }: IBreedComponent): JSX.Element => {
    const [doggos, setDoggos] = useState([]);

    async function loadDoggos() {
        const { resource: { breed, subBreed } } = selectedBreed;
        listImagesFromAPI(breed, subBreed)
            .then((response) => response.json())
            .then((json) => setDoggos(json.message))
            .catch(() => setDoggos([]));
    }

    useEffect(() => {
        if (selectedBreed) {
            loadDoggos();
        }
    }, [selectedBreed]);

    return (
        <>
            <h2>{selectedBreed.label}</h2>
            <div className="img-container" data-testid="breed">
                {doggos.length > 0 && doggos.map((src, i) => (
                    <img key={i} src={src} alt="doggo" />
                ))}
            </div>
        </>
    );
};
