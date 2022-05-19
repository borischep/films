import React, { useEffect, useState } from 'react';
import { Text, WrapperColumn, ButtonWithBorderRadius } from 'atoms/atoms.styled';
import FormInput from 'components/common/form/form-input';
import FormSelect from 'components/common/form/form-select';
import Form from 'components/common/form';
import { IUser } from 'interfaces/user.interface';
import 'react-tabs/style/react-tabs.css';
import { observer } from 'mobx-react';
import { useStore } from 'stores/root-store';

interface IProps {
  editInfo?: boolean;
}

const UserInfo = ({ editInfo = false }: IProps) => {
  const { userStore } = useStore();

  const genders = [
    'Male', 'Female', 'Prefer not to tell',
  ];

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Historical', 'Horror', 'Science fiction', 'War films', 'Westerns',
  ];

  const [editUserInfo, setEditUserInfo] = useState<boolean>(editInfo);

  useEffect(() => userStore.setUser(JSON.parse(localStorage.getItem('userInfo') || '')), []);

  const onSubmit = (form: IUser) => {
    userStore.setUser(form);
    localStorage.setItem('userInfo', JSON.stringify(form));
    setEditUserInfo((prev) => !prev);
  };

  return editUserInfo ? (
    <WrapperColumn alignSide="center">
      <Form submit={onSubmit} formInitialValues={userStore.user}>
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
        {userStore.user?.username ? <Text>Username: {userStore.user.username}</Text> : null}
        {userStore.user?.email ? <Text>Email: {userStore.user.email}</Text> : null}
        {userStore.user?.birthday ? <Text>Birthday: {userStore.user.birthday}</Text> : null}
        {userStore.user?.gender ? <Text>Gender: {userStore.user.gender}</Text> : null}
        {userStore.user?.genre ? <Text>Favorite genre: {userStore.user.genre}</Text> : null}
        {userStore.user?.filmsAmount
          ? <Text>How many films you want to watch in month: {userStore.user.filmsAmount}</Text>
          : null}
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

export default observer(UserInfo);