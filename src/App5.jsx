import { useEffect, useRef, useState } from "react";
import {Chatbot} from 'supersimpledev';
import userImg from './assets/user.png';
import robotImg from './assets/robot.png';

const loader=<svg fill="#198754" className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>;

function Message({ message, time, sender, isLoading }) {
    return (
        <div className={`flex gap-3 ${(sender === "robot") ? "justify-start" : "justify-end"}`}>
            {sender === "robot" && <img className="rounded-full h-11.25 w-11.25" src={robotImg} alt="" />}
            <div className="rounded-lg px-4 py-2.5 bg-neutral-200 max-w-80 leading-[1.2] flex flex-col gap-1.5">
                <p>{message}</p>
                {(!isLoading)?<p className="text-neutral-500 text-[12px]">{time}</p>:""}
            </div>
            {sender === "user" && <img className="rounded-full h-11.25 w-11.25" src={userImg} alt="" />}
        </div>
    );
}

function InputContainer({ inputText, setInputText, messages, setMessages, isLoading, setIsLoading}) {
    async function handleSend() {
        if (inputText.trim() !== "" && !isLoading) {
            const newMessages = [...messages, {
                message: inputText,
                sender: "user",
                time: (new Date()).toLocaleTimeString('en-US',{ hour12: true, hour: '2-digit', minute: '2-digit' }),
                isLoading: false,
                id: crypto.randomUUID()
            }];
            setMessages(newMessages);
            setInputText("");
            setMessages([...newMessages, {
                message: loader,
                sender: "robot",
                time: undefined,
                isLoading: true,
                id: crypto.randomUUID()
            }]);
            setIsLoading(true);
            const response = await Chatbot.getResponseAsync(inputText);
            setIsLoading(false);
            setMessages([...newMessages, {
                message: response,
                sender: "robot",
                time: (new Date()).toLocaleTimeString('en-US',{ hour12: true, hour: '2-digit', minute: '2-digit' }),
                isLoading: false,
                id: crypto.randomUUID()
            }]);
        }
    }
    function handleKeyDown(e) {
        if (e.key === "Enter" && !isLoading) handleSend(e);
        if (e.key === "Escape") setInputText("");
    }
    function handleClear(){
        setMessages([]);
    }
    return (
        <div className="flex gap-2.5">
            <input className="px-4 flex-1" type="text" placeholder="Send a message to Chatbot"
                onChange={(e) => { setInputText(e.target.value) }}
                onKeyDown={handleKeyDown}
                value={inputText}
            />
            <button className="btn btn-primary" onClick={handleSend}>Send</button>
            <button className="btn btn-secondary" onClick={handleClear}>Clear</button>
        </div>
    );
}

function MessagesContainer({ messages , chatBoxPos}) {
    const messagesContainerRef = useRef(null);
    useEffect(()=>{
        messagesContainerRef.current.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
            behaviour: "smooth"
        });
    },[messages]);
    return (
        <div className="flex grow flex-col gap-3 overflow-y-auto scrollbar-none"
            ref={messagesContainerRef}
        >
            {(messages.length===0)?
            <p className="text-center text-neutral-500">Welcome to the chatbot project! Send a message using the textbox {(chatBoxPos==="top")?"above":"below"}.</p>
            :""}
            {messages.map((el) => {
                return (<Message message={el.message} sender={el.sender} time={el.time} isLoading={el.isLoading} key={el.id} />);
            })}
        </div>
    );
}

function App() {
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState((localStorage.getItem("messages")) ? JSON.parse(localStorage.getItem("messages")):[]);
    const [isLoading, setIsLoading] = useState(false);
    const [chatBoxPos, setChatBoxPos] = useState("top");
    useEffect(()=>{
        if(!isLoading) localStorage.setItem("messages",JSON.stringify(messages));
    },[messages,isLoading]);

    function handlePosition(){
        if(chatBoxPos==="top") setChatBoxPos("bottom");
        else setChatBoxPos("top");
    }

    return (
        <div className="w-full h-dvh max-w-160 mx-auto p-5 flex flex-col gap-5">
            <div className={`flex grow ${(chatBoxPos==="top") ? "flex-col" : "flex-col-reverse"} gap-5`}>
                <InputContainer inputText={inputText} setInputText={setInputText} messages={messages} setMessages={setMessages} isLoading={isLoading} setIsLoading={setIsLoading} />
                <MessagesContainer messages={messages} chatBoxPos={chatBoxPos}/>
            </div>
            <button className="self-center underline cursor-pointer text-[#198754]" onClick={handlePosition}>Move textbox to {(chatBoxPos==="top")?"bottom":"top"}</button>
        </div>
    );
}

export default App;