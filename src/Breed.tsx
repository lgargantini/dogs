import React, { useState, useEffect } from "react";
import { IBreed } from "./lib/data";

function buildPath({ breed, subBreed }: IBreed["resource"]) {
    if (!subBreed) {
        return `${breed}/images/random/9`;
    }
    const resource = `${breed}/${subBreed}`;
    return `${resource}/images/random/9`;
}

export interface IBreedComponent {
    breed: IBreed;
}

export const Breed = ({ breed }: IBreedComponent): JSX.Element => {
    const [doggos, setDoggos] = useState([]);

    async function loadDoggos() {
        const { resource } = breed;
        const endpoint = `https://dog.ceo/api/breed/${buildPath(resource)}`;

        fetch(endpoint)
            .then((response) => response.json())
            .then((json) => setDoggos(json.message))
            .catch(() => setDoggos([]));
    }

    useEffect(() => {
        if (breed) {
            loadDoggos();
        }
    }, [breed]);

    return (
        <div>
            <h3>DOGGO</h3>
            <div className={"img-container"}>
                {doggos.map((src, i) => (
                    <img key={i} src={src} alt="doggo" height={150} width={200} />
                ))}
            </div>
        </div>
    );
};
