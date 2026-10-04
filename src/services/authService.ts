import { apiRequest } from './api';

export const authService={
  requestPasswordReset:(email:string)=>apiRequest<{message:string}>('/auth/forgot-password',{method:'POST',body:JSON.stringify({email})}),
  resetPassword:(token:string,password:string)=>apiRequest<{message:string}>('/auth/reset-password',{method:'POST',body:JSON.stringify({token,password})}),
};
