import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import { Header } from './components/Header/Header';
import { Catalog } from './components/Catalog/Catalog';

import SignUp from './components/Auth/SignUp/SignUp';
import SignIn from './components/Auth/SignIn/SignIn';

import Main from './components/Main/Main';
import Profile from './components/Profile/Profile';
import CreateListing from './components/Catalog/CreateListing/CreateListing';
import CatalogCategory from './components/Catalog/CatalogCategory/CatalogCategory';
import SingleListing from './components/Catalog/SingleListing/SingleListing';

const App = () => {
	return (
		<>
			<AuthProvider>
				<Header />
				<Main>
					<Routes>
						<Route path="/auth/signin" element={<SignIn />} />
						<Route path="/auth/signup" element={<SignUp />} />

						<Route path="/" element={<Catalog />} />
						<Route path="/catalog/:category" element={<CatalogCategory />} />
						<Route path="/catalog/:category/:subcategory" element={<CatalogCategory />} />
						<Route path="/catalog/listing/:listingId" element={<SingleListing />} />
						<Route path="/listing/create" element={<CreateListing />} />

						<Route path="/profile/:uid" element={<Profile />} />
					</Routes>
				</Main>
			</AuthProvider>
		</>
	);
};

export default App;
