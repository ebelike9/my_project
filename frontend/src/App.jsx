import { useEffect, useState } from 'react'

import './App.css'
import { StreamChat } from "stream-chat";
import { ChannelList, Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

function App() {
  const [client, setclient] = useState(null)
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const connect = async () => {
      const chatclient = StreamChat.getInstance("xs5sfxysfyey");
      await chatclient.connectUser(
        {
          id: "james",
          name: "will james",
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        chatclient.devToken("james"),
      );

      const channel = chatclient.channel("messaging", "travel", {
        name: "Awesome channel about traveling",
        members: ["james"],
      });
      await channel.watch();

      setChannel(channel);
      setclient(chatclient);
    }
    connect();

    if (client ) return () => {
      client.disconnect();
    }
  }, [])

  if (!client) {
    return <div>Loading...</div>
  }
  return (
    <Chat client={client}>
      <ChannelList  />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  )
}

export default App
