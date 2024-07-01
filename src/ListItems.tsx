//generate reusable component to display list
import React from 'react';
import { IBreed, IBreeds } from './lib/data';
export type ListProps = {
    list: IBreeds,
    handleClick: (arg: IBreed) => void
    selectedItem: number
    refContainer: React.RefObject<HTMLLIElement>
}
const ListItems = (props: ListProps): JSX.Element => {
    const { list, handleClick, selectedItem, refContainer } = props;
    const listItems = list.length ? list.map((item, index) => (
        <li
            key={index}
            className={`breed-item${selectedItem === index ? ' selected' : ''}`}
            onClick={() => handleClick(item)}
            ref={index === selectedItem ? refContainer : null}
        >
            {item.label}
        </li>
    )) : (<li className='breed-item'>
        No items found
    </li>);

    return (
        <ul className='breed-items-container'>
            {listItems}
        </ul>
    );
}

export default ListItems;