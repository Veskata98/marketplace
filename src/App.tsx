import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Catalog } from './components/Catalog/Catalog';

import SignUp from './components/Auth/SignUp/SignUp';
import SignIn from './components/Auth/SignIn/SignIn';

import Main from './components/Main/Main';
import Profile from './components/Profile/Profile';
import CreateListing from './components/Listings/CreateListing/CreateListing';

const App = () => {
	return (
		<>
			<AuthProvider>
				<Header />
				<Main>
					<Routes>
						<Route path="/auth/signin" element={<SignIn />} />
						<Route path="/auth/signup" element={<SignUp />} />

						<Route path="/" element={<Home />} />
						<Route path="/catalog" element={<Catalog />} />
						<Route path="/create/listing" element={<CreateListing />} />

						<Route path="/profile/:uid" element={<Profile />} />
					</Routes>
				</Main>
			</AuthProvider>
		</>
	);
};

export default App;
