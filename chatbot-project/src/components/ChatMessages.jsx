import { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import './ChatMessages.css'

function useAutoScroll(dependencies) {
    const containerRef = useRef(null);

    useEffect(() => {
        const containerElem = containerRef.current;

        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight
        }
    }, [dependencies]);

    return containerRef;
}

function ChatMessages({ chatMessages }) {
    const chatMessageRef = useAutoScroll(chatMessages);

    return (
        <div
            className="chat-messages-container"
            ref={chatMessageRef}
        >
            {
                chatMessages.length === 0
                    ?
                    <p className="welcome-text">
                        Welcome to the chatbot project! Send a message using the textbox below!
                    </p>
                    :
                    chatMessages.map((chatMessage) => {
                        return (
                            <ChatMessage
                                key={chatMessage.id}
                                sender={chatMessage.sender}
                                message={chatMessage.message}
                                time={chatMessage.time}
                            />
                        )
                    })
            }
        </div>
    );
}

export default ChatMessages;