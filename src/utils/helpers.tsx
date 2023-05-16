/* eslint-disable no-useless-computed-key */
export const scrollToBottom = () => {
	window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });
};
