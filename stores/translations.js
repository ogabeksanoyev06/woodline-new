import { defineStore } from 'pinia';
import { useAxios } from '@/api/index';

export const useTranslationStore = defineStore('translations', () => {
	const translations = ref({});

	async function getTranslation() {
		try {
			let res = await useAxios().getRequest(`/translates`);
			translations.value = res.data.translates;
			return res.data;
		} catch (error) {
			console.log(error);
		}
	}
	return {
		getTranslation,
		translations
	};
});
