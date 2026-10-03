const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';
const TOKEN_KEY = 'barely_junk_access_token';

export function getAccessToken() { return localStorage.getItem(TOKEN_KEY); }
export function setAccessToken(token: string | null) { if(token) localStorage.setItem(TOKEN_KEY,token); else localStorage.removeItem(TOKEN_KEY); }

export async function apiRequest<T>(path:string,init:RequestInit={}):Promise<T>{
  const token=getAccessToken();
  const response=await fetch(`${API_BASE}${path}`,{...init,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`} : {}),...init.headers}});
  const payload=await response.json().catch(()=>({}));
  if(!response.ok)throw new Error(payload.error||`Request failed (${response.status})`);
  return payload as T;
}

