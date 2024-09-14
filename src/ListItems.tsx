//generate presentational component to display list
import React from 'react';
import { IBreed, IBreeds } from './lib/data';
export type ListProps = {
    list: IBreeds,
    handleClick: (arg: IBreed) => void
    CurrentItem: number
    refContainer: React.RefObject<HTMLLIElement>
}
const ListItems = ({ list, handleClick, CurrentItem, refContainer }: ListProps): JSX.Element => {
    const listItems = list.length ? list.map((item, index) => (
        <li
            key={index}
            className={`breed-item${CurrentItem === index ? ' ' + 'selected' : ''}`}
            onClick={() => handleClick(item)}
            ref={index === CurrentItem ? refContainer : null}
        >
            {item.label}
        </li>
    )) : (
        <li className='breed-item'>
            No items found
        </li>
    );

    return (
        <ul className='breed-items-container' data-testid="breed-items-container">
            {listItems}
        </ul>
    );
}

export default ListItems;