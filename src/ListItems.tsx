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
            className={`${selectedItem === index ? 'selected' : ''}`}
            onClick={() => handleClick(item)}
            ref={index === selectedItem ? refContainer : null}
            style={{ backgroundColor: index === selectedItem ? "rgba(0,0,0,0.1)" : "" }}

        >
            {item.label}
        </li>
    ))

    if (list.length === 0) {
        return <p>No breeds available</p>
    }


    return (
        <ul className="relative outline-none">
            {listItems}
        </ul>
    );
}

export default ListItems;