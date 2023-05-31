import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import { Header } from './components/Header/Header';
import CatalogWrapper from './components/Catalog/CatalogWrapper/CatalogWrapper';

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
import { ReactQueryDevtools } from 'react-query/devtools';
import Inbox from './components/Profile/Inbox/Inbox';
import SingleMessage from './components/Profile/Inbox/SingleMessage/SingelMessage';
import { NotificationProvider } from './contexts/NotificationContext';

const queryClient = new QueryClient({
	defaultOptions: { queries: { staleTime: 5 * 60 * 1000, refetchOnWindowFocus: false } },
});

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<NotificationProvider>
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
							<Route path="/messages" element={<Inbox />} />
							<Route path="/messages/:messageId" element={<SingleMessage />} />

							<Route path="/404" element={<NotFound />} />
						</Routes>
					</Main>
				</NotificationProvider>
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;
