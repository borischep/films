import React, { useEffect, useState } from 'react';
import { Text, WrapperColumnCenter } from '../../atoms/atoms.styled';

const Profile = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);

  return (
    <WrapperColumnCenter>
      <Text>{username}</Text>
    </WrapperColumnCenter>
  );
};

export default Profile;
