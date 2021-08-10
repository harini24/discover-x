import React, { useState, useEffect } from "react";

export default function BotMessage({ fetchMessage }) {
    const [isLoading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // async function loadMessage() {
        // const msg = await fetchMessage();
        setLoading(false);
        setMessage(fetchMessage);
        // }
        // loadMessage();
    }, [fetchMessage]);

    return (
        <div className="message-container">
            <div className="bot-message">{isLoading ? "..." : message}</div>
        </div>
    );
}
