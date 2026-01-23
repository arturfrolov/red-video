import { HeaderLinks } from '@/components/layout/content/header/HeaderLinks';
import { SearchField } from '@/components/layout/content/header/SearchField';
import { HeaderProfile } from '@/components/layout/content/header/profile/HeaderProfile';

export function Header() {
  return (
    <header className='p-layout border-b border-border flex items-center justify-between'>
      <SearchField />
      <div className='flex items-center gap-8'>
        <HeaderLinks />
        <HeaderProfile />
      </div>
    </header>
  );
}
