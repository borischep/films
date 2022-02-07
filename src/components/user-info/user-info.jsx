import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, WrapperColumn, ButtonWithBorderRadius } from '../../atoms/atoms.styled';
import FormInput from '../form-input';
import FormSelect from '../form-select';
import Form from '../form';
import 'react-tabs/style/react-tabs.css';

const UserInfo = ({ editInfo, afterSubmit }) => {
  const genders = [
    'Male', 'Female', 'Prefer not to tell',
  ];

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Historical', 'Horror', 'Science fiction', 'War films', 'Westerns',
  ];

  const INITIAL_FORM_STATE = {
    username: '',
    email: '',
    birthday: '',
    gender: genders[0],
    genre: genres[0],
    filmsAmount: 0,
  };

  const [editUserInfo, setEditUserInfo] = useState(editInfo);
  const [userInfo, setUserInfo] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
  }, []);

  const onSubmit = (form) => {
    if (Object.values(form).includes('')) {
      alert('Fill all fields');
    } else {
      setUserInfo(form);
      localStorage.setItem('userInfo', JSON.stringify(form));
      setEditUserInfo((prev) => !prev);
      afterSubmit();
    }
  };

  return editUserInfo ? (
    <WrapperColumn alignSide="center">
      <Form submit={onSubmit} formInitialValues={userInfo}>
        <FormInput name="username" label="Username" placeholder="Example: Your name" />
        <FormInput name="email" label="Email" type="email" placeholder="example@email.com" />
        <FormInput name="birthday" label="Birthday" type="date" />
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
        <Text>Username: {userInfo.username}</Text>
        <Text>Email: {userInfo.email}</Text>
        <Text>Birthday: {userInfo.birthday}</Text>
        <Text>Gender: {userInfo.gender}</Text>
        <Text>Favorite genre: {userInfo.genre}</Text>
        <Text>How many films do you want to watch in month: {userInfo.filmsAmount}</Text>
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

UserInfo.propTypes = {
  editInfo: PropTypes.bool,
  afterSubmit: PropTypes.func,
};

UserInfo.defaultProps = {
  editInfo: false,
  afterSubmit: () => {},
};

export default UserInfo;
