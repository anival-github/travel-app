import React, {
  Fragment, useState,
} from 'react';

import {
  Button, Avatar,
} from '@material-ui/core';

export default function SetAvatar() {
  async function setAvatarhandler(e:any, calllback: Function) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      calllback(reader.result);
    };
    reader.readAsDataURL(file);
  }
  const [avatarSrc, setavatarSrc] = useState('');
  return (
    <>
      <Avatar alt="" src={avatarSrc} style={{ width: '180px', height: '180px' }} />
      <label htmlFor="contained-button-file">
        <input
          name="avatar"
          accept="image/*"
          id="contained-button-file"
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => setAvatarhandler(e, setavatarSrc)}
        />

        <Button variant="contained" component="span">
          Chose avatar
        </Button>
      </label>
    </>
  );
}
