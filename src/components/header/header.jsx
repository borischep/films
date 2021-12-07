import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonWithBorderRadius } from '../../atoms/atoms.styled';
import { HeaderWrapper } from './header.styled';

const Header = () => (
  <HeaderWrapper>
    <Link to="/films">Films</Link>
    <Link to="/profile"><ButtonWithBorderRadius type="button">Profile</ButtonWithBorderRadius></Link>
  </HeaderWrapper>
);

export default Header;
