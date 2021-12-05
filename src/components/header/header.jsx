import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonWithBorderRadius } from '../../atoms/atoms.styled';
import { HeaderWrapper } from './header.styled';

const Header = () => (
  <HeaderWrapper>
    <div><Link to="/films">Films</Link></div>
    <div>
      <Link to="/profile"><ButtonWithBorderRadius type="button">Profile</ButtonWithBorderRadius></Link>
    </div>
  </HeaderWrapper>
);

export default Header;
