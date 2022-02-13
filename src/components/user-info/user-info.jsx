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

  const [editUserInfo, setEditUserInfo] = useState(editInfo);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
  }, []);

  const onSubmit = (form) => {
    setUserInfo(form);
    localStorage.setItem('userInfo', JSON.stringify(form));
    setEditUserInfo((prev) => !prev);
    afterSubmit();
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
        {userInfo.username ? <Text>Username: {userInfo.username}</Text> : null}
        {userInfo.email ? <Text>Email: {userInfo.email}</Text> : null}
        {userInfo.birthday ? <Text>Birthday: {userInfo.birthday}</Text> : null}
        {userInfo.gender ? <Text>Gender: {userInfo.gender}</Text> : null}
        {userInfo.genre ? <Text>Favorite genre: {userInfo.genre}</Text> : null}
        {userInfo.filmsAmount ? <Text>How many films you want to watch in month: {userInfo.filmsAmount}</Text> : null}
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
