import Link from 'next/link';
import Dashboard from '../components/dashboard';
import CodeSnippet from '../components/code-snippet'
import Image from 'next/image';

export default function GetStarted({ }) {
  return (
    <Dashboard>
      <h1>Get started</h1>
      <p className='subtitle'>Get started with our API in a few simple steps</p>
      <div className='divide_line divide_line__top'></div>

      <div className='card'>
        <h2>Download Audio File</h2>
        <p>Download our <a href="#">sample audio file</a> into a folder, or use your own.</p>
        <div className='divide_line my-4 md:my-6 lg:my-8 '></div>

        <h2>Create an API key</h2>
        <p>GENERATE INPUT AND BUTTON.</p>

        <div className='divide_line my-4 md:my-6 lg:my-8 '></div>

        <h2>Make an API request with code</h2>
        <p>Copy the following curl command and replace the API key with your own.</p>
        <p>Run the command to generate a transcript.</p>

        <CodeSnippet>
          curl -L -X POST https://asr.api.speechmatics.com/v2/jobs/ -H  “Authorization:
        </CodeSnippet>

      </div>


      <div className="steps_container mt-48">
        {stepsData.map((item, i) => (
          <StepItem item={item} key={i} />
        ))}
      </div>
    </Dashboard >
  );
}

const StepItem = ({ item: { title, status, link } }) => (
  <Link href={link}>
    <div className="rounded_shadow_box step_item">
      <div>{title}</div>
      <div style={{ color: colorStatus[status] || '#aaa' }}>{status}</div>
    </div>
  </Link>
);

const stepsData = [
  {
    title: 'Create and verify your Account',
    status: 'done',
    link: '/account/',
  },
  {
    title: 'Create an API key',
    status: 'done',
    link: '/api-token/',
  },
  {
    title: 'Make an API request',
    status: 'waiting',
    link: 'https://docs.speechmatics.com/en/cloud/howto/',
  },
  {
    title: 'Set up payment',
    status: 'waiting',
    link: '/subscriptions/',
  },
  {
    title: 'Review your usage',
    status: '0.3h this month',
    link: '/usage/',
  },
];

const colorStatus = {
  done: '#5BB4AE',
  waiting: '#B49B5B',
  'Need help?': '#5B8EB4',
};