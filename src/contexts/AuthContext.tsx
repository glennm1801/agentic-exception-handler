import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthUser } from 'aws-amplify/auth';
import { authService, AuthState, SignInResult } from '@/lib/auth';

interface AuthContextType extends AuthState {
  signIn: (username: string, password: string) => Promise<SignInResult>;
  signOut: () => Promise<void>;
  confirmNewPassword: (newPassword: string) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  challengeStep: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [challengeStep, setChallengeStep] = useState<string | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      setIsLoading(true);
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (username: string, password: string): Promise<SignInResult> => {
    try {
      const result = await authService.signIn(username, password);
      
      if (result.user) {
        setUser(result.user);
        setChallengeStep(null);
      } else if (result.nextStep) {
        setChallengeStep(result.nextStep.signInStep);
      }
      
      return result;
    } catch (error) {
      setChallengeStep(null);
      throw error;
    }
  };

  const confirmNewPassword = async (newPassword: string) => {
    try {
      const user = await authService.confirmNewPassword(newPassword);
      setUser(user);
      setChallengeStep(null);
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      await authService.changePassword(oldPassword, newPassword);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setChallengeStep(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    signIn,
    signOut,
    confirmNewPassword,
    changePassword,
    challengeStep,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};