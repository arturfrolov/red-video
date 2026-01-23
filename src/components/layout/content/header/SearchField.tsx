import { useRouter } from 'next/navigation';
import { type KeyboardEvent, useState } from 'react';

import { PAGE } from '@/config/public-page.cofig';

interface Props {}

export function SearchField({}: Props) {
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
    <div className='w-1/3'>
      <input
        type='search'
        placeholder='Type to search'
        className='py-2 px-4 w-full outline-none '
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
