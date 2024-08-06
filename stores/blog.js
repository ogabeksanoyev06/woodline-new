import { defineStore } from 'pinia';
import { useAxios } from '@/api/index';

export const useBlogStore = defineStore('blog', () => {
	async function getBlogs(params) {
		try {
			let res = await useAxios().getRequest('/posts', params);
			return res.data;
		} catch (error) {
			console.log('error', error);
		}
	}

	async function getBlogId(id) {
		try {
			let res = await useAxios().getRequest(`/posts/blog-${id}`);
			return res.data;
		} catch (error) {
			console.log('error', error);
		}
	}

	return { getBlogs, getBlogId };
});
