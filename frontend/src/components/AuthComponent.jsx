import React, { useState, useEffect } from 'react';
import { authClient } from '../lib/auth-client';
import SignupModal from './SignupModal';

const AuthComponent = () => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentSession = await authClient.getSession();
        setSession(currentSession?.data || null);
      } catch (error) {
        console.error('Error checking session:', error);
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for session changes
    const unsubscribe = authClient.useSession.subscribe((newSession) => {
      setSession(newSession?.data || null);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    // For now, keep the simple prompt approach, but you could also create a SignInModal
    try {
      const email = prompt('Enter your email:');
      const password = prompt('Enter your password:');

      if (email && password) {
        await authClient.signIn.email({
          email,
          password,
          callbackURL: '/', // Redirect after sign in
        });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      alert('Sign in failed: ' + error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {session ? (
        <>
          <span>Welcome, {session.user?.name || session.user?.email}!</span>
          <button
            onClick={handleSignOut}
            style={{
              padding: '5px 10px',
              backgroundColor: '#00ff41',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleSignIn}
            style={{
              padding: '5px 10px',
              backgroundColor: '#00ff41',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '5px'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => setShowSignupModal(true)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#00ff41',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
        </>
      )}

      {/* Signup Modal */}
      <SignupModal
        open={showSignupModal}
        onClose={() => setShowSignupModal(false)}
      />
    </div>
  );
};

export default AuthComponent;