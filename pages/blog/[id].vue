<template>
	<main>
		<div class="wrapper py-20 space-y-6">
			<h1 class="text-4xl font-bold tracking-tight">Blog</h1>
			<div class="flex flex-col gap-6">
				<img src="/assets/images/png/hero.png" alt="" />
				<div>
					<h3 class="font-semibold tracking-tight text-xl">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus reiciendis quasi officia repellat enim repudiandae velit ex ratione recusandae numquam odit sunt, iusto accusantium
						laudantium aspernatur nam porro laboriosam nulla.
					</h3>
					<div>sasasas</div>
				</div>
			</div>

			<h1 class="text-4xl font-bold tracking-tight">Boshqa bloglar</h1>
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				<NuxtLink v-for="item in blogs?.posts?.data.slice(0, 8)" :to="`/blog/${item.id}`">
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
		</div>
	</main>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useBlogStore } from '~/stores/blog.js';

const blogStore = useBlogStore();

const { getBlogId, getBlogs } = blogStore;

const route = useRoute();

const { data: blogs } = await useAsyncData('blogs', async () => {
	return await getBlogs();
});

// const { data: blog } = await useAsyncData(
// 	'blog',
// 	async () => {
// 		return await getBlogId(route.params.id);
// 	},
// 	{ watch: () => route.params.id }
// );
</script>
