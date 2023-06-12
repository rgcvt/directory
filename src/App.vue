<script setup>
import families from '../data/families.json';
import FamilyCard from './components/FamilyCard.vue';
</script>

<template>
	<FamilyCard v-for="family in families" :family="family" />
</template>
