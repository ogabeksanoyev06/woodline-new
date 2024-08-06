import { defineStore } from 'pinia';
import { useAxios } from '@/api/index';

export const useOrderStore = defineStore('order', () => {
	const loading = ref(false);
	const toast = useToast();

	async function postOrder(data) {
		loading.value = true;
		try {
			let res = await useAxios().postRequest(`/order`, data);
			toast.add({ title: 'Buyurtma qayta ishlanadi. Tez orada siz bilan bog`lanamiz' });
			return res.data;
		} catch (error) {
			console.log('error', error);
		} finally {
			loading.value = false;
		}
	}

	async function oneClickOrder(data) {
		loading.value = true;
		try {
			let res = await useAxios().postRequest(`/order/one_click`, data);
			toast.add({ title: 'Buyurtma qayta ishlanadi. Tez orada siz bilan bog`lanamiz' });
			return res.data;
		} catch (error) {
			console.log('error', error);
		} finally {
			loading.value = false;
		}
	}

	return {
		postOrder,
		oneClickOrder,
		loading
	};
});
