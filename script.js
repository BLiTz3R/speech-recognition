window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
    // Create transcript array from speech
    const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    // Create a new paragraph on speech pause
    p.textContent = transcript;

    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }
    // Experimental actions
    if (transcript.includes('get the weather')) {
        getWeather();
    }
    if (transcript.includes('reload page')) {
        reloadPage();
    }
});

// Bind event listener again when speech stops
recognition.addEventListener('end', recognition.start);

// Run on load
recognition.start();

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// Get weather function - links to my WeatherJS app
const getWeather = debounce(function() {
	window.open('https://blitz3r.github.io/weatherjs/', '_blank');
}, 800);

// Function to reload page
const reloadPage = debounce(function() {
	window.location.href = window.location.href;
}, 800);