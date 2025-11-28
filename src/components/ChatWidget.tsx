import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Здравствуйте! Я AI-ассистент кадрового агентства Алтана. Чем могу помочь?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && inputValue.trim() && !isLoading && isOpen) {
      e.preventDefault();
      // Create synthetic FormEvent for handleSendMessage
      const formEvent = new Event('submit', { bubbles: true, cancelable: true }) as unknown as React.FormEvent;
      handleSendMessage(formEvent);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // ============================================================
    // 🔌 ТОЧКА ИНТЕГРАЦИИ С N8N API
    // ============================================================
    // Здесь нужно подключить твой n8n webhook/API endpoint
    // 
    // Пример интеграции:
    // 
    // try {
    //   const response = await fetch('https://your-n8n-instance.com/webhook/chat', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       message: userMessage.text,
    //       sessionId: getSessionId(), // Опционально: для сохранения контекста
    //       timestamp: userMessage.timestamp,
    //     }),
    //   });
    //
    //   const data = await response.json();
    //   
    //   const botMessage: Message = {
    //     id: Date.now().toString() + '-bot',
    //     text: data.response || data.message, // Адаптируй под структуру ответа n8n
    //     sender: "bot",
    //     timestamp: new Date(),
    //   };
    //
    //   setMessages((prev) => [...prev, botMessage]);
    // } catch (error) {
    //   console.error('Chat API error:', error);
    //   
    //   const errorMessage: Message = {
    //     id: Date.now().toString() + '-error',
    //     text: "Извините, произошла ошибка. Попробуйте еще раз или свяжитесь с нами по телефону.",
    //     sender: "bot",
    //     timestamp: new Date(),
    //   };
    //   
    //   setMessages((prev) => [...prev, errorMessage]);
    // } finally {
    //   setIsLoading(false);
    // }
    // ============================================================

    // Временная заглушка для демонстрации (удали после подключения API)
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString() + "-bot",
        text: "Спасибо за ваше сообщение! Я обрабатываю ваш запрос. В production версии здесь будет ответ от AI-агента через n8n.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // Функция для получения/создания уникального ID сессии (опционально)
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem("chatSessionId");
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem("chatSessionId", sessionId);
    }
    return sessionId;
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div ref={chatRef} className="fixed bottom-24 right-4 md:right-6 w-[90vw] max-w-[380px] h-[500px] rounded-2xl shadow-2xl flex flex-col z-[100] animate-in slide-in-from-bottom-4 duration-300 overflow-hidden">
          {/* Header */}
          <div className="bg-[#101828] text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">AI-ассистент Алтана</h3>
                <p className="text-xs text-white/80">Обычно отвечает мгновенно</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-white hover:bg-transparent hover:border hover:border-white hover:scale-95 transition-all duration-200 h-10 w-10"
              aria-label="Закрыть чат"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-white">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      message.sender === "user"
                        ? "bg-[#D32F2F] text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-900 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-white/70"
                          : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString("ru-RU", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animate-bounce-delay-0" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animate-bounce-delay-150" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animate-bounce-delay-300" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="px-6 py-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Напишите сообщение..."
                disabled={isLoading}
                className="flex-1 h-10"
              />
              <Button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="bg-[#D32F2F] hover:bg-[#B71C1C] h-10 w-10 p-0 flex-shrink-0"
                aria-label="Отправить сообщение"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Работает на базе AI-агента
            </p>
          </form>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-4 md:right-6 w-16 h-16 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-full shadow-lg flex items-center justify-center z-[100] transition-all duration-300 hover:scale-110 animate-chat-pulse"
          aria-label="Открыть чат"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}
    </>
  );
}
