import { defineStore } from 'pinia';
import { useAxios } from '@/api/index';

export const useProducts = defineStore('products', () => {
	// Products
	const product = ref(null);
	const loading = ref(false);
	const toast = useToast();

	async function getProduct(url) {
		try {
			let res = await useAxios().getRequest(`/products/${url}`);
			product.value = res.data;
			return res.data;
		} catch (error) {
			console.log('error', error);
		}
	}

	async function getProductBySlug(url) {
		loading.value = true;
		try {
			let res = await useAxios().getRequest(`/products/${url}`);
			product.value = res.data.product;
			return res.data;
		} catch (error) {
			console.log('error', error);
		} finally {
			loading.value = false;
		}
	}

	async function commentProductId(data) {
		try {
			let res = await useAxios().postRequest(`/products/comments`, data);
			toast.add({ title: 'Xabaringiz muvaffaqiyatli yuborildi' });
			return res.data;
		} catch (error) {
			console.log('error', error);
		}
	}

	return {
		getProduct,
		getProductBySlug,
		commentProductId,
		product,
		loading
	};
});
