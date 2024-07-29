import { MagnifyingGlass } from 'phosphor-react'
import './header.css'
import { useDispatch } from 'react-redux'
import { filterTasks, searchTasks } from '../../redux/todoSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Header = () => {

    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');
    const filter = useSelector(state => state.todos.filter);
    const search = useSelector(state => state.todos.search);

    useEffect(() => {
        setSearchTerm(search);
    }, [search]);


    const filters = [
        {label: 'ALL', value: 'ALL'},
        {label: 'COMPLETED', value: 'COMPLETED'},
        {label: 'INCOMPLETE', value: 'INCOMPLETE'}
    ]

    const handleFilterChange = (event) => {
        dispatch(filterTasks(event.target.value));
    }

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if(value === ''){
            dispatch(searchTasks(value));
        }
    }

    const handleSearchClick = () => {
        dispatch(searchTasks(searchTerm));
    }

    return (
        <header className='navbar'>
            <h2>TODO LIST</h2>
            <div className='navbar__filters'>
                <div className='navbar__search'>
                    <input 
                        placeholder='Search note...'
                        value={searchTerm}
                        onChange={handleSearchChange}    
                    />
                    <MagnifyingGlass 
                        size={24} 
                        className='navbar__search__icon'
                        onClick={handleSearchClick}
                    />
                </div>
                <select className='navbar__select' value={filter} onChange={handleFilterChange}>
                    {filters.map((filter, index) => {
                        return <option key={index} className='navbar__select__option' value={filter.value}>{filter.label}</option>
                    })}
                </select>
            </div>
        </header>
    )
}