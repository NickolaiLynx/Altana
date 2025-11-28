import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, давал ли пользователь согласие на куки
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Показываем баннер через небольшую задержку для плавного появления
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-md md:max-w-2xl animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6 md:p-3">
        <button
          onClick={handleDecline}
          className="absolute right-4 top-4 md:right-3 md:top-3 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
          aria-label="Закрыть"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>

        <div className="pr-6 md:pr-8 md:flex md:items-center md:gap-6">
          <div className="md:flex-1">
            <h3 className="mb-3 md:mb-1 text-[18px] md:text-[15px] font-semibold text-gray-900">
              Мы используем файлы cookie
            </h3>
            <p className="text-gray-600 mb-4 md:mb-0 text-[14px] md:text-[13px] md:leading-tight">
              Этот сайт использует файлы cookie для улучшения работы и повышения эффективности сайта.{" "}
              <a 
                href="#/privacy" 
                className="text-[#D32F2F] hover:underline"
              >
                Политика конфиденциальности
              </a>
            </p>
          </div>

          <div className="flex gap-3 md:flex-shrink-0">
            <Button
              onClick={handleAccept}
              className="flex-1 md:flex-initial bg-[#D32F2F] hover:bg-[#B71C1C] md:h-9"
            >
              Принять
            </Button>
            <Button
              onClick={handleDecline}
              variant="outline"
              className="flex-1 md:flex-initial border-gray-300 hover:bg-gray-50 md:h-9"
            >
              Отклонить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
