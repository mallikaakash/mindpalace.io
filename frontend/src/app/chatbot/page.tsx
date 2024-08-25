'use client';
import { useState } from 'react';
import axios from 'axios';

interface  Message {
  text: string;
  isBot: boolean;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setMessages(prev => [...prev, { text: prompt, isBot: false }]);

    try {
      const response = await axios.post('http://localhost:8000/complete', { prompt },
        {
          headers: {
            'Content-Type': 'application/json'  // Specify the content type
          }
        }
      );
      const botReply = response.data.data.trim();
      setMessages(prev => [...prev, { text: botReply, isBot: true }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: "Sorry, I encountered an error.", isBot: true }]);
    } finally {
      setIsLoading(false);
      setPrompt('');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Chat with LLaMa</h1>
        <div className="mb-8">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.isBot ? 'text-blue-500' : 'text-green-500'}`}>
              <strong>{message.isBot ? 'Bot: ' : 'You: '}</strong>{message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-grow p-2 border rounded-l"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-2 rounded-r"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </main>
  );
}