import { UserProfile } from '../types/user';

export const MOCK_CURRENT_USER: UserProfile = {
  id: 'usr-junkie-001',
  name: 'Sehajdeep Singh',
  email: 'sehajdeep@barelyjunk.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  addresses: [
    {
      fullName: 'Sehajdeep Singh',
      email: 'sehajdeep@barelyjunk.com',
      phone: '+91 98765 43210',
      street: '42 Cyberpunk Enclave, Sector 62',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      landmark: 'Near Neon Tower',
    },
    {
      fullName: 'Sehajdeep (Work)',
      email: 'work@barelyjunk.com',
      phone: '+91 98765 43210',
      street: 'Suite 404, Tech Park, Phase 3',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002',
    }
  ],
  savedPaymentMethods: [
    { id: 'pm-1', type: 'UPI', label: 'sehajdeep@okicici' },
    { id: 'pm-2', type: 'Card', label: 'HDFC Credit Card', last4: '8842' }
  ],
  joinedDate: 'January 2026',
  junkieTier: 'CERTIFIED TRASH LEGEND',
  junkPoints: 1250,
};
