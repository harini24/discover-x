import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import airpods from './assets/airpods.PNG'
import BotMessage from "./components/BotMessage";
import UserMessage from "./components/UserMessage";
import Messages from "./components/Messages";
import Input from "./components/Input";
import io from "socket.io-client";
import API from "./ChatbotAPI";

import "./styles.css";
import Header from "./components/Header";


let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [avatar, setAvatar] = useState(false);

  useEffect(() => {
    getMessages();
  }, [messages.length]);

  useEffect(() => {
    setMessages([
      <BotMessage
        key="0"
        fetchMessage="Welcome to Rep Assist Bot!"
      />
    ]);
  }, []);

  const getMessages = () => {
    socket.on("message", msg => {
      //   let allMessages = messages;
      //   allMessages.push(msg);
      //   setMessages(allMessages);
      let ressppp = (
        <div>
          <div>(xxx) xxx-xxx : Rep Assist Bot</div>
          <hr />
          <div>{msg}
          </div>
        </div>
      )
      setMessages([...messages, <BotMessage
        key="0"
        fetchMessage={ressppp}
      />]);
    });
  };


  const sendPromo = (
    <div className='rootCnt'>
      This customer is using the apple Iphone 12 pro device. Below is the latest promotion for apple devices.
      <div className="detailsCont">
        <div className="detailsTitle">
          Airpods with charging Case (2nd Gen)
        </div>
        <div className="detailCont">
          <div >
            <img src={airpods} className="promoImg" />
          </div>
          <div className="promoDeatils">
            <div>Accessory of the month - $30 off Airpods</div>
            <div>
              <span>Retail Price: </span>
              <span>$159.99</span>
            </div>
            <div>
              <span>effective date: </span>
              <span>5/8/21 - 5/31/21</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="detailBtn" onClick={() => { send("send offer via SMS") }}>Send Offer via SMS</button>
      </div>
    </div>
  )

  const sendOffer = (
    <div className='rootCnt'>
      Success! Below promotion has been sent to the MDN (789) 456-7895
      <div className="detailsCont">
        <div className="detailsTitle">
          Accessory of the month - $30 off AirPods
        </div>
        <div className="detailCont">
          <div >
            <img src={airpods} className="promoImg" />
          </div>
          <div className="promoDeatils">
            <div>Get 30% off on Airpods. Offer effective till May 31st.</div>
          </div>
        </div>
      </div>
      <div>
        <button className="detailBtn" onClick={() => { send("click here to send promotion") }}>click here</button>
      </div>
    </div>
  )

  const send = async text => {
    let msg;
    if (text == 'send latest promotion') {
      msg = sendPromo
      const newMessages = messages.concat(
        <UserMessage key={messages.length + 1} text={text} />,
        <BotMessage
          key={messages.length + 2}
          fetchMessage={msg}
        />
      );

      setMessages(newMessages);
    } else if (text == 'send offer via SMS') {
      msg = sendOffer
      const newMessages = messages.concat(
        <UserMessage key={messages.length + 1} text={text} />,
        <BotMessage
          key={messages.length + 2}
          fetchMessage={msg}
        />
      );

      setMessages(newMessages);
    } else if (text == 'click here to send promotion') {
      let respp = (
        <div>
          <div>Rep Assist Bot : (xxx) xxx-xxx</div>
          <hr />
          <div>Accessory of the month - $30 off AirPods. Get 30% off on Airpods. Offer effective till Aug 31st.
          </div>
        </div>
      )
      const newMessages = messages.concat(

        <UserMessage key={messages.length + 1} text={respp} />
      );

      setMessages(newMessages);
    } else {
      // console.log("in else")
      // console.log(messages)
      // console.log(messages.length)
      // const fetchMsg = async () => await API.GetWelcomeText(text)
      // msg = await fetchMsg()
      const fetchMsg = async () => await API.GetChatbotResponse(text)
      let resppp = (
        <div>
          <div>Rep Assist Bot : (xxx) xxx-xxx</div>
          <hr />
          <div>{text}
          </div>
        </div>
      )
      const newMessages = messages.concat(
        <UserMessage key={messages.length + 1} text={resppp} />
      );

      setMessages(newMessages);
    }

    console.log(messages)
  };

  return (
    <div className="dispCont">
      <div className="chatbot">
        <Header value={avatar} setValue={setAvatar} />
        <Messages messages={messages} />
        <Input onSend={send} />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Chatbot />, rootElement);
