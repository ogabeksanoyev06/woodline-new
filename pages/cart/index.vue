<template>
	<div>
		<main>
			<div class="wrapper py-20 space-y-20">
				<section class="space-y-10">
					<div class="flex items-center justify-between">
						<h3 class="text-3xl font-medium">{{translations["footer.cart"]}}</h3>
					</div>
					<div class="grid gap-6 xl:grid-cols-9">
						<div class="xl:col-span-6">
							<div class="border border-grey-0 rounded-xl p-6 flex flex-col gap-5">
								<div class="flex items-center justify-between">
									<UCheckbox v-model="selected" @change="toggleSelectAll"
										:label="translations['main.cart-select-order']" />
									<p class="text-grey-2">{{translations["main.breadcrumb-products"]}}: {{ carts.length }}</p>
								</div>
								<transition-group name="fade" tag="div" class="space-y-5">
									<div class="flex flex-col gap-6 border-b border-grey-0 last:border-0 last:pb-0 pb-5"
										v-for="product in carts" :key="product.id">
										<div class="flex flex-wrap items-center gap-4">
											<div class="flex items-center gap-2">
												<UCheckbox :disabled="!product.stock"
													v-model="availableProducts[product.slug]" />
												<div
													class="w-24 h-24 border border-grey-0 rounded-lg overflow-hidden flex items-center justify-center">
													<img class="h-full w-full object-contain flex-shrink-0"
														:src="product.images[0].lg_img || `/assets/images/png/product.png`"
														:alt="product?.name" />
												</div>
											</div>
											<div class="flex flex-col gap-4 flex-1">
												<div class="flex items-center justify-between">
													<ULink :to="`/product/${product.slug}`"
														class="text-xl flex-1 hover:text-green duration-200">{{
														product?.name }}</ULink>
													<UButton @click="removeCart(product)" size="xl" :ui="{
														padding: { xl: 'p-2' },
														rounded: 'rounded-full',
														icon: { size: { xl: 'h-5 w-5' } }
													}" class="hover:bg-transparent text-grey-header" variant="ghost" :label="translations['main.filter-color-reset']">
														<template #leading>
															<svg xmlns="http://www.w3.org/2000/svg" width="24"
																height="24" viewBox="0 0 24 24" fill="none">
																<path
																	d="M19 9L18.2841 18.3068C18.1238 20.3908 16.386 22 14.2959 22H9.70412C7.61398 22 5.87621 20.3908 5.71591 18.3068L5 9M21 7C18.4021 5.73398 15.3137 5 12 5C8.68635 5 5.59792 5.73398 3 7M10 5V4C10 2.89543 10.8954 2 12 2C13.1046 2 14 2.89543 14 4V5M10 11V17M14 11V17"
																	stroke="#353437" stroke-width="1.5"
																	stroke-linecap="round" />
															</svg>
														</template>
													</UButton>
												</div>

												<div class="flex items-center justify-between">
													<div class="flex items-center gap-2">
														<span class="text-green text-xl">{{
															formatNumber(product.real_price) }} сум</span>
														<span v-if="product.discount_price"
															class="line-through text-grey-1">{{
																formatNumber(product.discount_price)
															}}</span>
													</div>
													<div
														class="border border-grey-0 rounded-full flex items-center overflow-hidden py-1 px-4 gap-2">
														<UButton @click="decrement(product)" variant="ghost"
															class="hover:bg-transparent text-grey-header">
															<template #leading>
																<svg width="24" height="24" viewBox="0 0 24 24"
																	fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M18 12L6 12" stroke="#020105"
																		stroke-width="1.5" stroke-linecap="round"
																		stroke-linejoin="round" />
																</svg>
															</template>
														</UButton>
														<div class="w-7 h-7 flex items-center justify-center text-xl">{{
															product.quantity }}</div>
														<UButton @click="increment(product)" variant="ghost"
															class="hover:bg-transparent text-grey-header">
															<template #leading>
																<svg width="24" height="24" viewBox="0 0 24 24"
																	fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M12 6V18M18 12L6 12" stroke="#020105"
																		stroke-width="1.5" stroke-linecap="round"
																		stroke-linejoin="round" />
																</svg>
															</template>
														</UButton>
													</div>
												</div>
											</div>
										</div>
									</div>
								</transition-group>
							</div>
						</div>
						<div class="xl:col-span-3">
							<div class="sticky top-36">
								<div class="border border-grey-0 rounded-xl flex flex-col gap-6 p-6">
									<div>
										<h3 class="text-xl">{{translations["main.your-order"]}}</h3>
										<TheSeperator class="my-6" />
										<div class="flex flex-col gap-6">
											<div class="flex items-center justify-between">
												<p>{{translations["main.products"]}}, {{ carts.length }} {{translations["main.hisob-soz"]}}</p>
												<p>{{ formatNumber(totalPrice) }} {{translations["main.sum"]}}</p>
											</div>
											<div class="flex items-center justify-between">
												<p>{{translations["main.delivery"]}}:</p>
												<p>{{translations["main.cart-free"]}}</p>
											</div>
											<div class="flex items-center justify-between">
												<p>{{translations["main.cart-total"]}}:</p>
												<p class="text-xl font-medium">{{ formatNumber(totalPrice) }} {{translations["main.sum"]}}</p>
											</div>
										</div>
									</div>
									<UButton @click="goToLink" size="xl" :ui="{
										padding: { xl: 'px-6 py-3' },
										rounded: 'rounded-full',
										icon: { size: { xl: 'h-5 w-5' } }
									}" class="justify-center w-full" :label="translations['main.cart-btn']">
									</UButton>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section>
					<div class="flex items-center justify-between">
						<h3 class="text-base lg:text-2xl xl:text-3xl font-medium">{{ data?.showcases[0]?.name }}</h3>
						<UButton size="xl"
							:ui="{ padding: { xl: 'px-6 py-3' }, rounded: 'rounded-full', icon: { size: { xl: 'h-5 w-5' } } }"
							class="hover:bg-transparent text-grey-2" variant="ghost" :label="translations['main.moree']"
							trailing-icon="i-heroicons-chevron-double-right">
						</UButton>
					</div>
					<div class="mt-10 grid gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-x-6 sm:gap-y-10">
						<TheCard v-for="product in data?.showcases[0]?.products.slice(0, 8)" :data="product"
							:key="product.id" />
					</div>
				</section>
			</div>
		</main>
		<UModal v-model="isModalOpen" :ui="{ base: 'sm:!max-w-[560px]' }">
			<div class="w-full p-4 sm:p-8 space-y-6">
				<div class="flex items-center justify-between">
					<h3 class="text-xl font-medium">Manzilingizni yuboring</h3>
					<UButton color="gray" :ui="{ rounded: 'rounded-full' }" variant="ghost"
						icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isModalOpen = false" />
				</div>
				<UForm :validate="validate" :state="state" @submit="userId">
					<div class="flex flex-col gap-6">
						<UFormGroup name="address">
							<div class="flex flex-col gap-2">
								<p class="text-base font-medium">Manzilingiz</p>
								<UInput size="lg"
									:ui="{ rounded: 'lg', padding: { lg: 'px-6 py-4' }, color: { white: { outline: 'shadow-none border-grey-0' } } }"
									v-model="form.address" />
							</div>
						</UFormGroup>
						<UFormGroup name="region">
							<div class="flex flex-col gap-2">
								<p class="text-base font-medium">Mintaqangiz</p>
								<USelectMenu variant="outline" v-model="form.region_id" value-attribute="id"
									option-attribute="name" size="xl" :options="regions.regions" :ui="{
										padding: { xl: 'px-6 py-4' },
										rounded: 'rounded-xl',
										color: {
											white: {
												outline: 'shadow-none ring-grey-0 !placeholder:text-grey-1'
											}
										}
									}" placeholder="Mintaqangizni tanlang" />
							</div>
						</UFormGroup>
						<UFormGroup name="district">
							<div class="flex flex-col gap-2">
								<p class="text-base font-medium">Shahar yoki tuman</p>
								<USelectMenu variant="outline" v-model="form.district_id" value-attribute="id"
									option-attribute="name" size="xl" :options="filteredDistricts" :ui="{
										padding: { xl: 'px-6 py-4' },
										rounded: 'rounded-xl',
										color: {
											white: {
												outline: 'shadow-none ring-grey-0 !placeholder:text-grey-1'
											}
										}
									}" placeholder="Shahar yoki tumanni tanlang" />
							</div>
						</UFormGroup>
					</div>
					<div class="flex justify-end mt-6">
						<UButton type="submit" size="xl" :ui="{ rounded: 'rounded-full', padding: { xl: 'px-6' } }"
							variant="solid" class="" :disabled="state.loading" :loading="state.loading"> Saqlash
						</UButton>
					</div>
				</UForm>
			</div>
		</UModal>
	</div>
