import { atom, AtomEffect } from 'recoil';


export type AccountFormState = {
  stripeId?: string;
  stripeCustomerId?: string;
  membershipId?: string;
  profession?: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  photo?: string;
  phone?: string;
  password: string;
  products: string[];
  sales?: number;
  online: boolean;
  lastActiveAt?: string;
  accountType: 'admin' | 'mod' | 'seller' | 'buyer';
  companyRegisterationNumber?: string;
  gender: 'male' | 'female';
  verified: boolean;
  status: 'active' | 'pending' | 'inActive' | 'suspended' | 'refused';
  rejectReason?: string;
  idVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
  lang: string;
  currency: string;
  phoneVerified: boolean;
  ips: string[];
  birthDate: string;

  // Control
  currentStep: number;
  isFormSubmitting: boolean;
};
export const formStepState = atom<number>({
    key: 'formStepState',
    default: 0,
  });
  export const defaultAccountFormState: AccountFormState = {
    stripeId: undefined,
    stripeCustomerId: undefined,
    membershipId: undefined,
    profession: '',
    firstName: '',
    lastName: '',
    gender: 'male', 
    birthDate: '',
    accountType: 'seller',
  
    email: '',
    emailVerified: false,
    photo: '',
    phone: '',
    password: '',
    products: [],
    sales: 0,
    online: false,
    lastActiveAt: '',
    companyRegisterationNumber: '',
    verified: false,
    status: 'pending',
    rejectReason: '',
    idVerified: false,
    createdAt: '',
    updatedAt: '',
    lang: 'en',
    currency: 'usd',
    phoneVerified: false,
    ips: [],
  
    // Control
    currentStep: 0,
    isFormSubmitting: false,
  };
  

const loggerEffect: AtomEffect<AccountFormState> = ({ onSet }) => {
    onSet((newVal, oldVal) => {
      if (process.env.NODE_ENV === 'development') {
        console.group(`[Recoil Logger] accountFormState`);
        console.log('Previous State:', oldVal);
        console.log('Next State:', newVal);
        console.groupEnd();
      }
    });
  };
  

  export const accountFormState = atom<AccountFormState>({
    key: 'accountFormState',
    default: defaultAccountFormState,
    effects_UNSTABLE: [loggerEffect],
  });
  
