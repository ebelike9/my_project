import { useEffect, useState } from 'react'

import './App.css'
import { StreamChat } from "stream-chat";
import { ChannelList, Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import { EmojiPicker } from "stream-chat-react/emojis";
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

      // const channel = chatclient.channel("messaging", "travel", {
      //   name: "Awesome channel about traveling",
      //   members: ["james"],
      // });
      // await channel.watch();

      setChannel(channel);
      setclient(chatclient);
    }
    connect();

    if (client) return () => {
      client.disconnect();
    }
  }, [])

  const filters = {
    members: {
      $in: [
        "james",
      ]
    }, type: "messaging"
  };
  const options = { presence: true, state: true };
  const sort = { last_message_at: -1 };

  if (!client) {
    return <div>Loading...</div>
  }
  return (
    <Chat client={client}>
      <ChannelList sort={sort} filters={filters} options={options} />
      <Channel EmojiPicker={EmojiPicker}>
        <Window>
          <ChannelHeader />
          <MessageList  />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  )
}

export default App
