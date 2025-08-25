import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.jpg'
import './ChatMessage.css'


function ChatMessage({ message, sender, time }) {
    return (
        <div className={sender === 'user' ? "chat-message chat-message-user" : "chat-message chat-message-robot"}>
            {sender === "robot" && (
                <img src={RobotProfileImage} width="50" />
            )}
            {message}
            <p className={sender === "robot" ? "time-robot" : "time-user"}>{time}</p>
            {sender === "user" && (
                <img src={UserProfileImage} width="50" />
            )}
        </div>
    )
}

export default ChatMessage;