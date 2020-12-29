import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import db from '../../../firebase';
import './sidebarChat.css';

interface ISidebarChat {
  addNewChat?: string,
  name?: string,
  id?: string,
}

function SidebarChat({ addNewChat, name, id }: ISidebarChat) {
  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())))
    }
  }, [id])

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      db.collection('rooms').add({
        name: roomName,
      })
    }
  }

  useEffect(() => {
    setSeed(`${Math.floor(Math.random() * 5000)}`);
  }, [])

  return (addNewChat !== undefined) ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat" id={id}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  )
}

export default SidebarChat
