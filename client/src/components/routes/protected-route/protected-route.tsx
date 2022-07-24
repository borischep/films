import React, { Dispatch, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, useLocation, RouteProps } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';

import { SET_IS_LOGGED } from 'actions/actionTypes';
import { checkToken } from 'api/accessToken';
import { IUserAction } from 'interfaces/userAction.interface';
import { IRootStore } from 'store';

interface IProps {
  path: string;
  isLogged: boolean;
  setIsLogged: (b: boolean) => void;
  component: RouteProps['component'],
}

const mapStateToProps = (state: IRootStore) => {
  return {
    isLogged: state.isLogged,
  };
};


const mapDispatchToProps = (dispatch: Dispatch<IUserAction>) => ({
  setIsLogged: (payload: boolean) =>
    dispatch({ type: SET_IS_LOGGED, payload }),
});

const ProtectedRoute = ({
  path, isLogged, setIsLogged, component: Component,
}: IProps) => {
  const history = useHistory();
  const location = useLocation();
  const [redirect, setRedirect] = useState(false);
  const cookies = new Cookies();

  const fetchData = useCallback(async () => {
    await checkToken()
      .then((res) => {
        if (res && res.status === 200) {
          setRedirect(false);
          setIsLogged(true);
        } else {
          setRedirect(true);
          setIsLogged(false);
          cookies.remove('accessToken');
          history.push('/login');
        }
      })
      .catch(() => {
        setRedirect(true);
        setIsLogged(false);
        cookies.remove('accessToken');
        history.push('/login');
      });
  }, []);
  
  useEffect(() => {
    fetchData();
    return () => {
      setRedirect(prev => prev);
    };
  }, [isLogged]);

  if (redirect && !isLogged) {
    return <Redirect
      to={{
        pathname: '/login',
        state: { from: location },
      }}
  />;
  }

  return (
    <Route path={path} exact component={Component} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
