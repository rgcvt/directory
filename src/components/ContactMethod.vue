<script setup>
const props = defineProps({
	type: String,
});
</script>

<template>
	<div :class="`contact-method ${type}`">
		<div class="contact-icon">
			<slot name="icon"> </slot>
		</div>
		<div class="contact-links">
			<slot name="links"> </slot>
		</div>
	</div>
</template>

<style lang="scss">
.contact-method {
	border-top: 1px solid var(--color-ui-muted);
	padding: var(--space-xs) 0;
	opacity: 1;
	display: flex;
	gap: var(--space-xs);
	&.address {
		grid-area: address;
	}
	&.phone {
		grid-area: phone;
	}
	&.email {
		grid-area: email;
	}
}

[data-state='open'] {
	.contact-method {
		opacity: 1;
		transform: translateY(0);
	}
}

.contact-icon {
	margin: var(--space-xs) 0;
	flex-shrink: 0;
	width: 1.5rem;
	height: 1.5rem;
	color: var(--color-ui-intense);

	svg {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}
</style>
