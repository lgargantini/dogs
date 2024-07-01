//generate reusable component to display list of dogs
import React from 'react';
import { IBreed, IBreeds } from './lib/data';
export type ListProps = {
    list: IBreeds,
    handleClick: (arg: IBreed) => void
    selectedItem: number
    refContainer: React.RefObject<HTMLLIElement>
}
const ListItems = (props: ListProps) => {
    const { list, handleClick, selectedItem, refContainer } = props;
    const listItems = list.map((item, index) => (
        <li
            key={index}
            className={`breed-item${selectedItem === index ? ' selected' : ''}`}
            onClick={() => handleClick(item)}
            ref={index === selectedItem ? refContainer : null}
        >
            {item.label}
        </li>
    ))

    if (!listItems.length) {
        return (<ul className="breed-items-container">
            <li className='breed-item'>
                No breeds found
            </li>
        </ul>)
    }

    return (
        <ul className='breed-items-container'>
            {listItems}
        </ul>
    );
}

export default ListItems;