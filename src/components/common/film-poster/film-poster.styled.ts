import styled from 'styled-components';

export const FilmPosterImg = styled.img`
  width: 200px;
  height: 300px;
`;

export const FilmPosterWrapper = styled.div`
  margin-top: -40px;
  width: 200px;

  .poster-icon {
    cursor: pointer;
    height: 20px;
    width: 20px;
    position: relative;
    top: 35px;
    left: 5px;
    background: white;
    padding: 2px;
    margin-right: 5px;
    border-radius: 5px;
  }

  .active{
    color: red;
  }

  .inactive{
    color: gray;
  }
`;
