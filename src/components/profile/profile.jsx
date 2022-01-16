import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { Text, WrapperColumnCenter, WrapperRowWrap } from '../../atoms/atoms.styled';
import FilmsListItem from '../films-list-item';
import './profile.css';

const Profile = ({
  films, onUpdateFilms, userFilms, onUpdateUserFilms,
}) => {
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
            {userFilms.map((film) => (film.liked
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
            {userFilms.map((film) => (film.watched
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
            {userFilms.map((film) => (film.toWatch
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
