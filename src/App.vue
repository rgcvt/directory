<script setup>
import { ref } from 'vue';
import families from '../data/families.json';
import FamilyCard from './components/FamilyCard.vue';
import IconSearch from './icons/IconSearch.vue';
const filteredFamilies = ref(families);

const findValue = (e) => {
	// get the search value;
	const value = e.target.value.toLowerCase();

	// if the value is not empty, filter the array
	if (value !== '') {
		filteredFamilies.value = families.filter((f) => {
			return f.searchIndex.find((i) => i?.includes(value));
		});
	} else {
		filteredFamilies.value = families;
	}
};
</script>

<template>
	<div class="layout">
		<section class="family-search">
			<label for="search">Search</label>
			<div class="input-row">
				<input
					@input="findValue($event)"
					type="search"
					name="search"
					placeholder="Search by name, city, zip code, etc"
				/>
				<button title="search"><IconSearch /></button>
			</div>
		</section>

		<section class="family-cards">
			<FamilyCard v-for="family in filteredFamilies" :family="family" />
		</section>
	</div>
</template>
<style lang="scss" scoped>
.layout {
	max-width: 900px;
	margin: 0 auto;
}
.family-search {
	position: sticky;
	top: 0;
	z-index: 2;
	background: linear-gradient(
		to bottom,
		var(--color-background-intense) 60%,
		transparent
	);
	padding: var(--space-xs) 0;
	margin: var(--space-md) 0;
	button {
		svg {
			width: 1rem;
			height: 1rem;
		}
	}
}
.family-cards {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}
</style>
