import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { Text, WrapperColumnCenter, WrapperRowWrap } from '../../atoms/atoms.styled';
import FilmsListItem from '../films-list-item';
import './profile.css';

const Profile = ({ films, onUpdateFilms }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);

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
              ? <FilmsListItem key={film.id} onUpdateFilms={onUpdateFilms} filmDetails={film} />
              : null))}
          </WrapperRowWrap>
        </TabPanel>
        <TabPanel>
          <WrapperRowWrap>
            {films.map((film) => (film.watched
              ? <FilmsListItem key={film.id} onUpdateFilms={onUpdateFilms} filmDetails={film} />
              : null))}
          </WrapperRowWrap>
        </TabPanel>
        <TabPanel>
          <WrapperRowWrap>
            {films.map((film) => (film.toWatch
              ? <FilmsListItem key={film.id} onUpdateFilms={onUpdateFilms} filmDetails={film} />
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
};

Profile.defaultProps = {
  films: [],
};

export default Profile;
