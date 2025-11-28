import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { ReactNode, forwardRef } from "react";

interface RedButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode;
  variant?: "filled" | "outline";
  href?: string;
  className?: string;
  fullWidth?: boolean;
  showArrow?: boolean;
  type?: "button" | "submit" | "reset";
}

export const RedButton = forwardRef<HTMLButtonElement, RedButtonProps>(({ 
  children, 
  variant = "filled", 
  href, 
  onClick, 
  className = "",
  fullWidth = false,
  showArrow = false,
  type = "button",
  ...props
}, ref) => {
  const baseClasses = fullWidth ? "w-full" : "";
  
  const variantClasses = variant === "filled"
    ? "bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-semibold"
    : "border-[#D32F2F] text-[#D32F2F] hover:bg-[#D32F2F] hover:text-white font-semibold";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Если есть href, переходим по ссылке
    if (href && e && typeof e.preventDefault === 'function') {
      e.preventDefault();
      window.location.hash = href.replace('#', '');
    }
    
    // Вызываем родительский onClick если он есть
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button
      ref={ref}
      type={type}
      variant={variant === "filled" ? "default" : "outline"}
      className={`${baseClasses} ${variantClasses} ${className} ${showArrow ? 'group' : ''}`}
      onClick={href || onClick ? handleClick : undefined}
      {...props}
    >
      {children}
      {showArrow && (
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      )}
    </Button>
  );
});

RedButton.displayName = "RedButton";