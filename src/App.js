import React,{useState} from 'react'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'
import './App.css'

import { ChannelListContainer, ChannelContainer, Auth } from './components';

const cookies = new Cookies();

const apiKey = '7tsd8pzpgtvr';
const authToken = cookies.get('token');

const client = StreamChat.getInstance(apiKey);

if(authToken) {
  client.connectUser({
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      id: cookies.get('userId'),
      phoneNumber: cookies.get('phoneNumber'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
  }, authToken)
}

const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if(!authToken) return <Auth />

  return (
    <div className='app__wrapper'>
        <Chat client={client} theme='team light'>
            <ChannelListContainer
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
            />
            <ChannelContainer 
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              createType={createType}
            />
        </Chat>
    </div>
  )
}

export default App