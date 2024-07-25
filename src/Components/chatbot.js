import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const fetchResponse = async () => {
        try {
            const res = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-3.5-turbo", // or "gpt-4" depending on your plan
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant designed to resolve Health Queries."
                        },
                        { role: "user", content: prompt }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
                    }
                }
            );
            setResponse(res.data.choices[0].message.content);
        } catch (error) {
            console.error("Error fetching response:", error);
            setResponse("Sorry, I couldn't generate a response. Please try again.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchResponse();
    };

    return (
        <div>
            <h1>AI CHAT BOT</h1>
            <div className='user'>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter your Health Query"
                        style={{ borderRadius: "20px" }}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className='response'>
                <h1>AI Health Chatbot Response</h1>
                <h3>{response}</h3>
            </div>
        </div>
    );
};

export default Chatbot;
