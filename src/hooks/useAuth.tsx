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

export const useAuth = () => {
	const { saveUserToLocalStorage, removeUserFromLocalStorage } = useContext(AuthContext);

	const navigate = useNavigate();

	const basicSignIn = async (email: string, password: string) => {
		try {
			const result = await signInWithEmailAndPassword(auth, email, password);

			await setDoc(doc(db, 'users', result.user.uid), {
				email,
				photoURL: result.user.photoURL,
				displayName: result.user.displayName,
			});

			saveUserToLocalStorage(result.user);

			navigate('/', { replace: true });
		} catch (error: unknown | FirebaseError) {
			console.log(error);

			if (error instanceof FirebaseError) {
				throw new Error(error.code);
			} else {
				throw new Error('An unknown error occurred!');
			}
		}
	};

	const googleSignIn = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);

			await setDoc(doc(db, 'users', result.user.uid), {
				email: result.user.email,
				photoURL: result.user.photoURL,
				displayName: result.user.displayName,
			});

			saveUserToLocalStorage(result.user);

			navigate('/', { replace: true });
		} catch (error) {
			console.log(error);
		}
	};

	const basicSignUp = async (email: string, username: string, password: string) => {
		try {
			const result = await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(result.user, { displayName: username });

			await setDoc(doc(db, 'users', result.user.uid), {
				email,
				photoURL: result.user.photoURL,
				displayName: result.user.displayName,
			});

			saveUserToLocalStorage(result.user);

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
