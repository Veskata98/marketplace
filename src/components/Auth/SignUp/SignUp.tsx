import { FormEvent, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { AuthErrorCodes } from 'firebase/auth';
import Spinner from '../../Spinner/Spinner';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const [error, setError] = useState('');

	const { basicSignUp, googleSignIn } = useAuth();

	const inputHandler = (e: any) => {
		switch (e.target.name) {
			case 'email':
				setEmail(e.target.value);
				break;
			case 'username':
				setUsername(e.target.value);
				break;
			case 'password':
				setPassword(e.target.value);
				break;
			case 'repeat-password':
				setRepeatPassword(e.target.value);
				break;
			default:
				break;
		}
	};

	const signUpHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		if (password !== repeatPassword) {
			setError('Password do not match.');
			setIsLoading(false);
			return;
		}

		try {
			await basicSignUp(email, username, password);
		} catch (error: any) {
			setPassword('');
			setRepeatPassword('');

			if (error.message === AuthErrorCodes.EMAIL_EXISTS) {
				setError('The email address is already in use.');
			} else if (error.message === AuthErrorCodes.INVALID_EMAIL) {
				setError('The email address is not valid.');
			} else if (error.message === AuthErrorCodes.WEAK_PASSWORD) {
				setError('The password is too weak.');
			} else {
				setError('An unknown error occurred!');
			}
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center bg-slate-200 w-max m-auto p-8 rounded-lg shadow-lg relative border-orange-300 border">
			{isLoading && (
				<div className="absolute bg-slate-200 bg-opacity-80 w-full h-full">
					<Spinner />
				</div>
			)}

			<h2 className="text-2xl font-semibold text-gray-800">Sign Up</h2>
			{error && <div className="mt-4 p-2 mb-2 bg-red-200 text-red-700 rounded-md text-center">{error}</div>}
			<form className="flex flex-col gap-2" onSubmit={(e) => signUpHandler(e)}>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					className="border p-1 w-80 border-gray-400 focus-visible:outline-none"
					value={email}
					onChange={inputHandler}
					required
				/>

				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					className="border p-1 w-80 border-gray-400 focus-visible:outline-none"
					value={username}
					onChange={inputHandler}
					required
				/>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					autoComplete="new-password"
					className="border p-1 w-80 border-gray-400 focus-visible:outline-none"
					value={password}
					onChange={inputHandler}
					required
				/>

				<label htmlFor="repeat-password">Repeat Password</label>
				<input
					type="password"
					name="repeat-password"
					autoComplete="new-password"
					className="border p-1 w-80 border-gray-400 focus-visible:outline-none"
					value={repeatPassword}
					onChange={inputHandler}
					required
				/>

				<button className="p-2 bg-orange-300 w-60 m-auto mt-4 hover:text-gray-600 rounded-md font-semibold">
					Sign Up
				</button>
			</form>
			<hr className="w-80 border-gray-400 my-4" />
			<p className="text-gray-800 font-semibold mb-2">Or sign in with</p>
			<button
				onClick={googleSignIn}
				className="flex items-center gap-2 justify-center font-semibold p-1 hover:text-gray-800 rounded-md">
				<FcGoogle className="text-2xl" />
			</button>
			<span className="absolute bottom-0">
				Already have account?{' '}
				<Link to="/auth/signin" className="hover:text-orange-500 hover:underline hover:italic">
					Sign In here
				</Link>
			</span>
		</div>
	);
};

export default SignUp;
