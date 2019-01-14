// Buttons
var prevBtn = document.querySelector('#prev-button');
var nextBtn = document.querySelector('#next-button');

// Slides
var slides = document.querySelectorAll('.slide');

// Dots
var dots = document.querySelectorAll('.slider__dot');

// Container
var slidesContainer = document.querySelector('.slider__slides-container');

function Slider(prev, next, slides, dots, container) {
	this.prevBtn = prev;
	this.nextBtn = next;
	this.slides = [].slice.call(slides);
	this.dots = [].slice.call(dots);
	this.containerWidth = parseInt(container.offsetWidth);

	this.currentSlideIdx = 0;

	// Set corresponding 'left' property for each slide
	var self = this;
	this.slides.forEach(function(slide, i) {
		slide.style.left = (self.containerWidth * i).toString() + 'px';
	});
}

Slider.prototype.setButtonsEvents = function() {
	this.prevBtn.addEventListener('click', e => {
		if (this.currentSlideIdx > 0) {
			var next = this.currentSlideIdx - 1;
			this.changeSlide(next);
			this.changeDot(next);
			this.currentSlideIdx = next;
		}
	});

	this.nextBtn.addEventListener('click', e => {
		if (this.currentSlideIdx < this.slides.length - 1) {
			var nextSlideIdx = this.currentSlideIdx + 1;
			this.changeSlide(nextSlideIdx);
			this.changeDot(nextSlideIdx);
			this.currentSlideIdx = nextSlideIdx;
		}
	});
};

Slider.prototype.toggleClasses = function(s) {
	s.classList.toggle('active');
};

Slider.prototype.changeDot = function(next) {
	this.dots[this.currentSlideIdx].classList.toggle('active');
	this.dots[next].classList.toggle('active');
};

Slider.prototype.changeSlide = function(next) {
	for (var i = 0; i < this.slides.length; i++) {
		var diff = i - next,
			slide = this.slides[i];

		if (i === next) {
			this.toggleClasses(slide);
		} else if (i === this.currentSlideIdx) {
			this.toggleClasses(this.slides[this.currentSlideIdx]);
		}

		slide.style.left = (diff * this.containerWidth).toString() + 'px';
	}
};

Slider.prototype.init = function() {
	this.setButtonsEvents();
};

var s = new Slider(prevBtn, nextBtn, slides, dots, slidesContainer);
s.init();
