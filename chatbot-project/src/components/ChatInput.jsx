import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import LoadingSpinner from '../assets/loading-spinner.gif'
import './ChatInput.css'
import dayjs from 'dayjs';

function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const time = dayjs(dayjs().valueOf()).format('HH:mm');

    function saveInputText(e) {
        setInputText(e.target.value);
    }

    async function sendMessage() {
        if (!inputText || isLoading) return;

        setIsLoading(true);
        // react update ui after the code ends so here the value of inputText is still accessable
        setInputText('');

        const newChatMessages = [
            ...chatMessages,
            {
                id: crypto.randomUUID(),
                sender: "user",
                message: inputText,
                time: time
            }
        ]

        setChatMessages(newChatMessages);

        setChatMessages([
            ...newChatMessages,
            {
                id: crypto.randomUUID(),
                sender: "robot",
                message: <img
                    className="loading-spinner"
                    src={LoadingSpinner}
                />,
            }
        ]);

        const response = await Chatbot.getResponseAsync(inputText);

        setChatMessages([
            ...newChatMessages,
            {
                id: crypto.randomUUID(),
                sender: "robot",
                message: response,
                time: time
            }]);

        setIsLoading(false);
    }

    function clearMessage() {
        setChatMessages([]);
    }

    function handleKeyDown(e) {
        e.key === "Enter" && sendMessage();
        e.key === "Escape" && setInputText("");
    }

    return (
        <div className="chat-input-container">
            <input
                className="chat-input"
                placeholder="Send a message to Chatbot"
                size="30"
                onChange={saveInputText}
                value={inputText}
                onKeyDown={handleKeyDown}
            />
            <button
                className="button send-button"
                onClick={sendMessage}
            >Send</button>
            <button
                className="button clear-button"
                onClick={clearMessage}
            >Clear</button>
        </div>
    );
}

export default ChatInput;