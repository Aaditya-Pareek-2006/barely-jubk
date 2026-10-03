import { ShippingAddress } from './order';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: ShippingAddress[];
  savedPaymentMethods?: {
    id: string;
    type: 'Card' | 'UPI';
    label: string;
    last4?: string;
  }[];
  joinedDate: string;
  junkieTier: 'TRASH ROOKIE' | 'SNACK FIEND' | 'CERTIFIED TRASH LEGEND';
  junkPoints: number;
}
