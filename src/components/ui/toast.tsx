'use client';

import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  onClose: (id: string) => void;
}

export function Toast({
  id,
  type,
  message,
  action,
  duration = 4000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 200);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: 'bg-[#28A745] text-white',
    error: 'bg-[#DC3545] text-white',
    warning: 'bg-[#FFC107] text-[#212529]',
    info: 'bg-[#17A2B8] text-white',
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transition-all duration-200',
        colors[type],
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-medium flex-grow">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="text-sm font-semibold hover:underline"
        >
          {action.label}
        </button>
      )}
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose(id), 200);
        }}
        className="p-1 hover:opacity-80 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Toast Container and Hook
interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

let toastListeners: ((toasts: ToastItem[]) => void)[] = [];
let toasts: ToastItem[] = [];

function notifyListeners() {
  toastListeners.forEach((listener) => listener([...toasts]));
}

export const toast = {
  success: (message: string, action?: ToastItem['action']) => {
    const id = Date.now().toString();
    toasts = [...toasts, { id, type: 'success', message, action }];
    notifyListeners();
    return id;
  },
  error: (message: string, action?: ToastItem['action']) => {
    const id = Date.now().toString();
    toasts = [...toasts, { id, type: 'error', message, action }];
    notifyListeners();
    return id;
  },
  warning: (message: string, action?: ToastItem['action']) => {
    const id = Date.now().toString();
    toasts = [...toasts, { id, type: 'warning', message, action }];
    notifyListeners();
    return id;
  },
  info: (message: string, action?: ToastItem['action']) => {
    const id = Date.now().toString();
    toasts = [...toasts, { id, type: 'info', message, action }];
    notifyListeners();
    return id;
  },
  dismiss: (id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
    notifyListeners();
  },
};

export function ToastContainer() {
  const [toastList, setToastList] = useState<ToastItem[]>([]);

  useEffect(() => {
    toastListeners.push(setToastList);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== setToastList);
    };
  }, []);

  const handleClose = (id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
    notifyListeners();
  };

  if (toastList.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toastList.map((t) => (
        <Toast key={t.id} {...t} onClose={handleClose} />
      ))}
    </div>
  );
}
