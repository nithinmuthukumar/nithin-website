import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import Header from '@/components/layout/Header';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Vercel from '~/svg/Vercel.svg';
import Github from '~/svg/github.svg';
import Itch from '~/svg/itch.svg';
import Devpost from '~/svg/devpost.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />


      <main>
        <section className='bg-white'>
        <Header></Header> 
         
          <div className='layout flex min-h-screen items-center'>
            <h1 className='text-6xl mb-9 pr-9'>
              Nithin Muthukumar.
            </h1>
            <div className='layout flex justify-end'>
            <UnstyledLink className='mt-5' href='https://nithinmuthukumar.itch.io' variant='light'>
                                <Itch className='text-6xl mr-9' />
            
            </UnstyledLink>

            <UnstyledLink className='mt-5' href='https://github.com/nithinmuthukumar' variant='light'>
                    <Github className='text-6xl mr-9'/>
                    </UnstyledLink>
                    <UnstyledLink className='mt-5' href='https://devpost.com/nithinmuthukumar?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav' variant='light'>
                    <Devpost className='text-6xl mr-9'/>
                    </UnstyledLink>

            </div>


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
