import { FormEvent, useState } from 'react';

import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [error, setError] = useState('');

	const { basicSignIn, googleSignIn } = useAuth();

	const inputHandler = (e: any) => {
		switch (e.target.name) {
			case 'email':
				setEmail(e.target.value);
				break;
			case 'password':
				setPassword(e.target.value);
				break;
			default:
				break;
		}
	};

	const signInHandler = async (e: FormEvent) => {
		e.preventDefault();

		try {
			await basicSignIn(email, password);
		} catch (error: any) {
			setError('Incorrect email or password. Please try again');
		}
	};

	return (
		<div className="flex flex-col items-center justify-center bg-slate-200 w-max m-auto p-8 rounded-lg shadow-lg relative border-orange-300 border">
			<h2 className="text-2xl font-semibold text-gray-800">Sign In</h2>
			{error && <div className="mt-4 p-2 mb-2 bg-red-200 text-red-700 rounded-md text-center">{error}</div>}
			<form className="flex flex-col gap-2" onSubmit={(e) => signInHandler(e)}>
				<label htmlFor="email" className="text-gray-800">
					Email
				</label>
				<input
					type="email"
					name="email"
					className="border p-1 w-80 border-gray-400 focus-visible:outline-none"
					value={email}
					onChange={inputHandler}
					required
				/>

				<label htmlFor="password" className="text-gray-800">
					Password
				</label>
				<input
					type="password"
					name="password"
					autoComplete="new-password"
					className="border p-1 w-80 border-gray-400 focus-visible:outline-none"
					value={password}
					onChange={inputHandler}
					required
				/>
				<button className="p-2 bg-orange-300 w-60 m-auto mt-4 hover:text-gray-800 rounded-md font-semibold">
					Sign In
				</button>
			</form>
			<hr className="w-80 border-gray-400 my-4" />
			<p className="text-gray-800 font-semibold mb-2">Or sign in with</p>
			<button
				onClick={googleSignIn}
				className="flex items-center gap-2 justify-center font-semibold p-1 hover:text-gray-800 rounded-md">
				<FcGoogle className="text-2xl" />
			</button>
			<span className="absolute bottom-0 right-2">
				Don't have an account?{' '}
				<Link to="/auth/signup" className="hover:text-orange-300 underline">
					Sign Up here
				</Link>
			</span>
		</div>
	);
};

export default SignIn;
