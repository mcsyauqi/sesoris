'use client';

import { create } from 'zustand';

interface UIState {
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  isAnnouncementVisible: boolean;

  // Actions
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  hideAnnouncement: () => void;
  showAnnouncement: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  isSearchOpen: false,
  isMobileMenuOpen: false,
  isAnnouncementVisible: true,

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set({ isSearchOpen: !get().isSearchOpen }),

  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set({ isMobileMenuOpen: !get().isMobileMenuOpen }),

  hideAnnouncement: () => set({ isAnnouncementVisible: false }),
  showAnnouncement: () => set({ isAnnouncementVisible: true }),
}));
