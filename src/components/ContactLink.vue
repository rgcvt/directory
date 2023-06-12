<script setup>
const props = defineProps({
	data: Object,
	type: String,
	textPrimary: String,
	textSecondary: String,
});
const d = props.data.fields;
const href = () => {
	switch (props.type) {
		case 'email':
			return `mailto:${d.email}`;

		case 'tel':
			return `tel:${d.phone.replace(/\D/g, '')}`;

		case 'address':
			const address = `${d.address} ${d.city}, ${d.state} ${d.zip}`;
			const encodedAddress = encodeURIComponent(address);
			return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
		default:
			return '#';
	}
};
</script>

<template>
	<a class="contact-link" :href="href()">
		<div class="link-text-primary">{{ textPrimary }}</div>
		<div class="link-text-secondary">
			{{ textSecondary }}
		</div>
	</a>
</template>

<style lang="scss" scoped></style>
