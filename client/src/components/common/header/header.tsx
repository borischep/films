import React, { useState, useEffect, Dispatch } from 'react';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import {
  ButtonWithBorderRadius, WrapperRowWrap,
} from 'atoms/atoms.styled';
import { HeaderWrapper, SwitchWrapper, HeaderText } from './header.styled';
import { SET_IS_LOGGED, SET_DARK_THEME } from 'actions/actionTypes';
import { connect } from 'react-redux';
import { IRootStore } from 'store';
import { IUserAction } from 'interfaces/userAction.interface';
import { deleteUser } from 'api/users';

interface IProps {
  isLogged: boolean;
  setDarkTheme: (b: boolean) => void;
  setIsLogged: (b: boolean) => void;
}

const mapStateToProps = (state: IRootStore) => {
  return {
    isLogged: state.isLogged,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IUserAction>) => ({
  setIsLogged: (payload: boolean) =>
    dispatch({ type: SET_IS_LOGGED, payload }),
  setDarkTheme: (payload: boolean) =>
    dispatch({ type: SET_DARK_THEME, payload }),
});

const Header = ({ setDarkTheme, setIsLogged, isLogged }: IProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  const onClickLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsLogged(false);
    deleteUser();
  };

  useEffect(() => {
    setIsLogged(localStorage.getItem('isAuthenticated') === 'true');
  }, []);

  const onThemeChanged = (value: boolean) => {
    setChecked((prev) => !prev);
    setDarkTheme(value);
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
