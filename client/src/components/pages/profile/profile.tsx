import React, { Dispatch, useEffect, useState } from 'react';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import {
  WrapperColumn, WrapperRowWrap,
} from 'atoms/atoms.styled';
import FilmsListItem from 'components/common/films-list-item';
import NewEditUser from 'components/pages/newEditUser';
import 'react-tabs/style/react-tabs.css';
import { IFilm } from 'interfaces/film.interface';
import { getFilmById } from 'api/films';
import { ADD_FILMS, SET_ERROR } from 'actions/actionTypes';
import { IUserAction } from 'interfaces/userAction.interface';
import { connect } from 'react-redux';
import { IRootStore } from 'store';
import { IError } from 'interfaces/error.interface';
import UserInfo from 'components/common/user-info';
import { IUser } from 'interfaces/user.interface';

interface IProps {
  userFilms: IFilm[];
  user: IUser;
  films: IFilm[];
  addFilms: (f: IFilm[]) => void;
  setError: (f: IError) => void;
}

const mapStateToProps = (state: IRootStore) => {
  return {
    userFilms: state.userFilms,
    films: state.films,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IUserAction>) => ({
  addFilms: (payload: IFilm[]) =>
    dispatch({ type: ADD_FILMS, payload }),
  setError: (payload: IError) =>
    dispatch({ type: SET_ERROR, payload }),
});

const Profile: React.FC<IProps> = ({
  films = [], user, userFilms, addFilms, setError,
}) => {
  const [editUserInfo, setEditUserInfo] = useState(false);
  useEffect(() => {
    userFilms.forEach((userFilm) => {
      if (!films.find((film) => film.id === userFilm.id)) {
        getFilmById(userFilm.id)
          .then((res) => {
            addFilms([{
              ...res,
              liked: userFilm.liked,
              watched: userFilm.watched,
              toWatch: userFilm.toWatch,
            }]);
          })
          .catch(() => {
            setError({ isError: true, text: 'Error while films fetching' });
          });
      }
    });
  }, []);

  return (
    <WrapperColumn alignSide="center">
      {
        editUserInfo
          ? <NewEditUser
              user={user}
              setEditUserInfo={setEditUserInfo}
            />
          : <UserInfo
              setEditUserInfo={setEditUserInfo}
              user={user}
          />
      }
      <Tabs>
        <TabList>
          <Tab>Liked</Tab>
          <Tab>Watched</Tab>
          <Tab>Wished to watch</Tab>
        </TabList>

        <TabPanel>
          <WrapperRowWrap>
            {films.map((film) => (film.liked
              ? (
                <FilmsListItem
                  key={film.id}
                  filmDetails={film}
                />
              )
              : null))}
          </WrapperRowWrap>
        </TabPanel>
        <TabPanel>
          <WrapperRowWrap>
            {films.map((film) => (film.watched
              ? (
                <FilmsListItem
                  key={film.id}
                  filmDetails={film}
                />
              )
              : null))}
          </WrapperRowWrap>
        </TabPanel>
        <TabPanel>
          <WrapperRowWrap>
            {films.map((film) => (film.toWatch
              ? (
                <FilmsListItem
                  key={film.id}
                  filmDetails={film}
                />
              )
              : null))}
          </WrapperRowWrap>
        </TabPanel>
      </Tabs>
    </WrapperColumn>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
