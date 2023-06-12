<script setup>
import IconHome from '@/icons/IconHome.vue';
import IconMail from '@/icons/IconMail.vue';
import IconPhone from '@/icons/IconPhone.vue';
import ContactMethod from '@/components/ContactMethod.vue';
import ContactLink from '@/components/ContactLink.vue';
const familyLeaders = (family) => {};
const props = defineProps({
	family: Object,
});
</script>

<template>
	<div class="family-card">
		<div class="family-header">
			<div class="family-members">
				<h2 class="leaders">
					{{ family.fields.leaders.map((l) => l.fields.firstName).join(' & ') }}
					<div class="last-name">{{ family.fields.name }}</div>
				</h2>
				<h3 class="kids">
					{{ family.fields.kids.map((k) => k.fields.firstName).join(', ') }}
				</h3>
			</div>
			<div class="family-image"></div>
		</div>

		<div class="family-contact-info">
			<ContactMethod v-if="family.fields.address" type="address">
				<template v-slot:icon>
					<IconHome />
				</template>
				<template v-slot:links>
					<ContactLink
						type="address"
						:data="family"
						:textPrimary="`${family.fields.address}`"
						:textSecondary="`${family.fields.city}, ${family.fields.state} ${family.fields.zip}`"
					/>
				</template>
			</ContactMethod>

			<ContactMethod type="tel">
				<template v-slot:icon>
					<IconPhone />
				</template>
				<template v-slot:links>
					<template v-for="leader in family.fields.leaders">
						<ContactLink
							v-if="leader.fields.phone"
							type="tel"
							:data="leader"
							:textPrimary="leader.fields.phone"
							:textSecondary="leader.fields.name"
						/>
					</template>
				</template>
			</ContactMethod>

			<ContactMethod type="email">
				<template v-slot:icon>
					<IconMail />
				</template>
				<template v-slot:links>
					<template v-for="leader in family.fields.leaders">
						<ContactLink
							v-if="leader.fields.email"
							type="email"
							:data="leader"
							:textPrimary="leader.fields.email"
							:textSecondary="leader.fields.name"
						/>
					</template>
				</template>
			</ContactMethod>
		</div>
		<button class="toggle">+</button>
	</div>
</template>

<style lang="scss" scoped></style>
