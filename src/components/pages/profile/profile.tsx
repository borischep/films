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

interface IProps {
  userFilms: IFilm[];
  films: IFilm[];
  onUpdateFilms: (f: any) => void;
  onUpdateUserFilms: (f: IFilm) => void;
}

const Profile: React.FC<IProps> = ({
  films = [], onUpdateFilms, userFilms = [], onUpdateUserFilms,
}) => {
  useEffect(() => {
    userFilms.forEach((userFilm) => {
      if (!films.find((film) => film.id === userFilm.id)) {
        fetch(`https://api.themoviedb.org/3/movie/${userFilm.id}?api_key=${process.env.REACT_APP_API_KEY}`)
          .then((res) => res.json())
          .then((res: IFilm) => {
            onUpdateFilms((prev: IFilm[]) => [...prev, {
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
    // eslint-disable-next-line react/jsx-filename-extension
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

export default Profile;
