import { useEffect, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import useMessage from '../../../../hooks/useMessage';
import { getMessage } from '../../../../api/messages';
import { NotificationContext } from '../../../../contexts/NotificationContext';

const SingleMessage = () => {
	const { messageId } = useParams();
	const queryClient = useQueryClient();

	const { notificationCountReduce } = useContext(NotificationContext);
	const { setMessageAsSeen } = useMessage();

	const { data } = useQuery(['message', messageId], () => getMessage(messageId!));

	const { mutate } = useMutation(() => setMessageAsSeen(data!), {
		onSuccess: () => {
			queryClient.invalidateQueries(['message', messageId]);
		},
	});

	useEffect(() => {
		if (data && !data.isReceived) {
			mutate();
			notificationCountReduce();
		}
	}, [data, mutate, notificationCountReduce]);

	return <div>{messageId}</div>;
};

export default SingleMessage;
