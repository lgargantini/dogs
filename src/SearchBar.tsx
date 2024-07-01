import React, { useEffect, useRef, useState } from "react";
import { IBreed, IBreeds } from "./lib/data";
import ListBreeds from "./ListItems";

interface ISearchBar {
    list: IBreeds,
    selectedItem: IBreed | null,
    setSelectedItem: (arg: IBreed | null) => void,
    resetSelectedItem: () => void
}

const SearchBar = ({ list, selectedItem, setSelectedItem, resetSelectedItem }: ISearchBar) => {
    const [suggestion, setSuggestion] = useState<string | null>(null);
    const [suggestionIndex, setSuggestionIndex] = useState<number>(-1);
    const [filteredItems, setFilteredItems] = useState<IBreeds | null>(null);
    const items = filteredItems ? filteredItems : list;
    const refContainer = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (suggestion !== null && list.length > 0) {
            //set list to show filtered items
            setFilteredItems(list.filter((breed) => breed.label.startsWith(suggestion.toLowerCase())));
        } else {
            //reset selected breed on empty suggestion
            setFilteredItems(null);
        }
        setSelectedItem(null);
    }, [suggestion, list]);

    useEffect(() => {
        //when breed exists, reset suggestion index to -1
        if (selectedItem !== null) {
            setSuggestionIndex(-1);
        }
    }, [selectedItem])

    const getBreedByIndex = (list: IBreeds, index: number): IBreed | null => {
        return list && list.length > 0 && index !== undefined ? list[index] : null
    }

    const cleanSuggestionIndexAndInputFocus = () => {
        setSuggestionIndex(-1);
        inputContainer.current?.focus();
    }

    const handleOnKeyDownForList = (event: React.KeyboardEvent<HTMLDivElement>) => {
        //navigate results using arrow keys
        let index = suggestionIndex;
        if (event.code === 'ArrowDown' || event.code === 'ArrowRight') {
            //check if next suggestion index is not out of bounds
            if (suggestionIndex !== undefined && suggestionIndex < items.length - 1) {
                index = suggestionIndex + 1;
                setSuggestionIndex(index);
            }
        } else if (event.code === 'ArrowUp' || event.code === 'ArrowLeft') {
            //check if previous suggestion index is not out of bounds
            if (suggestionIndex !== undefined && suggestionIndex > 0) {
                index = suggestionIndex - 1;
                setSuggestionIndex(index);
            }
            // if is the first item on results, reset suggestion, focus on input
            if (suggestionIndex === 0) {
                cleanSuggestionIndexAndInputFocus();
            }
            //reset suggestion on Delete, Backspace or Escape key
        } else if (event.code === 'Escape' || event.code === 'Backspace' || event.code === 'Delete') {
            cleanSuggestionIndexAndInputFocus();
            //select the breed on Enter key
        } else if (event.code === 'Enter') {
            setSelectedItem(getBreedByIndex(filteredItems ? filteredItems : list, suggestionIndex !== -1 ? suggestionIndex : 0));
        }
    }

    const ResultsContainer = useRef<HTMLDivElement>(null);
    const inputContainer = useRef<HTMLInputElement>(null);
    const shouldShowListResults = selectedItem === null;
    const resetInput = () => {
        setSuggestion(null);
        setSuggestionIndex(-1);
        resetSelectedItem();
    }

    return (
        <>
            <div className="search-bar-input-container">
                <input
                    type="text"
                    onChange={(event) => {
                        setSuggestion(event.currentTarget.value)
                    }}
                    onKeyDown={(event) => {
                        //behaviors when input is focused

                        //select current breed on Enter key
                        if (event.code === 'Enter') {
                            setSelectedItem(getBreedByIndex(filteredItems ? filteredItems : list, suggestionIndex !== -1 ? suggestionIndex : 0));
                            setSuggestionIndex(-1);
                        }
                        //reset suggestion on Delete or Escape key
                        if (event.code === 'Delete' || event.code === 'Escape') {
                            setSuggestion(null);
                            setSuggestionIndex(-1);
                        }
                        //navigate results using arrow keys
                        if (event.code === 'ArrowDown') {
                            setSuggestionIndex(0);
                            ResultsContainer.current?.focus({ preventScroll: true });
                        }
                    }}
                    placeholder="insert breed"
                    value={suggestion ? suggestion : ""}
                    ref={inputContainer}
                    className="search-bar"
                />
                <button onClick={resetInput}>Reset</button>
            </div>
            {shouldShowListResults &&
                <div tabIndex={1}
                    ref={ResultsContainer}
                    onKeyDown={handleOnKeyDownForList}
                    className="search-results-container"
                >
                    <ListBreeds
                        list={filteredItems ? filteredItems : list}
                        handleClick={setSelectedItem}
                        selectedItem={suggestionIndex}
                        refContainer={refContainer}
                    />
                </div>
            }
        </>
    )

}
export default SearchBar;
