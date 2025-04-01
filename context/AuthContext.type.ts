// AuthContext.types.ts
export interface User {
    id: string;
    email: string;
    photo?: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    signInGoogle: () => Promise<boolean>;
    logOut: () => void;
  }
  
  export interface AuthContextProviderProps {
    children: React.ReactNode;
  }
  