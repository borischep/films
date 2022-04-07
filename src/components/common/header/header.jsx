import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import {
  ButtonWithBorderRadius, WrapperRowWrap,
} from 'atoms/atoms.styled';
import { HeaderWrapper, SwitchWrapper, HeaderText } from './header.styled';

const Header = ({ onDarkThemeOn, setIsLogged, isLogged }) => {
  const [checked, setChecked] = useState(false);

  const onClickLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userFilms');
    setIsLogged(false);
  };

  useEffect(() => {
    setIsLogged(localStorage.getItem('isAuthenticated') === 'true');
  }, []);

  const onThemeChanged = (value) => {
    setChecked((prev) => !prev);
    onDarkThemeOn(value);
  };

  return (
    <HeaderWrapper>
      <Link to="/films"><HeaderText>Films</HeaderText></Link>
      <WrapperRowWrap>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <SwitchWrapper>
          <Switch
            label="Dark theme"
            onChange={onThemeChanged}
            checked={checked}
            uncheckedIcon={false}
            checkedIcon={false}
            onColor="#5f6bff"
          />
          <HeaderText>Dark theme</HeaderText>
        </SwitchWrapper>
        {isLogged
          ? (
            <div>
              <Link to="/profile">
                <ButtonWithBorderRadius withMargin="0 10px 0 0" type="button">Profile</ButtonWithBorderRadius>
              </Link>
              <Link to="/">
                <ButtonWithBorderRadius type="button" onClick={onClickLogout}>Log out</ButtonWithBorderRadius>
              </Link>
            </div>
          ) : null}
      </WrapperRowWrap>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  onDarkThemeOn: PropTypes.func.isRequired,
  isLogged: PropTypes.bool,
  setIsLogged: PropTypes.func.isRequired,
};

Header.defaultProps = {
  isLogged: false,
};

export default Header;
