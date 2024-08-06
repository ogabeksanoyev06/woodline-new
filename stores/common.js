import { defineStore } from 'pinia';
import { useAxios } from '@/api/index';

export const useCommon = defineStore('common', () => {
	async function getRegions() {
		try {
			let res = await useAxios().getRequest('/regions');
			return res.data;
		} catch (error) {
			console.log('error', error);
		}
	}

	async function getBanners() {
		try {
			let res = await useAxios().getRequest('/banners');
			return res.data;
		} catch (error) {
			console.log('error', error);
		}
	}

	return { getRegions, getBanners };
});
