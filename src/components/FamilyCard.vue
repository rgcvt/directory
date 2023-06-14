<script setup>
import IconHome from '@/icons/IconHome.vue';
import IconMail from '@/icons/IconMail.vue';
import IconPhone from '@/icons/IconPhone.vue';
import ContactMethod from '@/components/ContactMethod.vue';
import ContactLink from '@/components/ContactLink.vue';
import { ref, computed } from 'vue';
const familyLeaders = (family) => {};
const props = defineProps({
	family: Object,
});
</script>

<template>
	<div class="family-card">
		<div class="family-members">
			<h2 class="leaders">
				{{ family.fields.leaders.map((l) => l.fields.firstName).join(' & ') }}
				<div class="last-name">{{ family.fields.name }}</div>
			</h2>
			<template v-if="family.fields.kids.length > 0">
				<h3 class="kids">
					Kids:
					{{ family.fields.kids.map((k) => k.fields.firstName).join(', ') }}
				</h3>
			</template>
		</div>
		<div class="family-image">
			<img
				v-if="family.fields.photo"
				:src="`img/${family.fields.photo[0].local}`"
				:alt="`${family.name} family photo`"
			/>
		</div>
		<div class="family-contact-info">
			<div class="contact-methods">
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
								:textSecondary="leader.fields.firstName"
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
								:textSecondary="leader.fields.firstName"
							/>
						</template>
					</template>
				</ContactMethod>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.family-card {
	--image-size: 9rem;
	//background: var(--color-background-card);
	padding: var(--space-sm);
	box-shadow: var(--shadow-elevation-low);
	border: 1px solid var(--color-ui);
	//border-radius: 1.5rem;

	display: grid;
	grid-template-areas: 'members image' 'contact contact';
	grid-template-columns: 1fr var(--image-size);
	gap: var(--space-sm);

	@media screen and (min-width: 480px) {
		--image-size: 14rem;
		column-gap: 2rem;
		grid-template-areas: 'members image' 'contact image';
	}
}

.family-image {
	background: var(--color-ui);
	//border-radius: 1rem;
	overflow: hidden;
	height: var(--image-size);
	grid-area: image;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
.family-members {
	//padding: var(--space-xs) var(--space-xs) 2rem var(--space-xs);
	grid-area: members;
	position: relative;
}

h2.leaders {
	font-size: clamp(1.25rem, var(--space-xs) + 2vw, 1.75rem);
	margin: 0;
	.last-name {
		//font-size: 1rem;
		font-weight: 800;
		//color: var(--color-primary);
	}
}
h3.kids {
	font-size: 0.8rem;
	font-weight: 600;
	margin: var(--space-xs) 0 0 0;
	.kids-label {
		font-weight: 400;
	}
}
.family-contact-info {
	grid-area: contact;
}
.contact-methods {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-areas: 'address' 'phone' 'email';
	padding: 0 var(--space-xs);
	column-gap: 2rem;
	overflow: hidden;
	> * {
		min-width: 0;
	}
	@media screen and (min-width: 480px) {
		max-height: none;
	}

	@media screen and (min-width: 768px) {
		//grid-template-rows: max-content max-content;
		grid-template-areas: 'address address' 'phone email';
		grid-template-columns: max-content 1fr;
	}
}
</style>
