<template>
	<div>
		<TheHeader />

		<slot></slot>
		<!-- <TheSocialLinks /> -->
		<TheFooter />
	</div>
</template>
<script setup>
import { useCategories } from '~/stores/categories';
import { useTranslationStore } from '~/stores/translations.js';

const { locale } = useI18n();

const translationsStore = useTranslationStore();

const { getTranslation } = translationsStore;
const { translations } = storeToRefs(translationsStore);

const { data } = await useAsyncData(
	'translations',
	() => {
		return getTranslation();
	},
	{ watch: [locale] }
);
useAsyncData('categories', () => useCategories().getCategories(), { watch: [locale] });
</script>
