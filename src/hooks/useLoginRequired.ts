'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export function useLoginRequired() {
  const [showModal, setShowModal] = useState(false);
  const isGuest = useAuthStore((s) => s.isGuest);

  const requireLogin = (action: () => void) => {
    if (isGuest) {
      setShowModal(true);
    } else {
      action();
    }
  };

  return {
    requireLogin,
    showModal,
    setShowModal,
  };
}
