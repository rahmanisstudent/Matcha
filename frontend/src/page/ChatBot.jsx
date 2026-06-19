import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, AlertTriangle } from 'lucide-react';

import { sendChatMessage } from '../services/api';

export default function ChatBot({ sessionId, agentState, setAgentState }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Halo! Saya adalah Mentor AI kamu. Bagaimana saya bisa membantumu membentuk jalur kariermu hari ini?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newHistory = [...chatHistory, { sender: 'user', text: message }];
    setChatHistory(newHistory);
    setMessage('');
    setIsLoading(true);
    
    try {
      const sid = sessionId || 'demo-session';

      const response = await sendChatMessage({ 
        session_id: sid, 
        user_input: message,
        agent_state: agentState
      });
      
      if (response.agent_state && setAgentState) {
        setAgentState(response.agent_state);
      }
      
      setChatHistory([...newHistory, { sender: 'bot', text: response.response || 'Saya mengerti! Saya di sini untuk membantumu mencapai tujuan kariermu.' }]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatHistory([...newHistory, { sender: 'bot', text: 'Maaf, terjadi kesalahan pada server.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end">
      
      {isOpen && (
        <div className="mb-3 w-[300px] sm:w-[320px] h-[380px] sm:h-[400px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#3fb067] to-[#8ccf32] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-bold text-sm">Mentor AI Matcha</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-md transition">
              <X className="w-4 h-4" />
            </button>
          </div>

          {agentState?.drift_detected && (
            <div className="bg-[#fff9ea] border-b border-[#fde8af] px-3 py-2 flex items-start gap-2 text-[11px] text-[#d68f11]">
              <AlertTriangle className="w-3.5 h-3.5 text-[#f8aa18] mt-0.5 flex-shrink-0 animate-bounce" />
              <div>
                <span className="font-bold">Arah Belajar Berubah?</span> Matcha mendeteksi pergeseran minat karir. Kamu bisa menganalisis ulang target karir baru di Dashboard.
              </div>
            </div>
          )}
          
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-gray-50">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`max-w-[80%] p-3 rounded-2xl text-sm ${chat.sender === 'user' ? 'bg-[#e5f8ec] text-gray-800 self-end rounded-br-sm' : 'bg-white border border-gray-100 text-gray-800 self-start rounded-bl-sm shadow-sm'}`}>
                {chat.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white border border-gray-100 text-gray-500 self-start rounded-bl-sm shadow-sm p-3 rounded-2xl text-sm italic">
                Sedang mengetik...
              </div>
            )}
          </div>
          
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tanya apa saja..." 
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#3fb067] transition"
            />
            <button type="submit" className="bg-[#3fb067] text-white p-2 rounded-full hover:bg-[#35a95b] transition flex-shrink-0">
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#1b5e3a] to-[#268a52] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(27,94,58,0.4)] hover:scale-105 transition-all duration-300 relative group ${isOpen ? 'rotate-90 scale-0 opacity-0 absolute' : 'rotate-0 scale-100 opacity-100'}`}
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#aee449]" />
        <span className="absolute w-full h-full rounded-full border border-[#aee449] animate-ping opacity-30"></span>
      </button>

    </div>
  );
}
