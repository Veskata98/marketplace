import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	createUserWithEmailAndPassword,
	updateProfile,
	signOut,
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FirebaseError } from 'firebase/app';
import { AuthContext } from '../contexts/AuthContext';
import { setDoc, doc } from 'firebase/firestore';

const googleProvider = new GoogleAuthProvider();

const useAuth = () => {
	const { saveUserToLocalStorage, removeUserFromLocalStorage } = useContext(AuthContext);

	const navigate = useNavigate();

	const basicSignIn = async (email: string, password: string) => {
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);

			await setDoc(doc(db, 'users', user.uid), {
				email,
				photoURL: user.photoURL,
				displayName: user.displayName,
			});

			saveUserToLocalStorage(user);

			navigate('/', { replace: true });
		} catch (error: unknown | FirebaseError) {
			if (error instanceof FirebaseError) {
				throw new Error(error.code);
			} else {
				throw new Error('An unknown error occurred!');
			}
		}
	};

	const googleSignIn = async () => {
		try {
			const { user } = await signInWithPopup(auth, googleProvider);

			await setDoc(doc(db, 'users', user.uid), {
				email: user.email,
				photoURL: user.photoURL,
				displayName: user.displayName,
			});

			saveUserToLocalStorage(user);

			navigate('/', { replace: true });
		} catch (error) {
			console.log(error);
		}
	};

	const basicSignUp = async (email: string, username: string, password: string) => {
		try {
			const { user } = await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(user, { displayName: username });

			await setDoc(doc(db, 'users', user.uid), {
				email,
				photoURL: user.photoURL,
				displayName: user.displayName,
			});

			saveUserToLocalStorage(user);

			navigate('/', { replace: true });
		} catch (error: unknown | FirebaseError) {
			if (error instanceof FirebaseError) {
				throw new Error(error.code);
			} else {
				throw new Error('An unknown error occurred!');
			}
		}
	};

	const basicSignOut = async () => {
		try {
			await signOut(auth);
			removeUserFromLocalStorage();
			navigate('/', { replace: true });
		} catch (error) {
			console.error(error);
		}
	};

	return {
		basicSignIn,
		googleSignIn,
		basicSignUp,
		basicSignOut,
	};
};

export default useAuth;
