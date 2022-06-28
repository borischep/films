import React, { Dispatch, useEffect, useState } from 'react';
import { Text, WrapperColumn, ButtonWithBorderRadius } from 'atoms/atoms.styled';
import FormInput from 'components/common/form/form-input';
import FormSelect from 'components/common/form/form-select';
import Form from 'components/common/form';
import { IUser } from 'interfaces/user.interface';
import 'react-tabs/style/react-tabs.css';
import { SET_USER } from 'actions/actionTypes';
import { connect } from 'react-redux';
import { IRootStore } from 'store';
import { IUserAction } from 'interfaces/userAction.interface';
import { getUser, setUser } from 'api/users';

interface IProps {
  editInfo?: boolean;
  user: IUser;
  setUserInfo: (u: IUser) => void;
}

const mapStateToProps = (state: IRootStore) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IUserAction>) => ({
  setUserInfo: (payload: IUser) =>
    dispatch({ type: SET_USER, payload }),
});

const UserInfo = ({ editInfo = false, user, setUserInfo }: IProps) => {
  const genders = [
    'Male', 'Female', 'Prefer not to tell',
  ];

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Historical', 'Horror', 'Science fiction', 'War films', 'Westerns',
  ];

  const [editUserInfo, setEditUserInfo] = useState<boolean>(editInfo);

  useEffect(() => {
    getUser()
      .then((res) => {
        setUserInfo(res[0]);
      });
  }, []);

  const onSubmit = (form: IUser) => {
    setUser(form);
    setUserInfo(form);
    setEditUserInfo((prev) => !prev);
  };

  return editUserInfo ? (
    <WrapperColumn alignSide="center">
      <Form submit={onSubmit} formInitialValues={user}>
        <FormInput name="username" label="Username" placeholder="Example: Your name" type="string" />
        <FormInput name="email" label="Email" type="email" placeholder="example@email.com" />
        <FormInput name="birthday" label="Birthday" type="date" placeholder="00.00.0000" />
        <FormSelect name="gender" label="Gender" options={genders} />
        <FormSelect name="genre" label="Favorite genre" options={genres} />
        <FormInput
          name="filmsAmount"
          label="How many films do you want to watch in month"
          type="number"
          placeholder="16"
        />
      </Form>
    </WrapperColumn>
  )
    : (
      <WrapperColumn alignSide="left">
        {user?.username ? <Text>Username: {user.username}</Text> : null}
        {user?.email ? <Text>Email: {user.email}</Text> : null}
        {user?.birthday ? <Text>Birthday: {user.birthday}</Text> : null}
        {user?.gender ? <Text>Gender: {user.gender}</Text> : null}
        {user?.genre ? <Text>Favorite genre: {user.genre}</Text> : null}
        {user?.filmsAmount ? <Text>How many films you want to watch in month: {user.filmsAmount}</Text> : null}
        <WrapperColumn alignSide="center">
          <ButtonWithBorderRadius onClick={() => {
            setEditUserInfo((prev) => !prev);
          }}
          >
            Edit
          </ButtonWithBorderRadius>
        </WrapperColumn>
      </WrapperColumn>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
