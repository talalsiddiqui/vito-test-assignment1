import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {  ConfigProvider, Layout } from 'antd';
import { Roboto } from 'next/font/google'
import HeaderElements from '@/components/layout/header';
import { ApolloProvider } from '@apollo/client';
import client from '@/utils/apollo';

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400'
})



const { Header, Content } = Layout;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <ApolloProvider client={client}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#00000',
            },
          }}
        >
          <Layout>
              <Header className='header'>
                <HeaderElements />
              </Header>
              <Layout>
                <Content>
                  <Component {...pageProps} />
                </Content>
              </Layout>
          </Layout>
        </ConfigProvider>
      </ApolloProvider>
    </>
  );
}
