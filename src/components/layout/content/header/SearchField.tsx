import { useRouter } from 'next/navigation';
import { type KeyboardEvent, useState } from 'react';

import { PAGE } from '@/config/public-page.config';

export function SearchField() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      router.push(PAGE.SEARCH(encodeURIComponent(searchTerm)));
    }
  };

  return (
    <div className='w-full sm:max-w-xl'>
      <input
        type='search'
        placeholder='Type to search'
        className='w-full rounded-md border border-border bg-transparent px-4 py-2 text-sm outline-none
          transition-colors placeholder:text-gray-500 focus:border-primary'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
