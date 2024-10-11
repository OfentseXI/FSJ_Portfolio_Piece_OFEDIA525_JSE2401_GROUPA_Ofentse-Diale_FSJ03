'use client';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/login'); // Redirect after sign-out
  };

  return (
    <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded">
      Sign Out
    </button>
  );
};

export default SignOutButton;
