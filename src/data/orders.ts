import { Order } from '../types/order';
import { PRODUCTS } from './products';

export const MOCK_ORDERS: Order[] = [
  {
    id: 'BJ-2026-8941',
    createdAt: '2026-09-24T14:32:00Z',
    items: [
      {
        id: 'makhana-01-default',
        product: PRODUCTS[0],
        quantity: 2,
        selectedWeight: '80g',
      },
      {
        id: 'chips-01-default',
        product: PRODUCTS[5],
        quantity: 3,
        selectedWeight: '120g',
      },
      {
        id: 'cookie-01-default',
        product: PRODUCTS[16],
        quantity: 1,
        selectedWeight: '150g',
      }
    ],
    subtotal: 1044,
    discount: 104,
    shippingFee: 0,
    total: 940,
    status: 'OUT FOR DELIVERY',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    shippingAddress: {
      fullName: 'Sehajdeep Singh',
      email: 'sehajdeep@barelyjunk.com',
      phone: '+91 98765 43210',
      street: '42 Cyberpunk Enclave, Sector 62',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      landmark: 'Near Neon Tower',
    },
    estimatedDelivery: 'Today, by 6:00 PM',
    trackingNumber: 'DEL-BJ-9948271',
    timeline: [
      { status: 'ORDER PLACED', date: 'Sep 24, 02:32 PM', completed: true, notes: 'Order verified & payment processed' },
      { status: 'PACKED', date: 'Sep 24, 05:15 PM', completed: true, notes: 'Sealed in Barely Junk Eco-Pouch' },
      { status: 'SHIPPED', date: 'Sep 25, 09:00 AM', completed: true, notes: 'Dispatched via Express Delivery' },
      { status: 'OUT FOR DELIVERY', date: 'Sep 26, 08:30 AM', completed: true, notes: 'Rider is on the way with your snacks!' },
      { status: 'DELIVERED', date: 'Pending', completed: false }
    ]
  },
  {
    id: 'BJ-2026-7812',
    createdAt: '2026-09-18T11:20:00Z',
    items: [
      {
        id: 'popcorn-01-default',
        product: PRODUCTS[11],
        quantity: 2,
        selectedWeight: '140g',
      },
      {
        id: 'trail-01-default',
        product: PRODUCTS[21],
        quantity: 1,
        selectedWeight: '180g',
      }
    ],
    subtotal: 787,
    discount: 50,
    shippingFee: 49,
    total: 786,
    status: 'DELIVERED',
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    shippingAddress: {
      fullName: 'Sehajdeep Singh',
      email: 'sehajdeep@barelyjunk.com',
      phone: '+91 98765 43210',
      street: '42 Cyberpunk Enclave, Sector 62',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
    },
    estimatedDelivery: 'Sep 20, 2026',
    trackingNumber: 'DEL-BJ-8831049',
    timeline: [
      { status: 'ORDER PLACED', date: 'Sep 18, 11:20 AM', completed: true },
      { status: 'PACKED', date: 'Sep 18, 03:00 PM', completed: true },
      { status: 'SHIPPED', date: 'Sep 19, 10:00 AM', completed: true },
      { status: 'OUT FOR DELIVERY', date: 'Sep 20, 09:00 AM', completed: true },
      { status: 'DELIVERED', date: 'Sep 20, 02:15 PM', completed: true, notes: 'Handed to customer' }
    ]
  }
];
