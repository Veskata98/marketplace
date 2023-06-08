import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { db, storage } from '../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

const useProfile = () => {
	const { user, changeAvatarInLocalStorage } = useContext(AuthContext);

	const changeAvatar = async (newAvatar: File) => {
		if (!user) return;

		const storageRef = ref(storage, `${user.uid}/avatar/${user.uid}`);
		const uploadedImage = await uploadBytes(storageRef, newAvatar);

		const url = await getDownloadURL(uploadedImage.ref);

		await updateDoc(doc(db, 'users', user.uid), { photoURL: url });
		changeAvatarInLocalStorage(url);
	};

	return { changeAvatar };
};

export default useProfile;
