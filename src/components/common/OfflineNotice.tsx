import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineNotice: React.FC = () => {
  const [isOffline, setIsOffline] = useState(() => {
    return typeof navigator !== 'undefined' ? !navigator.onLine : false;
  });

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <aside
      aria-label="Aviso de conexión"
      className="bg-amber-500 text-white px-4 py-2 text-xs font-heading font-bold flex items-center justify-center gap-2 shadow-sm animate-fadeIn"
    >
      <WifiOff className="w-3.5 h-3.5 flex-shrink-0" />
      <span>
        Modo sin conexión activo: Puedes seguir jugando con normalidad. Tus estrellas y avances se guardan automáticamente en este dispositivo.
      </span>
    </aside>
  );
};
