import React, { FC } from 'react';

// Components
import { Header } from '../Header';
import { Footer } from '../Footer';

// Styles
import { LayoutStyle } from './styled';

const Layout: FC = ({ children }): JSX.Element => (
  <div id='template'>
    <Header />
    <LayoutStyle>
      {children}
    </LayoutStyle>
    <Footer />
  </div>
)

export { Layout }
