import React from "react";
import './Login.css';
import {WhatsApp} from "@mui/icons-material";
import {Button} from "@mui/material";
import {auth, provider} from "./firebase";
import {useStateValue} from "./StateProvider";
import {actionType} from "./reducer";

function Login(){
    const [{}, dispatch] = useStateValue();

    const signIn = ()=> {
        auth.signInWithPopup(provider).then(
            (result) => {
                dispatch({
                   type: actionType.SET_USER,
                   user: result.user
                });
            })
            .catch((error) => alert(error.message));
    };

    return(
        <div className="login">
            <div className="login_container">
                <WhatsApp style={{ fontSize: 260 }}/>
                <div className="login_text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button type="submit" onClick={signIn} className="login_button">
                    Sign in
                </Button>
            </div>
        </div>
    );
}

export default Login;