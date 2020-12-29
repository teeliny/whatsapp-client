import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SingleChat from './singleChat/SingleChat';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import firebase from 'firebase';
import db from '../../firebase';
import { useStateValue } from '../../stateProvider';

import './chat.css';

export default function Chat() {
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [{ user }, /*dispatch*/] = useStateValue();
  const { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
        const val = snapshot.data();
        if (val !== undefined) setRoomName(val.name);
        else setRoomName('');
      })
      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())))
    }
  }, [roomId])
  const sendMessage = (async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
    
    setInput('');
  })

  useEffect(() => {
    setSeed(`${Math.floor(Math.random() * 5000)}`);
  }, [])
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__header__info">
          <h3>{roomName}</h3>
          <p>{new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
        </div>
        <div className="chat__header__right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((chat, index) => (
          <SingleChat
            key={index}
            name={chat.name}
            message={chat.message}
            time={new Date(chat.timestamp?.toDate()).toUTCString()}
          />
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon /> 
        <form>
          <input type="text" placeholder="Type a message" value={input} onChange={(e) => setInput(e.target.value) } />
          <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}
