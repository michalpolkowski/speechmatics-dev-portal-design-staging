import Link from 'next/link';
import Dashboard from '../components/dashboard';
import CodeSnippet from '../components/code-snippet'
import Image from 'next/image';

export default function Home({ }) {
  return (
    <Dashboard>
      <h1>Home</h1>
      <p className='subtitle'>Get started with using our platform in a few simple steps</p>
      <div className='divide_line divide_line__top'></div>

      <div className='grid md:grid-cols-1 gap-5 md:gap-8 lg:gap-10 mb-10'>

        <div className='cta_callout cta_callout__speech_blue'>
          <div className='icon'>
            <Image
              src="/assets/icon-transcribe.svg"
              alt="Intro Icon"
              width={56}
              height={56}
            />
          </div>
          <div className='cta_text'>
            <h3>Transcribe an audio file with code</h3>
          </div>
          <a href='/get-started' className='button button__extended button__white shrink-0'>Get Started</a>
        </div>

      </div>

      {/*  NOT USED FOR NOW

      <div className='grid md:grid-cols-2 gap-5 md:gap-8 lg:gap-10 mb-10 '>

        <div className='padding card card__centered card__featured card__blue'>
          <div className='w-16 h-16 items-center justify-center mb-3'>
            <Image
              src="/assets/icon-transcribe.svg"
              alt="Intro Icon"
              width={56}
              height={56}
            />
          </div>
          <h3>Transcribe an audio file with code</h3>
          <a className='button button__white button__extended' href='#'>Learn More</a>
        </div>
        <div className='padding card card__centered card__featured card__green'>
          <div className='w-16 h-16 items-center justify-center mb-3'>
            <Image
              src="/assets/icon-transcribe.svg"
              alt="Intro Icon"
              width={56}
              height={56}
            />
          </div>
          <h3>Upload and transcribe an audio file</h3>
          <a className='button button__white button__extended' href='#'>Learn More</a>
        </div>

      </div>

      */}

      <div className='cards_wrapper mb-10'>
        <div className='card card__centereddd'>
          <div className='w-12 h-12 items-center justify-center mb-4 xl:mb-5'>
            <Image
              src="/assets/icon-test.svg"
              alt="Intro Icon"
              width={48}
              height={48}
            />
          </div>
          <h3>Manage API Tokens</h3>
          <p className='mb-6'>You need to create an API key to make API requests.</p>
          <a href='/api-token'>Create API Token</a>
        </div>
        <div className='card card__centereddd'>
          <div className='w-12 h-12 items-center justify-center mb-4 xl:mb-5'>
            <Image
              src="/assets/icon-test.svg"
              alt="Intro Icon"
              width={48}
              height={48}
            />
          </div>
          <h3>Track your usage</h3>
          <p className='mb-6'>Usage is measured in hours of audio processed</p>
          <a href='/usage'>View Usage</a>
        </div>
        <div className='card card__centereddd'>
          <div className='w-12 h-12 items-center justify-center mb-4 xl:mb-5'>
            <Image
              src="/assets/icon-test.svg"
              alt="Intro Icon"
              width={48}
              height={48}
            />
          </div>
          <h3>Learning Resources</h3>
          <p className='mb-6'>Explore our documentation and learning resources</p>
          <a href='/resources'>Learn</a>
        </div>
      </div>

    </Dashboard >
  );
}