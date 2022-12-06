import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import db from "./firebase";
import './Chat.css'
import {Avatar} from "@mui/material";
import {MoreVert} from "@mui/icons-material";
import {Search} from "@mui/icons-material";
import {InsertEmoticon} from "@mui/icons-material";
import {Mic} from "@mui/icons-material";
import firebase from "firebase/compat/app";
import {useStateValue} from "./StateProvider";

function Chat(){
    const [input, setInput] = useState("");

    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");

    const [messages, setMessages] = useState([]);
    const [{user}] = useStateValue();

    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId).
            onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));

            db.collection('rooms').doc(roomId).
            collection('messages').orderBy('timestamp', 'asc').
            onSnapshot((snapshot) =>
                setMessages(snapshot.docs.map((doc) => doc.data()))
            )
        }
    }, [roomId]);

    const sendMessage = (evt)=>{
        evt.preventDefault();

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput('');
    };

    return(
        <div className="main_chat">
            <div className="chat_header">
                <Avatar className="chat_avatar"/>
                <h2>{roomName}</h2>
                <div className="chat_icons">
                    <Search className="chat_icon"/>
                    <MoreVert className="chat_icon"/>
                    <p>asd</p>
                    <p>baha</p>
                </div>
            </div>

            <div className="chat_body">
                {messages.map(message => (
                    <div className={`chat_message ${message.name === user.displayName && 'chat_receiver'}`}>
                        <span className="chat_name">
                            {message.name}
                        </span>
                        <p className="chat_">
                            {message.message}
                            <span className="chat_time">
                                {new Date (message.timestamp?.toDate()).toUTCString()}
                           </span>
                        </p>
                    </div>
                ))}
            </div>

            <div className="chat_footer">
                <InsertEmoticon className="chat_icon"/>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Введите сообщение"/>
                    <button onClick={sendMessage} type="submit"></button>
                </form>
                <Mic className="chat_icon"/>
            </div>
        </div>
    )
}

export default Chat;