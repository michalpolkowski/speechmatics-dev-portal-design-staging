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
          <a href='#' className='button button__extended button__white shrink-0'>Get Started</a>
        </div>

      </div>

      <div className='grid md:grid-cols-2 gap-5 md:gap-8 lg:gap-10 mb-10 hidden'>

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

      <div className='cards_wrapper mb-10'>
        <div className='card card__centered'>
          <div className='w-8 h-8 items-center justify-center mb-3'>
            <Image
              src="/assets/icon-test.svg"
              alt="Intro Icon"
              width={26}
              height={26}
            />
          </div>
          <h3>Introduction</h3>
          <p>How to use the RESTful API for the Speechmatics Cloud Offering.</p>
          <a href='#'>Learn More</a>
        </div>
        <div className='card card__centered'>
          <div className='w-8 h-8 items-center justify-center mb-3'>
            <Image
              src="/assets/icon-test.svg"
              alt="Intro Icon"
              width={26}
              height={26}
            />
          </div>
          <h3>Configuring the job request  with a longer title</h3>
          <p>How to use the RESTful API for the Speechmatics Cloud Offering.</p>
          <a href='#'>Learn More</a>
        </div>
        <div className='card card__centered'>
          <div className='card__icon'>
            <Image
              src="/assets/icon-test.svg"
              alt="Intro Icon"
              width={26}
              height={26}
            />
          </div>
          <h3>Configuring</h3>
          <p>Speechmatics Cloud Offering.</p>
          <a href='#'>Learn More</a>
        </div>
      </div>

      <div className='card'>
        <h2>Download Audio File</h2>
        <p>Download our sample audio file into a folder, or use your own.</p>

        <div className='divide_line my-4 md:my-6 lg:my-8 '></div>

        <h2>Create an API key</h2>
        <p>Download our <a href="#">sample audio file</a> into a folder, or use your own.</p>

        <div className='divide_line my-4 md:my-6 lg:my-8 '></div>

        <h2>Make an API request with code</h2>
        <p>Copy the following curl command and replace the API key with your own.</p>
        <p>Run the command to generate a transcript.</p>

        <CodeSnippet>
          curl -L -X POST https://asr.api.speechmatics.com/v2/jobs/ -H  “Authorization:
        </CodeSnippet>

      </div>
    </Dashboard >
  );
}