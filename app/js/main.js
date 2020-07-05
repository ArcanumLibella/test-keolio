import Header from './modules/header';
// import Slider from './modules/slider';

const App = {
	init() {
		console.log('JS works !!');

		// Add new JS files here :
		new Header();
		// new Slider();
	}
};

document.addEventListener('DOMContentLoaded', () => {
	App.init();
});
