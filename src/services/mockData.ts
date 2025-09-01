// Mock data service for simulating API responses
export interface User {
  id: string;
  name: string;
  emailOrPhone: string;
  kycStatus: 'approved' | 'pending' | 'rejected';
}

export interface Wallet {
  currency: string;
  available: number;
}

export interface ActivityItem {
  id: string;
  type: 'cashback' | 'p2p_sent' | 'p2p_received' | 'qr_pay' | 'yield';
  amount: number;
  date: string;
  note: string;
  merchantName?: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

export interface QRPayload {
  type: 'merchant' | 'user';
  merchantName?: string;
  amount?: number;
  userId?: string;
}

export interface CashbackData {
  total: number;
  thisMonth: number;
}

export interface GrowthData {
  month: string;
  balance: number;
}

// Mock data
export const mockUser: User = {
  id: '1',
  name: 'Juan Pérez',
  emailOrPhone: 'juan@example.com',
  kycStatus: 'approved'
};

export const mockWallet: Wallet = {
  currency: 'USD',
  available: 2450.00
};

export const mockCashback: CashbackData = {
  total: 38.20,
  thisMonth: 9.10
};

export const mockGrowthData: GrowthData[] = [
  { month: 'M-4', balance: 200 },
  { month: 'M-3', balance: 215 },
  { month: 'M-2', balance: 230 },
  { month: 'M-1', balance: 240 },
  { month: 'M', balance: 250 }
];

export const mockActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'cashback',
    amount: 2.40,
    date: '2024-01-15',
    note: 'Cashback from coffee shop',
    merchantName: 'Starbucks'
  },
  {
    id: '2',
    type: 'p2p_sent',
    amount: -50.00,
    date: '2024-01-14',
    note: 'Payment to Maria'
  },
  {
    id: '3',
    type: 'p2p_received',
    amount: 25.00,
    date: '2024-01-13',
    note: 'Payment from Carlos'
  },
  {
    id: '4',
    type: 'qr_pay',
    amount: -15.50,
    date: '2024-01-12',
    note: 'QR payment',
    merchantName: 'Restaurant ABC'
  },
  {
    id: '5',
    type: 'yield',
    amount: 5.20,
    date: '2024-01-11',
    note: 'Monthly yield'
  }
];

export const mockContacts: Contact[] = [
  { id: '1', name: 'Maria García', phone: '+54 9 11 1234-5678' },
  { id: '2', name: 'Carlos López', phone: '+54 9 11 2345-6789' },
  { id: '3', name: 'Ana Martínez', phone: '+54 9 11 3456-7890' },
  { id: '4', name: 'Luis Rodríguez', phone: '+54 9 11 4567-8901' },
  { id: '5', name: 'Sofia Fernández', phone: '+54 9 11 5678-9012' }
];

// Mock API functions
export const mockAPI = {
  getUser: (): Promise<User> => Promise.resolve(mockUser),
  getWallet: (): Promise<Wallet> => Promise.resolve(mockWallet),
  getCashback: (): Promise<CashbackData> => Promise.resolve(mockCashback),
  getGrowthData: (): Promise<GrowthData[]> => Promise.resolve(mockGrowthData),
  getActivity: (): Promise<ActivityItem[]> => Promise.resolve(mockActivity),
  getContacts: (): Promise<Contact[]> => Promise.resolve(mockContacts),
  scanQR: (qrData: string): Promise<QRPayload> => {
    // Mock QR scanning
    return Promise.resolve({
      type: 'merchant',
      merchantName: 'Coffee Shop XYZ',
      amount: 12.50
    });
  },
  sendPayment: (contactId: string, amount: number, note: string): Promise<boolean> => {
    // Mock payment sending
    return Promise.resolve(true);
  },
  logout: (): Promise<void> => Promise.resolve()
};
