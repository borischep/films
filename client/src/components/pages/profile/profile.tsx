import React, { useEffect, useState } from 'react';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import {
  WrapperColumn, WrapperRowWrap,
} from 'atoms/atoms.styled';
import FilmsListItem from 'components/common/films-list-item';
import UserInfo from './user-info';
import 'react-tabs/style/react-tabs.css';
import { IFilm } from 'interfaces/film.interface';
import { getUserFilms } from 'api/films';

const Profile: React.FC = () => {
  const [userfilms, setUserFilms] = useState<IFilm[]>([]);
  useEffect(() => {
    getUserFilms()
      .then((res) => {
        setUserFilms(res);
      });
  }, []);

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
            {userfilms.map((film) => (film.liked
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
            {userfilms.map((film) => (film.watched
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
            {userfilms.map((film) => (film.toWatch
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

export default Profile;
