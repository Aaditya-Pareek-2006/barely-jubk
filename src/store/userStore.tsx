import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../types/user';
import { userService } from '../services/userService';

interface UserContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name:string,email:string,password:string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    return userService.getCurrentUser();
  });
  useEffect(()=>{void userService.restoreSession().then(setUser);},[]);

  const login = async (email: string,password:string) => {
    const updated = await userService.login(email,password);setUser(updated);
  };

  const register=async(name:string,email:string,password:string)=>{const created=await userService.register(name,email,password);setUser(created);};

  const logout = () => {
    userService.logoutUser();
    setUser(null);
  };

  const updateProfile = async (profile: Partial<UserProfile>) => {
    const updated = await userService.updateUserProfile(profile);setUser(updated);
  };

  return (
      <UserContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserStore = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserStore must be used within UserProvider');
  }
  return context;
};
