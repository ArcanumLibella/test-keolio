export default class Header {
	constructor() {
		const header = document.querySelector('.header');
		if (!header) return;

		this.manageHeader(header);
	}

	manageHeader(header) {
		window.addEventListener('scroll', (event) => {
			const offsetWindow = window.pageYOffset;
			const headerHeight = 60;

			if (offsetWindow > headerHeight) {
				header.classList.add('is-scrolling');
			} else {
				header.classList.remove('is-scrolling');
			}
		});
	}
}
