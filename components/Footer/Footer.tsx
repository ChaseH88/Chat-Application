import React, { FC } from 'react';

// Styles
import { FooterStyle } from './styled';

const Footer: FC = (): JSX.Element => (
  <FooterStyle>
    <hr />
    <span>I'm here to stay (Footer)</span>
  </FooterStyle>
)

export { Footer }
