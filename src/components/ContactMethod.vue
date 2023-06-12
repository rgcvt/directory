<script setup>
const props = defineProps({
	type: String,
});
</script>

<template>
	<div :class="`contact-method ${type}`">
		<div class="contact-icon">
			<slot name="icon"></slot>
		</div>
		<slot name="links"></slot>
	</div>
</template>

<style lang="scss" scoped></style>
