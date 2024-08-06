<script setup>
import { useProfile } from '~/stores/profile';
import { useProducts } from '~/stores/products';

const profileStore = useProfile();
const productsStore = useProducts();

const { getUser } = profileStore;
const { commentProductId } = productsStore;

const state = reactive({
	errors: []
});

const isReviewModal = ref(false);

const comment = ref('');
const productId = ref('');

const rating = ref(null);

function validate() {
	const errors = [];
	if (!comment.value) {
		errors.push({ path: 'name', message: 'Maydon bo`sh bo`lmasligi kerak' });
	}
	state.errors = errors;
	return errors;
}

const ReviewModal = (id) => {
	productId.value = id;
	isReviewModal.value = true;
};

const commentProduct = async () => {
	await commentProductId({
		product_id: productId.value,
		comment: comment.value,
		stars: rating.value
	});
	isReviewModal.value = false;
};

const { data: profile } = await useAsyncData('profile', async () => {
	return await getUser();
});
</script>

<template>
	<main>
		<div class="wrapper py-20 space-y-20">
			<section class="space-y-10">
				<h3 class="text-3xl font-medium">
					{{ profile.user.orders[0]?.name }}
				</h3>
				<div class="flex flex-wrap gap-4 items-center justify-between">
					<div class="flex gap-2 rounded-full bg-grey p-2">
						<UButton
							to="/profile"
							size="xl"
							:ui="{
								padding: { xl: 'sm:p-4' },
								rounded: 'rounded-full'
							}"
							class="text-base text-grey-2 bg-white"
							variant="secondary"
							label="Профиль"
						>
							<template #leading>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
									<ellipse cx="12" cy="17.5" rx="7" ry="3.5" stroke="#5D5D5F" stroke-width="1.5" stroke-linejoin="round" />
									<circle cx="12" cy="7" r="4" stroke="#5D5D5F" stroke-width="1.5" stroke-linejoin="round" />
								</svg>
							</template>
						</UButton>
						<UButton
							to="/profile/orders"
							size="xl"
							:ui="{
								padding: { xl: 'sm:p-4' },
								rounded: 'rounded-full'
							}"
							class="text-base text-white"
							variant="solid"
							label="Мои заказы"
						>
							<template #leading>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path opacity="0.4" d="M6 4H18C20.2091 4 22 5.79086 22 8V13C22 15.2091 20.2091 17 18 17H10C7.79086 17 6 15.2091 6 13V4Z" fill="white" />
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M2.75 1.25C2.33579 1.25 2 1.58579 2 2C2 2.41421 2.33579 2.75 2.75 2.75H4.75C5.44036 2.75 6 3.30964 6 4H7.5C7.5 2.48122 6.26878 1.25 4.75 1.25H2.75Z"
										fill="white"
									/>
									<circle cx="9.5" cy="20.5" r="1.5" fill="white" stroke="white" stroke-width="1.5" />
									<circle cx="18.5" cy="20.5" r="1.5" fill="white" stroke="white" stroke-width="1.5" />
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M10.25 8.5C10.25 8.08579 10.5858 7.75 11 7.75H17C17.4142 7.75 17.75 8.08579 17.75 8.5C17.75 8.91421 17.4142 9.25 17 9.25H11C10.5858 9.25 10.25 8.91421 10.25 8.5Z"
										fill="white"
									/>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M10.25 12.5C10.25 12.0858 10.5858 11.75 11 11.75H17C17.4142 11.75 17.75 12.0858 17.75 12.5C17.75 12.9142 17.4142 13.25 17 13.25H11C10.5858 13.25 10.25 12.9142 10.25 12.5Z"
										fill="white"
									/>
								</svg>
							</template>
						</UButton>
					</div>
				</div>
			</section>
			<section>
				<div class="flex flex-col gap-6">
					<div class="flex flex-col mx-auto gap-6 max-w-[952px] w-full" v-for="oreder in profile.user?.orders">
						<div class="flex flex-col border rounded-lg p-2 sm:p-6 gap-6">
							<div class="flex items-start justify-between gap-6">
								<div class="flex flex-col gap-2 flex-1">
									<h3 class="text-lg sm:text-xl font-medium">ID заказа {{ oreder.id }}</h3>
									<p class="text-xs sm:text-sm text-grey-2">Обновлен {{ $dayjs(oreder.updated_at).format('DD.MM.YYYY HH:mm:ss') }}</p>
								</div>
								<div class="flex items-center justify-center bg-[#FFF8F1] rounded-xl text-orange font-medium py-2 px-2 text-xs sm:px-6">Ожидание модерации</div>
							</div>
							<TheSeperator />
							<div class="flex flex-col gap-4">
								<div class="flex items-end gap-4">
									<span class="text-grey-1">Дата заказа</span>
									<TheSeperator class="flex-1" />
									<span class="">
										{{ $dayjs(oreder.created_at).format('DD.MM.YYYY HH:mm:ss') }}
									</span>
								</div>
								<div class="flex items-end gap-4">
									<span class="text-grey-1">Способ доставки Доствака </span>
									<TheSeperator class="flex-1" />
									<span class="">{{ oreder.delivery_method }} </span>
								</div>
								<div class="flex items-end gap-4">
									<span class="text-grey-1">Способ оплаты Payme</span>
									<TheSeperator class="flex-1" />
									<span class="">{{ oreder.payment_method }}</span>
								</div>
								<div class="flex items-end gap-4">
									<span class="text-grey-1">Сумма заказа </span>
									<TheSeperator class="flex-1" />
									<span class="">{{ formatNumber(oreder.amount) }} сум</span>
								</div>
							</div>
							<TheSeperator />
							<UAccordion color="white" variant="soft" size="sm" :items="oreder.products">
								<template #item>
									<div class="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 border-b pb-6 mb-6 border-grey-0 last:border-none" v-for="(item, i) in profile.user.orders[0].products" :key="i">
										<div class="w-20 h-24 border border-grey-0 rounded-lg overflow-hidden flex items-center justify-center">
											<img class="h-full w-full object-contain flex-shrink-0" src="~/assets/images/png/chair.png" alt="chair" />
										</div>
										<div class="flex flex-col gap-4 flex-1">
											<div class="flex items-center justify-between">
												<h3 class="text-base sm:text-xl flex-1">
													{{ item.product.name }}
												</h3>
												<UButton
													size="xl"
													:ui="{
														padding: { xl: 'p-0 sm:p-2' },
														rounded: 'rounded-full'
													}"
													class="hover:bg-transparent text-green"
													variant="ghost"
													label="Оставить отзыв"
													@click="ReviewModal(item.product_id)"
												>
												</UButton>
											</div>
											<div class="flex items-center justify-between">
												<div class="flex items-center gap-2">
													<span class="text-grey-header">{{ item.count }}x</span>
													<p>{{ formatNumber(item.price) }} сум</p>
												</div>
												<p>{{ formatNumber(item.price * item.count) }} сум</p>
											</div>
										</div>
									</div>
								</template>
							</UAccordion>
						</div>
					</div>
				</div>
			</section>
			<UModal v-model="isReviewModal" :ui="{ base: 'sm:!max-w-[700px]' }">
				<div class="flex flex-col gap-6 p-6">
					<div class="flex items-center justify-between">
						<h3 class="text-xl font-medium">Мой отзыв</h3>
						<UButton color="gray" :ui="{ rounded: 'rounded-full' }" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isReviewModal = false" />
					</div>
					<UForm :validate="validate" :state="state" @submit="commentProduct">
						<div class="flex flex-col gap-6">
							<UFormGroup name="isReviewModal">
								<div class="flex flex-col gap-2">
									<p class="text-base font-medium">Ismingiz</p>
									<UTextarea
										:ui="{
											padding: { xl: '!px-6 !py-4' },
											rounded: 'rounded-lg',
											color: {
												white: {
													outline: 'shadow-none ring-grey-0 placeholder:text-grey-1 border-grey-0'
												}
											}
										}"
										resize
										placeholder="Напишите отзыв"
										v-model="comment"
									/>
								</div>
							</UFormGroup>
						</div>
						<div class="flex justify-end mt-6">
							<UButton type="submit" size="xl" :ui="{ padding: { xl: 'px-6 py-3' }, rounded: 'rounded-full' }" variant="solid" label="Готово" class="w-[196px] justify-center" />
						</div>
					</UForm>

					<div class="flex items-center justify-between">
						<div class="flex flex-col gap-2">
							<span class="text-grey-1">Общая оценка</span>
							<TheRate v-model="rating" />
						</div>
					</div>
				</div>
			</UModal>
		</div>
	</main>
</template>
