import { X, Check, AlertCircle, Info } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  showLink?: boolean;
  linkHref?: string;
  linkText?: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export const Alert = ({
  variant = 'success',
  title,
  message,
  showLink = false,
  linkHref = '/',
  linkText = 'En savoir plus',
  onClose,
  autoClose = true,
  duration = 5000
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!isVisible) return null;

  const variantClasses = {
    success: {
      container: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
      icon: 'text-green-400 dark:text-green-500',
      link: 'text-green-700 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300'
    },
    error: {
      container: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
      icon: 'text-red-400 dark:text-red-500',
      link: 'text-red-700 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300'
    },
    warning: {
      container: 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
      icon: 'text-yellow-400 dark:text-yellow-500',
      link: 'text-yellow-700 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300'
    },
    info: {
      container: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
      icon: 'text-blue-400 dark:text-blue-500',
      link: 'text-blue-700 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'
    }
  };

  const icons = {
    success: <Check className="h-5 w-5" />,
    error: <X className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />
  };

  return (
    <div
      className={`fixed top-20 right-4 z-[9999] w-full max-w-md animate-slide-in ${variantClasses[variant].container} rounded-lg border p-4 shadow-lg transition-all duration-300`}
      role="alert"
    >
      {onClose && (
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className={`absolute right-3 top-3 ${variantClasses[variant].icon} hover:opacity-80 transition-opacity`}
          aria-label="Fermer l'alerte"
        >
          <X size={18} />
        </button>
      )}
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${variantClasses[variant].icon}`}>
          {icons[variant]}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="mt-1 text-sm">{message}</p>
          {showLink && (
            <div className="mt-2">
              <a
                href={linkHref}
                className={`text-sm font-medium hover:underline ${variantClasses[variant].link}`}
              >
                {linkText} →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
