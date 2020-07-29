/**@jsx jsx */
import {jsx,css} from '@emotion/core'
import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { auth } from 'firebase';

function Message({ message }) {
  const [messageSender,setMessageSender]=useState("")
  useEffect(()=>{
    
  })

  return <div css={
    css`display:flex;`
  }>
    <img src={}></img>
    {message.content}</div>;
}
export default Message;
