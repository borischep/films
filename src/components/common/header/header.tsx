import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import {
  ButtonWithBorderRadius, WrapperRowWrap,
} from 'atoms/atoms.styled';
import { HeaderWrapper, SwitchWrapper, HeaderText } from './header.styled';
import { observer } from 'mobx-react';
import { useStore } from 'stores/root-store';

const Header = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const { userStore, filmStore, themeStore } = useStore();

  const onClickLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userFilms');
    userStore.clearStore();
    filmStore.clearStore();
  };

  useEffect(() => {
    userStore.setIsLogged(localStorage.getItem('isAuthenticated') === 'true');
  }, []);

  const onThemeChanged = (value: boolean) => {
    setChecked((prev) => !prev);
    themeStore.setDarkTheme(value);
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
        {userStore.isLogged
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

export default observer(Header);