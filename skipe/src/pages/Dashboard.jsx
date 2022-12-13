import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import ListUser from "../components/ListUser";
import {useEffect, useState} from "react";
import useBackendMessage from "../Hook/useBackendMessage";
import useGetUserList from "../Hook/useGetUserList";


export default function Dashboard(props) {
    const [messageInfo, setMessageInfo] = useState("");
    const [userFor, setUserFor] = useState();
    const [userList, setUserList] = useState([]);
    const [allMessages, setAllMessages] = useState([
        {from: 32, content:"Hello comment vas tu ?", channel:31.32},
        {from: 33, content:"Hello comment vas tu ?", channel:31.33},
        {from: 34, content:"Hello comment vas tu ?", channel:31.34},
        {from: 35, content:"Hello comment vas tu ?", channel:31.35},
        {from: 36, content:"Hello comment vas tu ?", channel:31.36},
        {from: 37, content:"Hello comment vas tu ?", channel:31.37},
        {from: 38, content:"Hello comment vas tu ?", channel:31.38},
        {from: 39, content:"Hello comment vas tu ?", channel:31.39},
        {from: 40, content:"Hello comment vas tu ?", channel:31.40},
    ]);
    const [channel, setChannel] = useState("");

    const backendMessage = useBackendMessage();
    const getUserList = useGetUserList();

    const handleContent = (e) => {
        setMessageInfo(e.target.value)
    }

    const handleMessage = (e) => {
        const data = JSON.parse(e.data)
        setAllMessages(previousMessages => [...previousMessages, {from: data.message.from, content:data.message.content, channel:data.message.channel}])
        console.log(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let messageContent = messageInfo;
        setAllMessages(previousMessages => [...previousMessages, {from: props.loggedUser.user_id, content:messageContent, channel:channel}])
        backendMessage(messageContent, userFor, props.loggedUser.user_id, channel).then(data => console.log(data));
        setMessageInfo('')
    }

    useEffect(() => {
        if(userFor < props.loggedUser.user_id){
            setChannel(userFor + "." + props.loggedUser.user_id);
        } else {
            setChannel(props.loggedUser.user_id + "." + userFor);
        };
    }, [userFor])

    useEffect(() => {
        getUserList().then(data => setUserList(data.users));

        const url = new URL('http://localhost:9090/.well-known/mercure');
        url.searchParams.append('topic', 'https://example.com/my-private-topic');

        const eventSource = new EventSource(url, {withCredentials: true});
        eventSource.onmessage = handleMessage;

        return () => {
            eventSource.close()
        }

    }, [])

    return (
        <div className="dashboard-container">
            <ListUser setUserFor={setUserFor} userList={userList}/>
            <div className="page-dashboard">
                <div className="conv">
                    {allMessages.map((message) => (
                        message.channel == channel?
                            message.from == props.loggedUser.user_id ?
                            <div className="me">
                                <span>{message.content}</span>
                            </div>
                            :
                            message.from == userFor ?
                            <div>
                                <span>{message.content}</span>
                            </div>
                            :
                            <></>
                        :
                        <></>
                    ))}
                </div>
                <div className="bottom-control">
                    <input type="text" placeholder="Type a message here..." onChange={handleContent} value={messageInfo}/>
                    <button onClick={handleSubmit} >
                        <PaperAirplaneIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}