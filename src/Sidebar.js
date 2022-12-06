import React, {useEffect, useState} from "react";
import './Sidebar.css'
import SidebarChat from "./SidebarChat";
import {Avatar} from "@mui/material";
import {DonutLarge} from "@mui/icons-material";
import {Chat} from "@mui/icons-material";
import {MoreVert} from "@mui/icons-material";
import {Search} from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import db from "./firebase";

function Sidebar(){
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot) =>
            setRooms(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        );

        return () => {
            unsubscribe();
        }

    }, [])

    return(
        <div className="sidebar">
            <div className="header">
                <Avatar className="icon"/>
                <div className="icons">
                    <DonutLarge className="icon"/>
                    <Chat className="icon"/>
                    <MoreVert className="icon"/>
                </div>
            </div>
            <div className="search" id="search">
                <Search className="search_icon" id="search_icon"/>
                <ArrowBackIcon className="arrow" id="arrow"/>
                <input placeholder="Поиск или новый чат"/>
            </div>
            <div className="chat">
                <SidebarChat addNewChat/>
                {rooms.map(room => (<SidebarChat id={room.id} name={room.data.name}/>))}
            </div>
        </div>
    )
}

export default Sidebar;