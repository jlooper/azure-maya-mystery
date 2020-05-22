<template>
	<div class="markdown-body">
		<p class="text-2xl pb-5 pt-5 ml-5 text-sans text-white">{{ $t('cameraroll') }}</p>
		<div class="p-5">
			<div v-if="items.length == 0">
				<span class="text-white">{{ $t('nosnapshots') }}</span>
			</div>
			<div v-else>
				<div class="wrapper">
					<div v-for="item in items" class="item">
						<div class="polaroid">
							<span class="container">
								<img :src="'/assets/images/' + item.filename + '.png'" />
							</span>
							<div class="caption">
								<a :href="item.url" target="_blank">Learn</a>
								<p class="text-sm leading-snug" v-if="item.clue">{{ item.clue }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { getItems, getLocale } from '@theme/utils/helpers';
const items = require('@theme/utils/items.json');
import messages from '../translations/camera.js';

export default {
	name: 'Camera',
	i18n: {
		messages,
	},

	created() {
		this.showCameraItems();
		this.$i18n.locale = getLocale();
	},

	data() {
		this.$root.$on('item_added', (id) => {
			this.showCameraItems();
		});
		this.$root.$on('lang_changed', (lang) => {
			this.$i18n.locale = lang;
		});
		return {
			items: [],
		};
	},
	methods: {
		showCameraItems() {
			var ids = getItems();
			this.items = ids.map((id) => items.find((item) => item.id == id));
			return items;
		},
	},
};
</script>
<style scoped>
.wrapper {
	width: 80%;
	text-align: center;
}
.polaroid {
	background: #fff;
	padding: 1rem;
	-webkit-box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
	-moz-box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}
.polaroid > img {
	max-width: 100%;
	height: auto;
}
.caption {
	font-size: 1.8rem;
	text-align: center;
	line-height: 2em;
}
.item .polaroid:before {
	content: '';
	position: absolute;
	z-index: -1;
	transition: all 0.4s;
}
.item:nth-of-type(2n + 1) {
	transform: scale(0.8, 0.8) rotate(5deg);
	transition: all 0.35s;
}
.item:nth-of-type(2n + 1) .polaroid:before {
	transform: rotate(6deg);
	height: 20%;
	width: 47%;
	bottom: 30px;
	right: 12px;
	box-shadow: 0 2.1rem 2rem rgba(0, 0, 0, 0.4);
}
.item:nth-of-type(2n + 2) {
	transform: scale(0.8, 0.8) rotate(-5deg);
	transition: all 0.35s;
}
.item:nth-of-type(2n + 2) .polaroid:before {
	transform: rotate(-6deg);
	height: 20%;
	width: 47%;
	bottom: 30px;
	left: 12px;
	box-shadow: 0 2.1rem 2rem rgba(0, 0, 0, 0.4);
}
.item:hover {
	filter: none;
	transform: scale(1, 1) rotate(0deg);
	transition: all 0.4s;
}
.item:hover .polaroid:before {
	content: '';
	position: absolute;
	z-index: -1;
	transform: rotate(0deg);
	height: 60%;
	width: 60%;
	bottom: 0%;
	right: 10%;
	box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.2);
	transition: all 0.35s;
}
</style>