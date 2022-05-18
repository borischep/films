import { SET_USER, UPDATE_USER,
  SET_IS_LOGGED,
  SET_NEXT_PAGE, SET_PAGE,
  SET_DARK_THEME,
  SET_USER_FILMS, UPDATE_USER_FILM, 
  SET_FILMS, ADD_FILMS,
  CLEAR_USER_STORE } from 'actions/actionTypes';
import { IFilm } from 'interfaces/film.interface';
import { IRootStore } from 'store';
import { AnyAction, Reducer } from 'redux';

export const reducer: Reducer = (state: IRootStore, action: AnyAction) => {
  console.log(state);
  switch (action.type) {
    case SET_USER: 
      return {
        ...state, user: action.payload,
      };

    case UPDATE_USER: 
      return {
        ...state, user: { ...state.user, [action.payload.key]: action.payload.value },
      };

    case SET_IS_LOGGED:
      return {
        ...state, isLogged: action.payload,
      };
    
    case SET_DARK_THEME:
      return {
        ...state, darkTheme: action.payload,
      };
    
    case SET_PAGE:
      return {
        ...state, page: action.payload,
      };
    case SET_NEXT_PAGE:
      return {
        ...state, page: state.page + 1,
      };
    
    case SET_USER_FILMS:
      return {
        ...state, userFilms: action.payload,
      };
    case UPDATE_USER_FILM: 
      if (!action.payload.liked && !action.payload.watched && !action.payload.toWatch) {
        return {
          ...state,
          userFilms: [...state.userFilms.filter((item: IFilm) => item.id !== action.payload.id) ],
        };
      } else {
        return {
          ...state,
          userFilms: [...state.userFilms.filter((item: IFilm) => item.id !== action.payload.id), action.payload ],
        };
      }
    case SET_FILMS: 
      return {
        ...state, films: action.payload,
      };
    case ADD_FILMS: 
      return {
        ...state,
        films: [
          ...state.films.filter((item: IFilm) => (!action.payload.find((film: IFilm) => film.id === item.id))),
          ...action.payload.map((item: IFilm) => {
            const filmMarks = state.userFilms.find((film: IFilm) => film.id === item.id);
            item.liked = filmMarks ? filmMarks.liked : false;
            item.watched = filmMarks ? filmMarks.watched : false;
            item.toWatch = filmMarks ? filmMarks.toWatch : false;
            return item;
          }),
        ],
      };
    case CLEAR_USER_STORE: 
      return {
        ...state,
        films: [],
        page: 0,
        userFilms: [],
        user: {},
      };
    default:
      return state;
  }
};