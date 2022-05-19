import React, { useEffect } from 'react';
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
import { observer } from 'mobx-react';
import { useStore } from 'stores/root-store';

const Profile = () => {
  const { filmStore } = useStore();

  useEffect(() => {
    filmStore.userFilms.forEach((userFilm: IFilm) => {
      if (!filmStore.films.find((film: IFilm) => film.id === userFilm.id)) {
        fetch(`https://api.themoviedb.org/3/movie/${userFilm.id}?api_key=${process.env.REACT_APP_API_KEY}`)
          .then((res) => res.json())
          .then((res: IFilm) => {
            filmStore.addFilms([{
              ...res,
              liked: userFilm.liked,
              watched: userFilm.watched,
              toWatch: userFilm.toWatch,
            }]);
          });
      }
    });
  }, [filmStore.userFilms]);

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
            {filmStore.films.map((film: IFilm) => (film.liked
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
            {filmStore.films.map((film: IFilm) => (film.watched
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
            {filmStore.films.map((film: IFilm) => (film.toWatch
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

export default observer(Profile);