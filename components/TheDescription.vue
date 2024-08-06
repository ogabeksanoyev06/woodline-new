<template>
	<h4 class="text-lg text-[rgba(53,52,55,0.8)]">{{translations["favorites.desc1"]}}</h4>
	<p class="text-grey-2/[.64] text-lg mt-10">
		{{translations["favorites.desc2"]}} <br /><br />

		{{translations["favorites.desc3"]}} <br /><br />

		{{translations["favorites.desc4"]}} <br />

		{{translations["favorites.desc5"]}} <br />

		{{translations["favorites.desc6"]}}
		<br /><br />

		{{translations["favorites.desc7"]}}
		<br /><br />

		{{translations["favorites.desc8"]}}
	</p>
</template>
<script setup>
import { useTranslationStore } from '~/stores/translations.js';

const translationStore = useTranslationStore();

const { translations } = storeToRefs(translationStore);
</script>
<style></style>
