import React, { FC } from 'react'
import Head from 'next/head'

interface MetaDataInterface {
  title: string
}

const MetaData: FC<MetaDataInterface> = ({
  title = 'This is the default title'
}) => (
  <Head>
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
);

export { MetaData }
