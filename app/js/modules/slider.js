// import { tns } from 'tiny-slider/src/tiny-slider';
import Glide from '@glidejs/glide';

export default class Slider {
	constructor() {
		this.init();
	}

	init() {
		// this.sliderPartners();
		// this.sliderTestimonies();
		const sliderPartners = new Glide('.glide', {
			type: 'carousel',
			startAt: 0,
			perView: 5,
			focusAt: 'center',
			autoplay: 3000
		});

		// const sliderTestimonies = new Glide('.glide', {
		// 	type: 'carousel',
		// 	startAt: 0,
		// 	perView: 3,
		// 	focusAt: 'center',
		// 	autoplay: 3000
		// });

		sliderPartners.mount();
		// sliderTestimonies.mount();
	}
}
