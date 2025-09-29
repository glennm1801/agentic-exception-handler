import { Amplify } from 'aws-amplify';
import { getCurrentUser, signIn, signOut, AuthUser, confirmSignIn, updatePassword } from 'aws-amplify/auth';

// Configure Amplify - these should be set via environment variables
const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID || 'us-east-1_XXXXXXXXX',
      userPoolClientId: import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID || 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
      region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
    }
  }
};

Amplify.configure(amplifyConfig);

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface SignInResult {
  user?: AuthUser;
  nextStep?: {
    signInStep: string;
    missingAttributes?: string[];
  };
}

export const authService = {
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (error) {
      return null;
    }
  },

  async signIn(username: string, password: string): Promise<SignInResult> {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    
    if (isSignedIn) {
      const user = await getCurrentUser();
      return { user };
    }
    
    return { nextStep };
  },

  async confirmNewPassword(newPassword: string): Promise<AuthUser> {
    const { isSignedIn } = await confirmSignIn({ challengeResponse: newPassword });
    
    if (isSignedIn) {
      return await getCurrentUser();
    }
    
    throw new Error('Password confirmation failed');
  },

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await updatePassword({ oldPassword, newPassword });
  },

  async signOut(): Promise<void> {
    await signOut();
  }
};