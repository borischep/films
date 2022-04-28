import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import {
  ButtonWithBorderRadius, WrapperRowWrap,
} from 'atoms/atoms.styled';
import { HeaderWrapper, SwitchWrapper, HeaderText } from './header.styled';

interface IProps {
  onDarkThemeOn: (b: boolean) => void;
  isLogged: boolean;
  setIsLogged: (b: boolean) => void;
}

const Header = ({ onDarkThemeOn, setIsLogged, isLogged }: IProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  const onClickLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userFilms');
    setIsLogged(false);
  };

  useEffect(() => {
    setIsLogged(localStorage.getItem('isAuthenticated') === 'true');
  }, []);

  const onThemeChanged = (value: boolean) => {
    setChecked((prev) => !prev);
    onDarkThemeOn(value);
  };

  return (
    <HeaderWrapper>
      <Link to="/films"><HeaderText>Films</HeaderText></Link>
      <WrapperRowWrap>
        <SwitchWrapper>
          <Switch
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

export default Header;
