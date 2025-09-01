export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  OTPVerification: {
    emailOrPhone: string;
    type: 'email' | 'phone';
  };
  CreatePassword: {
    emailOrPhone: string;
    type: 'email' | 'phone';
    otpCode: string;
  };
  DocumentVerification: {
    emailOrPhone: string;
    type: 'email' | 'phone';
  };
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  OTPVerification: {
    emailOrPhone: string;
    type: 'email' | 'phone';
  };
  CreatePassword: {
    emailOrPhone: string;
    type: 'email' | 'phone';
    otpCode: string;
  };
  DocumentVerification: {
    emailOrPhone: string;
    type: 'email' | 'phone';
  };
};

