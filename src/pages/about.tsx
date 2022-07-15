import * as React from 'react';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Header from '@/components/layout/Header';
import Image from 'next/image';
import mepic from '~/images/self.jpeg';

import UnderlineLink from '@/components/links/UnderlineLink';


export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <Header/>


      <main>
        <section className='bg-white pt-9'>
         
          <div className='layout flex min-h-screen flex-col items-center '>
          <Image src={mepic} width="400px" height="300px"/>

          
            <h4 className='pt-9'>
            I'm a second year student at the University of Windsor. I enjoy participating in game jams and hackathons. Checkout my projects on Devpost and itch!
            </h4>

            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='http://nithinmuthukumar.com'>
                Nithin Muthukumar
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}

