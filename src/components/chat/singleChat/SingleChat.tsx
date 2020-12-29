import React from 'react';
import { useStateValue } from '../../../stateProvider';
import './singleChat.css';

interface ISingleChat {
  name: string,
  message: string,
  time: string,
}

export default function SingleChat({ name, message, time }: ISingleChat) {
  const [{ user }, /*dispatch*/] = useStateValue();
  return (
    <p className={`chat__message ${name === user.displayName && 'chat__receiver'}`}>
      <span className="chat__name">{name}</span>
      <span>{message}</span>
      <span className="chat__timestamp">{time}</span>
    </p>
  )
}