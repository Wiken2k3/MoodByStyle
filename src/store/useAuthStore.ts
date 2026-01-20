import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: string[];
  createdAt: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: string;
  likedTracks: string[];
  playlists: Playlist[];
}

// Demo account
const DEMO_ACCOUNT: UserAccount = {
  id: 'user_demo_001',
  name: 'Demo User',
  email: 'demo@example.com',
  password: 'demo123',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo@example.com',
  createdAt: new Date().toISOString(),
  likedTracks: [],
  playlists: [],
};

interface AuthState {
  accounts: UserAccount[];
  user: UserAccount | null;
  isGuest: boolean;
  isLoading: boolean;
  error: string | null;

  // Auth Actions
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  updateProfile: (name: string, avatar?: string) => Promise<boolean>;
  
  // Guest Mode
  setGuestMode: (isGuest: boolean) => void;

  // Liked Tracks
  toggleLikeTrack: (trackId: string) => void;
  isLiked: (trackId: string) => boolean;
  
  // Playlists
  createPlaylist: (name: string, description: string) => Playlist;
  deletePlaylist: (playlistId: string) => void;
  addTrackToPlaylist: (playlistId: string, trackId: string) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accounts: [DEMO_ACCOUNT],
      user: null,
      isGuest: true,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        await new Promise((resolve) => setTimeout(resolve, 800));

        const account = get().accounts.find(
          (acc) => acc.email === email && acc.password === password
        );

        if (!account) {
          set({
            isLoading: false,
            error: 'Invalid email or password',
          });
          return false;
        }

        set({ user: account, isGuest: false, isLoading: false });
        return true;
      },

      signup: async (name, email, password) => {
        set({ isLoading: true, error: null });
        await new Promise((resolve) => setTimeout(resolve, 1200));

        if (!name || !email || !password) {
          set({ isLoading: false, error: 'All fields are required' });
          return false;
        }

        if (password.length < 6) {
          set({ isLoading: false, error: 'Password must be at least 6 characters' });
          return false;
        }

        // Check if email already exists
        const emailExists = get().accounts.some((acc) => acc.email === email);
        if (emailExists) {
          set({ isLoading: false, error: 'Email already registered' });
          return false;
        }

        const newAccount: UserAccount = {
          id: `user_${Date.now()}`,
          name,
          email,
          password,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          createdAt: new Date().toISOString(),
          likedTracks: [],
          playlists: [],
        };

        set((state) => ({
          accounts: [...state.accounts, newAccount],
          user: newAccount,
          isGuest: false,
          isLoading: false,
        }));

        return true;
      },

      logout: () => set({ user: null, isGuest: true }),

      clearError: () => set({ error: null }),

      updateProfile: async (name, avatar) => {
        set({ isLoading: true, error: null });
        await new Promise((resolve) => setTimeout(resolve, 600));

        const currentUser = get().user;
        if (!currentUser) {
          set({ isLoading: false, error: 'Not logged in' });
          return false;
        }

        const updatedUser: UserAccount = {
          ...currentUser,
          name,
          avatar: avatar || currentUser.avatar,
        };

        set((state) => ({
          user: updatedUser,
          accounts: state.accounts.map((acc) =>
            acc.id === currentUser.id ? updatedUser : acc
          ),
          isLoading: false,
        }));

        return true;
      },

      setGuestMode: (isGuest) => set({ isGuest }),

      toggleLikeTrack: (trackId) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const isLiked = currentUser.likedTracks.includes(trackId);
        const updatedUser: UserAccount = {
          ...currentUser,
          likedTracks: isLiked
            ? currentUser.likedTracks.filter((id) => id !== trackId)
            : [...currentUser.likedTracks, trackId],
        };

        set((state) => ({
          user: updatedUser,
          accounts: state.accounts.map((acc) =>
            acc.id === currentUser.id ? updatedUser : acc
          ),
        }));
      },

      isLiked: (trackId) => {
        const currentUser = get().user;
        if (!currentUser) return false;
        return currentUser.likedTracks.includes(trackId);
      },

      createPlaylist: (name, description) => {
        const currentUser = get().user;
        if (!currentUser) {
          throw new Error('Not logged in');
        }

        const newPlaylist: Playlist = {
          id: `playlist_${Date.now()}`,
          name,
          description,
          tracks: [],
          createdAt: new Date().toISOString(),
        };

        const updatedUser: UserAccount = {
          ...currentUser,
          playlists: [...currentUser.playlists, newPlaylist],
        };

        set((state) => ({
          user: updatedUser,
          accounts: state.accounts.map((acc) =>
            acc.id === currentUser.id ? updatedUser : acc
          ),
        }));

        return newPlaylist;
      },

      deletePlaylist: (playlistId) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const updatedUser: UserAccount = {
          ...currentUser,
          playlists: currentUser.playlists.filter((p) => p.id !== playlistId),
        };

        set((state) => ({
          user: updatedUser,
          accounts: state.accounts.map((acc) =>
            acc.id === currentUser.id ? updatedUser : acc
          ),
        }));
      },

      addTrackToPlaylist: (playlistId, trackId) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const updatedUser: UserAccount = {
          ...currentUser,
          playlists: currentUser.playlists.map((p) =>
            p.id === playlistId && !p.tracks.includes(trackId)
              ? { ...p, tracks: [...p.tracks, trackId] }
              : p
          ),
        };

        set((state) => ({
          user: updatedUser,
          accounts: state.accounts.map((acc) =>
            acc.id === currentUser.id ? updatedUser : acc
          ),
        }));
      },

      removeTrackFromPlaylist: (playlistId, trackId) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const updatedUser: UserAccount = {
          ...currentUser,
          playlists: currentUser.playlists.map((p) =>
            p.id === playlistId
              ? { ...p, tracks: p.tracks.filter((id) => id !== trackId) }
              : p
          ),
        };

        set((state) => ({
          user: updatedUser,
          accounts: state.accounts.map((acc) =>
            acc.id === currentUser.id ? updatedUser : acc
          ),
        }));
      },
    }),
    {
      name: 'spotify-auth-storage',
      storage: createJSONStorage(() => localStorage),
      // Ensure demo account is always available
      merge: (persistedState: any, currentState: AuthState) => {
        const merged = { ...currentState, ...persistedState };
        // Ensure demo account exists
        const hasDemoAccount = merged.accounts.some(
          (acc: UserAccount) => acc.email === DEMO_ACCOUNT.email
        );
        if (!hasDemoAccount) {
          merged.accounts.unshift(DEMO_ACCOUNT);
        }
        return merged;
      },
    }
  )
);
