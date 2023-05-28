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
import EditListing from './components/Catalog/EditListing/EditListing';
import NotFound from './components/NotFound/NotFound';
import { QueryClientProvider, QueryClient } from 'react-query';
import CatalogWrapper from './components/Catalog/CatalogWrapper/CatalogWrapper';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Header />
				<Main>
					<Routes>
						<Route path="/auth/signin" element={<SignIn />} />
						<Route path="/auth/signup" element={<SignUp />} />

						<Route path="/" element={<CatalogWrapper />} />
						<Route path="/catalog/:category" element={<CatalogCategory />} />
						<Route path="/catalog/:category/:subcategory" element={<CatalogCategory />} />
						<Route path="/catalog/:category/:subcategory/:listingId" element={<SingleListing />} />
						<Route path="/listing/create" element={<CreateListing />} />
						<Route path="/listing/:listingId/edit" element={<EditListing />} />

						<Route path="/profile/:uid" element={<Profile />} />
						<Route path="/profile/my-messages" element={<Profile />} />

						<Route path="/404" element={<NotFound />} />
					</Routes>
				</Main>
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default App;
