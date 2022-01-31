import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { Text, WrapperColumnCenter, WrapperRowWrap } from '../../atoms/atoms.styled';
import FilmsListItem from '../films-list-item';
import 'react-tabs/style/react-tabs.css';

const Profile = ({
  films, onUpdateFilms, userFilms, onUpdateUserFilms,
}) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);

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
    <WrapperColumnCenter>
      <Text>{username}</Text>
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
    </WrapperColumnCenter>
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
