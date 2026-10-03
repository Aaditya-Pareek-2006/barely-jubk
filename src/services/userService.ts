import { UserProfile } from '../types/user';
import { apiRequest, setAccessToken, getAccessToken } from './api';

export const userService = {
  getCurrentUser: (): UserProfile | null => {
    if(!getAccessToken())return null;
    try { const stored=localStorage.getItem('barely_junk_user'); return stored?JSON.parse(stored):null; } catch { return null; }
  },

  async login(email:string,password:string):Promise<UserProfile>{
    const result=await apiRequest<{user:UserProfile;token:string}>('/auth/login',{method:'POST',body:JSON.stringify({email,password})});
    setAccessToken(result.token);localStorage.setItem('barely_junk_user',JSON.stringify(result.user));return result.user;
  },

  async register(name:string,email:string,password:string):Promise<UserProfile>{
    const result=await apiRequest<{user:UserProfile;token:string}>('/auth/register',{method:'POST',body:JSON.stringify({name,email,password})});
    setAccessToken(result.token);localStorage.setItem('barely_junk_user',JSON.stringify(result.user));return result.user;
  },

  async restoreSession():Promise<UserProfile|null>{
    if(!getAccessToken())return null;
    try{const {user}=await apiRequest<{user:UserProfile}>('/auth/me');localStorage.setItem('barely_junk_user',JSON.stringify(user));return user;}
    catch{setAccessToken(null);localStorage.removeItem('barely_junk_user');return null;}
  },

  updateUserProfile: async (profile: Partial<UserProfile>): Promise<UserProfile> => {
    const {user}=await apiRequest<{user:UserProfile}>('/auth/me',{method:'PATCH',body:JSON.stringify(profile)});
    localStorage.setItem('barely_junk_user',JSON.stringify(user));return user;
  },

  logoutUser: (): void => {
    try {
      localStorage.removeItem('barely_junk_user');setAccessToken(null);
    } catch (e) {
      console.error('Failed to logout', e);
    }
  }
};
