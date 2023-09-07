import { ClerkProvider } from '@clerk/nextjs';
import { ContextProvider } from '../components/context/StateContext';

import Layout from '@/components/Layout';
import MobileMenuModal from '@/components/MobileMenuModal';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
          <MobileMenuModal />
        </Layout>
      </ContextProvider>
    </ClerkProvider>
  );
}
