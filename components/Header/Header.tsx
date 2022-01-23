import React, { FC } from 'react';

// Components
import { Nav } from '../Nav';

// Styles
import { HeaderStyle } from './styled';

const Header: FC = (): JSX.Element => (
  <HeaderStyle>
    <Nav />
  </HeaderStyle>
)

export { Header }
