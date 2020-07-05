import Glide from '@glidejs/glide';

export default class Slider {
	constructor() {
		this.init();
	}

	init() {
		const sliderPartners = new Glide('.glide.partners', {
			type: 'carousel',
			startAt: 0,
			perView: 5,
			focusAt: 'center',
			autoplay: 3000
		});

		sliderPartners.mount();
	}
}
