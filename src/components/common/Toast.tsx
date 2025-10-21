import React, { useState, useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ErrorIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const WarningIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Toast: React.FC<ToastProps> = ({ message, type, duration = 5000, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      
      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 50);

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  const typeStyles = {
    success: {
      bg: 'bg-gradient-to-r from-green-500/90 to-emerald-500/90',
      icon: <CheckIcon />,
      progressBg: 'bg-green-300'
    },
    error: {
      bg: 'bg-gradient-to-r from-red-500/90 to-rose-500/90',
      icon: <ErrorIcon />,
      progressBg: 'bg-red-300'
    },
    warning: {
      bg: 'bg-gradient-to-r from-yellow-500/90 to-orange-500/90',
      icon: <WarningIcon />,
      progressBg: 'bg-yellow-300'
    },
    info: {
      bg: 'bg-gradient-to-r from-blue-500/90 to-cyan-500/90',
      icon: <InfoIcon />,
      progressBg: 'bg-blue-300'
    }
  };

  const style = typeStyles[type];

  return (
    <div
      className={`relative max-w-md w-full backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/20 ${
        isExiting
          ? 'animate-[slide-out-right_0.3s_ease-in-out_forwards]'
          : 'animate-[slide-in-right_0.3s_ease-in-out_forwards]'
      } ${style.bg}`}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <div
          className={`h-full transition-all duration-100 ${style.progressBg}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-4 flex items-start gap-3">
        <div className="flex-shrink-0 text-white mt-0.5">
          {style.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white leading-relaxed">
            {message}
          </p>
        </div>

        <button
          onClick={handleClose}
          className="flex-shrink-0 text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          aria-label="Fermer"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default Toast;






