import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { ChildrenProps } from '../types';
import { AuthContext } from './AuthContext';
import { getMessageNotifications } from '../api/messages';
import { useQuery } from 'react-query';

export const NotificationContext = createContext({
	notifications: 0,
	notificationCountReduce: () => {},
});

export const NotificationProvider = ({ children }: ChildrenProps) => {
	const { user } = useContext(AuthContext);
	const [notifications, setNotifications] = useState(0);

	const { data, refetch } = useQuery(['notifications'], () => getMessageNotifications(user?.uid), {
		refetchInterval: 1 * 60 * 1000,
		enabled: Boolean(user?.uid),
	});

	useEffect(() => {
		if (user) {
			refetch();
			setNotifications(data || 0);
		}
	}, [user, data, refetch]);

	const notificationCountReduce = useCallback(() => {
		setNotifications((count) => (count - 1 >= 0 ? count - 1 : 0));
	}, []);

	return (
		<NotificationContext.Provider value={{ notifications, notificationCountReduce }}>
			{children}
		</NotificationContext.Provider>
	);
};
