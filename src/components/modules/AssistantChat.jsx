import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User, RefreshCw } from 'lucide-react';
import { QUICK_PROMPTS, generateAstroMedResponse } from '../../utils/medicalKnowledge';

export default function AssistantChat({ astronaut, environment, riskReport }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      time: '14:28:12',
      text: `Hello ${astronaut.name}. I am **AstroMed AI**, your onboard orbital medical flight surgeon assistant. I am continuously monitoring your biometrics, cabin atmosphere, and fatigue indices. How can I assist you with your health today?`,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      time: timeStr,
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateAstroMedResponse(
        text,
        astronaut.vitals,
        astronaut.fatigue,
        environment,
        riskReport
      );

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        text: responseText,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderFormattedText = (rawText) => {
    return rawText.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-sm font-bold text-cyan-300 mt-2 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return (
          <div key={idx} className="flex items-start space-x-1.5 text-xs text-slate-300 ml-2 my-0.5">
            <span className="text-cyan-400">•</span>
            <span>{line.substring(2)}</span>
          </div>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={idx} className="text-xs text-slate-300 ml-2 my-0.5 font-medium">
            {line}
          </div>
        );
      }
      return (
        <p key={idx} className="text-xs text-slate-300 my-1 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="hud-panel rounded-2xl p-4 sm:p-5 flex flex-col h-[520px]">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-3 shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold tracking-wide text-white uppercase flex items-center space-x-2">
              <span>AstroMed AI Health Assistant</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                SURGEON-LLM
              </span>
            </h2>
            <p className="text-xs text-slate-400">Interactive Spaceflight Clinical Diagnostics</p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'welcome_reset',
                sender: 'assistant',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                text: `Session refreshed. Active astronaut: **${astronaut.name}**. Real-time vitals synchronized. How can I help?`,
              },
            ])
          }
          className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
          title="Reset chat session"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-2 overflow-x-auto pb-2 mb-2 shrink-0 scrollbar-thin">
        <span className="text-[10px] font-mono uppercase text-slate-500 shrink-0 flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>SUGGESTED:</span>
        </span>
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-cyan-950/50 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${msg.sender === 'user' ? 'bg-slate-800 border-slate-700 text-cyan-300' : 'bg-cyan-950/60 border-cyan-500/40 text-cyan-400'}`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed border ${msg.sender === 'user' ? 'bg-cyan-950/40 border-cyan-500/30 text-white' : 'bg-slate-900/80 border-slate-800 text-slate-200'}`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-1">
                <span className="font-bold uppercase text-slate-400">
                  {msg.sender === 'user' ? astronaut.name : 'AstroMed Diagnostic Engine'}
                </span>
                <span>{msg.time}</span>
              </div>
              <div>{renderFormattedText(msg.text)}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono ml-9 p-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>AstroMed analyzing biometric correlations...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="shrink-0 flex items-center space-x-2 pt-2 border-t border-slate-800/80">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask AstroMed about vitals, space symptoms, or protocols..."
          className="flex-1 bg-slate-950/80 border border-slate-800 focus:border-cyan-500/60 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim()}
          className="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:hover:bg-cyan-600 text-white transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
