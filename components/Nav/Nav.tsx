import React, { FC } from 'react'
import Link from 'next/link'

// Styles
import { NavStyle } from './styled';

const Nav: FC = (): JSX.Element => (
  <NavStyle>
    <Link href="/">
      <a>Home</a>
    </Link>{' '}
  </NavStyle>
)

export { Nav }
