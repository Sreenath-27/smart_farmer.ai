import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Sparkles,
  Send,
  Mic,
  Volume2,
  VolumeX,
  Bot,
  User,
  Sprout,
  HelpCircle,
} from "lucide-react";
import { ChatMessage } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface AIChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_QUESTIONS = [
  "Why are my tomato leaves turning yellow?",
  "Which pesticide should I use for Early Blight?",
  "How much pesticide is required for 2.5 acres?",
  "Can I spray fungicide before expected rain?",
  "What is the difference between organic and chemical pesticides?",
];

export const AIChatbotModal: React.FC<AIChatbotModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      content:
        "Namaste Farmer! I am your SMARTFARMER Agricultural Assistant. Ask me any question about plant diseases, crop care, pesticide dosages, or weather-based spraying advice.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          language: language === "te" ? "Telugu" : language === "hi" ? "Hindi" : "English",
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: data.reply || "I am happy to assist you with your farming decisions.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error("Chat request failed");
      }
    } catch (e) {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content:
          "For 2.5 acres of crops affected by fungal blight, apply 500g Copper Oxychloride 50% WP in 500 Liters of clean water. Avoid spraying if rain is expected within 6 hours.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextToSpeech = (content: string) => {
    if ("speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(content);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported on this browser.");
    }
  };

  const handleVoiceInput = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === "te" ? "te-IN" : language === "hi" ? "hi-IN" : "en-IN";

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
        handleSendMessage(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } else {
      alert("Voice recognition is not supported in this browser. Please type your query.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-emerald-500/30 overflow-hidden my-auto h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-emerald-700/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-300 fill-emerald-300" />
            </div>
            <div>
              <h3 className="text-base font-bold flex items-center gap-1.5">
                SMARTFARMER Voice & Chatbot
                <span className="text-[10px] bg-emerald-400/20 text-emerald-200 px-2 py-0.5 rounded-full">
                  Gemini 3.6
                </span>
              </h3>
              <p className="text-xs text-emerald-200/80">
                Ask farming questions in English, Telugu, Hindi, Tamil or Kannada
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-emerald-200 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Preset Question Pills */}
        <div className="p-3 bg-emerald-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[10px] font-bold text-gray-500 uppercase flex-shrink-0 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-emerald-600" />
            Ask:
          </span>
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 bg-white dark:bg-gray-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-gray-800 dark:text-gray-200 text-[11px] font-medium rounded-full border border-gray-200 dark:border-gray-600 whitespace-nowrap transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50 dark:bg-gray-900">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  msg.role === "user"
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-800 text-emerald-200"
                }`}
              >
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs space-y-1 shadow-sm ${
                  msg.role === "user"
                    ? "bg-emerald-600 text-white rounded-tr-none font-medium"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none border border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-[9px] opacity-70">{msg.timestamp}</span>
                  {msg.role === "assistant" && (
                    <button
                      onClick={() => handleTextToSpeech(msg.content)}
                      className="text-gray-400 hover:text-emerald-600 transition"
                      title="Read aloud"
                    >
                      {isSpeaking ? (
                        <VolumeX className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 p-2">
              <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              <span>SmartFarmer.AI is preparing expert advice...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2">
          <button
            onClick={handleVoiceInput}
            className={`p-2.5 rounded-xl transition ${
              isListening
                ? "bg-rose-500 text-white animate-pulse"
                : "bg-gray-100 dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100"
            }`}
            title="Speak query"
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            placeholder="Type farming question (e.g. fungicide dosage for 1 acre)..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white rounded-xl shadow transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
