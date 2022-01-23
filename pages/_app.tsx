import type { AppProps } from 'next/app';
import 'public/styles.css'

/**
 * Main App component that renders before any of the pages
 * @see https://nextjs.org/docs/basic-features/typescript#custom-app
 */
const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

// App.getInitialProps = async () => {}

export default App;

