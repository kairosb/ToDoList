import { MagnifyingGlass } from 'phosphor-react'
import './header.css'

export const Header = () => {

    const filters = [
        {label: 'ALL', value: 'ALL'},
        {label: 'COMPLETED', value: 'COMPLETED'},
        {label: 'INCOMPLETE', value: 'INCOMPLETE'}
    ]

    return (
        <header className='navbar'>
            <h2>TODO LIST</h2>
            <div className='navbar__filters'>
                <div className='navbar__search'>
                    <input placeholder='Search note...'/>
                    <MagnifyingGlass size={24} color='#C3C1E5'/>
                </div>
                <select className='navbar__select'>
                    {filters.map((filter) => {
                        return <option value={filter.value}>{filter.label}</option>
                    })}
                </select>
            </div>
        </header>
    )
}