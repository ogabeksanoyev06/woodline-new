import { defineStore } from 'pinia';
import { useAxios } from '@/api/index';

export const useProfile = defineStore('profile', () => {
	const loading = ref(false);
	const userId = useCookie('userId');

	const getUser = async () => {
		try {
			let response = await useAxios().getRequest('/profile/me');
			return response.data;
		} catch (error) {
			console.log('error', error);
		}
	};
	const updateProfileUser = async (data) => {
		loading.value = true;
		try {
			let response = await useAxios().putRequest('/profile/update', data);
			return response.data;
		} catch (error) {
			console.log('error', error);
		} finally {
			loading.value = false;
		}
	};

	const postUserId = async (data) => {
		loading.value = true;
		try {
			let response = await useAxios().postRequest('/addresses', data);
			userId.value = response.data.address.id;
			return response.data;
		} catch (error) {
			console.log('error', error);
		} finally {
			loading.value = false;
		}
	};
	return { getUser, updateProfileUser, postUserId, loading };
});
