// store/accountSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AccountFormState {
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
}

const initialState: AccountFormState = {
  stripeId: undefined,
  stripeCustomerId: undefined,
  membershipId: undefined,
  profession: '',
  firstName: '',
  lastName: '',
  email: '',
  emailVerified: false,
  photo: '',
  phone: '',
  password: '',
  products: [],
  sales: 0,
  online: false,
  lastActiveAt: '',
  accountType: 'seller',
  companyRegisterationNumber: '',
  gender: 'male',
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
  birthDate: '',

  // control
  currentStep: 0,
  isFormSubmitting: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountField<K extends keyof AccountFormState>(
      state,
      action: PayloadAction<{ field: K; value: AccountFormState[K] }>
    ) {
      const { field, value } = action.payload;
      state[field] = value;
    },
    updateAccountFields(state, action: PayloadAction<Partial<AccountFormState>>) {
      Object.assign(state, action.payload);
    },
    nextStep(state) {
      state.currentStep += 1;
    },
    prevStep(state) {
      state.currentStep = Math.max(state.currentStep - 1, 0);
    },
    setStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    setFormSubmitting(state, action: PayloadAction<boolean>) {
      state.isFormSubmitting = action.payload;
    },
    resetAccount(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setAccountField,
  updateAccountFields,
  nextStep,
  prevStep,
  setStep,
  setFormSubmitting,
  resetAccount,
} = accountSlice.actions;

export default accountSlice.reducer;
