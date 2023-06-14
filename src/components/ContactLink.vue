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
	<a class="contact-link" :href="href()" target="_blank">
		<div class="link-text-primary">{{ textPrimary }}</div>
		<div class="link-text-secondary">
			{{ textSecondary }}
		</div>
	</a>
</template>

<style lang="scss" scoped>
.contact-link {
	color: var(--color-text-muted);
	display: block;
	font-weight: 400;
	//margin: var(--space-xs) 0;
	padding: var(--space-xs) 0.75rem;
	//border-radius: var(--space-xs);
	//background: var(--color-background);
	border: var(--border-width) solid transparent;
	&:hover {
		color: var(--color-link-hover);
		background: var(--color-background);
		border-color: var(--color-ui-muted);
	}
}
.link-text-primary {
	font-size: 0.9rem;
}
.link-text-secondary {
	font-size: 0.7rem;
	opacity: 0.75;
}
</style>
