import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import {
  WrapperColumn, WrapperRowWrap,
} from 'atoms/atoms.styled';
import FilmsListItem from 'components/common/films-list-item';
import UserInfo from './user-info';
import 'react-tabs/style/react-tabs.css';

const Profile = ({
  films, onUpdateFilms, userFilms, onUpdateUserFilms,
}) => {
  useEffect(() => {
    userFilms.forEach((userFilm) => {
      if (!films.find((film) => film.id === userFilm.id)) {
        fetch(`https://api.themoviedb.org/3/movie/${userFilm.id}?api_key=${process.env.REACT_APP_API_KEY}`)
          .then((res) => res.json())
          .then((res) => {
            onUpdateFilms((prev) => [...prev, {
              ...res,
              liked: userFilm.liked,
              watched: userFilm.watched,
              toWatch: userFilm.toWatch,
            }]);
          });
      }
    });
  }, [userFilms]);

  return (
    <WrapperColumn alignSide="center">
      <UserInfo />
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
                  onUpdateFilms={onUpdateFilms}
                  filmDetails={film}
                  films={films}
                  onUpdateUserFilms={onUpdateUserFilms}
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
                  onUpdateFilms={onUpdateFilms}
                  filmDetails={film}
                  films={films}
                  onUpdateUserFilms={onUpdateUserFilms}
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
                  onUpdateFilms={onUpdateFilms}
                  filmDetails={film}
                  films={films}
                  onUpdateUserFilms={onUpdateUserFilms}
                />
              )
              : null))}
          </WrapperRowWrap>
        </TabPanel>
      </Tabs>
    </WrapperColumn>
  );
};

Profile.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object),
  onUpdateFilms: PropTypes.func.isRequired,
  userFilms: PropTypes.arrayOf(PropTypes.object),
  onUpdateUserFilms: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  films: [],
  userFilms: [],
};

export default Profile;
