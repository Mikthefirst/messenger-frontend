import "./mainPage.css";

function formatDateFromTimestamp(timestamp) {
    let date;
    try {
        date = new Date().parse(timestamp);
    }
    catch (err) {
        date = new Date(timestamp);
    }
    return date.toLocaleString();
}

function PrechatItem({ room, onClick }) {
    return (<div className="prechat-item" onClick={onClick}>
        <img src={room.image_id ? `path/to/images/${room.image_id}` : "https://via.placeholder.com/40"} alt={room.room_name} />
        <div>
            <div className="top-message-cont">
                <p className="name">{room.title}</p>
                <p className="time">{formatDateFromTimestamp(room.last_time)}</p>
            </div>
            <p className="message">{room.last_message_data}</p>
        </div>
    </div>);
}

export default PrechatItem;