</template>
<script setup>
import { formatNumber } from '~/utils/numberFormatter';
import { useCartStore } from '~/stores/cart';
import { useShowcases } from '~/stores/showcases';
import { useProfile } from '~/stores/profile';
import { useCommon } from '~/stores/common.js';
import { useAuth } from '~/stores/auth.js';
import { useTranslationStore } from '~/stores/translations.js';

const translationStore = useTranslationStore();

const { translations } = storeToRefs(translationStore);

const isModalOpen = ref(false);
const selected = ref(false);
const availableProducts = ref({});

const userIds = useCookie('userId');

const state = reactive({
	errors: [],
	loading: false
});

const form = reactive({
	address: '',
	region_id: null,
	district_id: null
});

const cartStore = useCartStore();
const profileStore = useProfile();
const commonStore = useCommon();
const authStore = useAuth();

const { carts, totalPrice } = storeToRefs(cartStore);
const { isAuthenticated } = storeToRefs(authStore);

const { removeCart, increment, decrement } = cartStore;
const { postUserId } = profileStore;
const { getRegions } = commonStore;
const { toggleModal } = authStore;

function validate() {
	const errors = [];

	if (!form.address) {
		errors.push({ path: 'address', message: 'Manzilni kiriting' });
	}
	if (!form.region_id) {
		errors.push({ path: 'region', message: 'Viloyatni tanlang' });
	}
	if (!form.district_id) {
		errors.push({ path: 'district', message: 'Tumanni tanlang' });
	}

	state.errors = errors;
	return errors;
}

const filteredDistricts = computed(() => {
	if (!form.region_id) return [];
	const selectedRegion = regions.value.regions.find((reg) => reg.id === form.region_id);
	return selectedRegion ? selectedRegion.districts : [];
});

const goToLink = () => {
	if (!isAuthenticated.value) {
		toggleModal();
		return;
	} else {
		navigateTo('/checkout');
	};
}



const userId = async () => {
	await postUserId(form);
	isModalOpen.value = false;
};

const { data } = await useAsyncData('cart', async () => {
	let { showcases } = await useShowcases().getShowcases();
	return {
		showcases
	};
});

const { data: regions } = await useAsyncData('regions', async () => {
	return await getRegions();
});
</script>
