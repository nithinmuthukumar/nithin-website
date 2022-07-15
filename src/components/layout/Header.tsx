import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';
import ProfilePic from '~/images/self.jpeg';

const links = [
  { href: 'http://nithinmuthukumar.com/images/NithinMuthukumarResume.pdf', label: 'Resume' },
  { href: '/about', label: 'About'}
];

export default function Header() {
  return (
    <header className='sticky top-0 z-50 bg-white'>
    
      <div className='layout flex h-14 items-center justify-between'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600 text-2xl'>
          Home
        </UnstyledLink>
        <nav>
          <ul className='flex items-center justify-between space-x-4'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className='hover:text-gray-600 text-2xl'>
                  {label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
