import type { AppProps } from 'next/app';
import Header from '@/components/Header';
import '@/styles/globals.css';
import { AuthProvider } from '@/hooks/useAuth';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;