import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore(
	'carts',

	() => {
		const carts = ref([]);
		const toast = useToast();

		const getDefaultQuantity = (stock) => {
			return stock > 0 ? 1 : 0;
		};

		const addCart = (data) => {
			const quantity = getDefaultQuantity(data.stock);
			carts.value.push({ ...data, quantity });
			toast.add({ title: 'Mahsulot savatga qo`shildi' });
		};

		const increment = (data) => {
			const product = carts.value.find((product) => product.id === data.id);
			const quantity = getDefaultQuantity(data.stock);
			if (product) {
				if (product.stock > product.quantity) {
					product.quantity++;
				}
			} else {
				const newProduct = { ...data, quantity };
				carts.value.push(newProduct);
			}
		};

		const decrement = (data) => {
			const product = carts.value.find((product) => product.id === data.id);
			const quantity = getDefaultQuantity(data.stock);
			if (product) {
				product.quantity--;
				if (product.quantity <= 0) {
					removeCart(product);
				}
			} else {
				const newProduct = { ...data, quantity };
				carts.value.push(newProduct);
			}
		};

		const removeCart = (data) => {
			carts.value = carts.value?.filter((product) => product.id !== data.id);
			toast.add({ title: 'Mahsulot savatdan o`chirildi' });
		};

		const toggleCart = (data) => {
			const exists = carts.value?.some((product) => product.id === data.id);
			if (exists) {
				removeCart(data);
			} else {
				addCart(data);
			}
		};

		const totalPrice = computed(() => {
			return carts.value.reduce((total, product) => {
				return total + product.real_price * product.quantity;
			}, 0);
		});

		const clearCarts = () => {
			carts.value = [];
		};
		const productInCart = (data) => {
			return carts.value.some((product) => product.id === data.id);
		};
		return {
			carts,
			toggleCart,
			addCart,
			removeCart,
			clearCarts,
			increment,
			decrement,
			productInCart,
			totalPrice
		};
	},
	{
		persist: {
			storage: persistedState.localStorage
		}
	}
);
