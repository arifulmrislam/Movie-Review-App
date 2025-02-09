import type React from 'react';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchTerm,
    onSearchChange,
}) => {
    return (
        <div className='mb-6'>
            <input
                type='text'
                placeholder='Search movies...'
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
        </div>
    );
};

export default SearchBar;
