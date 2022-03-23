import React, {useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';

import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();
        history.push('/');
    }
    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File ([data], "userPhoto.jpg", {type: 'image/jpeg'})

    }
    useEffect(() => {
        if(!user) {
            history.push('/');
            return;
        }
    
    axios.get('https://api.chatengine.io/users/me', {
        headers: {
            "project-id" : "ae8470c3-679f-4482-81cd-aadf84c4dc0e",
            "user-name" : user.email,
            "user-secret" : user.uid,
        }
    })
    .then(() => {
        setLoading(false);
    })
    .catch(() => {
        let formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);

        getFile(user.photoURL)
        .then((avatar) => {
            formdata.append('avatar', avatar, avatar.name);

            axios.post('https://api.chatengine.io/users',
                 formdata,
                 {headers: {"private-key": "1c39a130-cfe0-45ee-a38f-05a08b64356c"} }           
            )
            .then(() => setLoading(false))
            .catch((error) => console.log(error))

        })
    })

    }, [user, history]);
    if(!user || loading) return 'Loading... Please wait';
    return (
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    Let's Chat
                </div>
                <div onClick={handleLogout}   className='logout-tab'>
                    Logout

                </div>

            </div>

            <ChatEngine
              height="calc(100vh - 66px)"
              projectID="ae8470c3-679f-4482-81cd-aadf84c4dc0e"
              userName={user.email}
              userSecret={user.uid}           
            />
        </div>
    )
}

export default Chats;
