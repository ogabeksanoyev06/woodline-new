<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
		<UNotifications :ui="{ strategy: 'override', position: 'top-0 right-0' }" />
	</div>
</template>
