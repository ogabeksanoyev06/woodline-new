<template>
	<main>
		<div class="wrapper py-20 space-y-6">
			<h1 class="text-4xl font-bold tracking-tight">Blog</h1>
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				<NuxtLink v-for="item in blogs?.posts?.data" :to="`/blog/${item.id}`">
					<div class="rounded-lg border shadow-sm w-full overflow-hidden">
						<div class="h-[250px]">
							<img :src="item.lg_img ? item.lg_img : '/assets/images/png/product.jpg'" alt="" class="h-full w-full object-cover" />
						</div>
						<div class="flex flex-col space-y-1.5 gap-y-2 p-4">
							<h3 class="font-semibold tracking-tight text-xl">
								{{ item.title }}
							</h3>
							<div class="line-clamp-2" v-html="item.desc"></div>
						</div>
					</div>
				</NuxtLink>
			</div>
			<UPagination v-model="page" :page-count="16" :total="blogs?.posts?.data.length" />
		</div>
	</main>
</template>

<script setup>
import { useBlogStore } from '~/stores/blog.js';

const blogStore = useBlogStore();

const { getBlogs } = blogStore;

const page = ref(1);
const limit = ref(16);

const { data: blogs } = await useAsyncData('blogs', async () => {
	return await getBlogs({
		page: page.value
	});
});
</script>
