import moment from 'moment';

/* eslint-disable no-useless-computed-key */
export const scrollToBottom = () => {
	window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });
};

export const formatTimeToReadableString = (time: string | number) => {
	return moment(time).format('h:mm:ss, DD MMMM YYYY');
};

export const formatTimeToRelative = (time: string | number) => {
	return moment(time).fromNow();
};
