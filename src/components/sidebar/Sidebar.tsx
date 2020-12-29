import React, {useState, useEffect} from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import SidebarChat from './sidebarChat/SidebarChat';
import db from '../../firebase';
import './sidebar.css';
import { useStateValue } from '../../stateProvider';


interface IRoom  {
  id: string;
  data: any;
}
export default function Sidebar() {
  const [rooms, setRooms] = useState<IRoom[]>([] as IRoom[]);
  const [{ user }, /*dispatch*/] = useStateValue();

  useEffect(() => {
    const unsubscribe = (db.collection('rooms')
      .onSnapshot(snapshot => {
      return setRooms(snapshot.docs.map(doc => 
        ({
          id: doc.id,
          data: doc.data()
        })
      ))
      }));
    
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__header__right">
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
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search or Start a new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} addNewChat={room.data.name} name={room.data.name} id={room.id}/>
        ))}
      </div>
    </div>
  )
}
