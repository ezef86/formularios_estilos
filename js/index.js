// Constantes
const stylesNames = [
	"./styles/estilos.css",
	"./styles/estilos-retro.css",
	"./styles/estilos-futuro.css",
];

// Funciones de ayuda
const removeOriginalStylesheet = () => {
	const styleToRemove = document.querySelector('link[rel="stylesheet"]');
	if (styleToRemove) {
		styleToRemove.remove();
	}
};

// ********************** Consigna 1: Cambiar hojas de estilos secuencialmente **********************
let currentStyle = 0;

const botonCambiarEstilos = document.getElementById("botonCambiarEstilos");
const toggleVideoVisibility = (isVisible) => {
	const video = document.getElementById("background-video");
	video.style.display = isVisible ? "block" : "none";
};

botonCambiarEstilos.addEventListener("click", () => {
	// Remove original stylesheet
	removeOriginalStylesheet();

	// Create a new stylesheet
	const styles = document.createElement("link");
	styles.rel = "stylesheet";
	styles.type = "text/css";

	// Reset localStorage and button styles
	localStorage.removeItem("currentStylesheetPath");
	botonRecordarEstilos.innerHTML = "Recordar Estilos";
	botonRecordarEstilos.classList.remove("botonRecordarPresionado");
	botonRecordarEstilos.classList.add("botonRecordarSinPresionar");
	document.getElementById("botonRecordarEstilos").disabled = false;

	// Select the stylesheet to apply
	if (currentStyle === 0) {
		styles.href = stylesNames[1];
		document.head.appendChild(styles);
		currentStyle = 1;

		selectHojasDeEstilos.value = "estilos-retro";
		document.getElementById("estilos-radio-retro").checked = true;
		toggleVideoVisibility(false); // Hide video
	} else if (currentStyle === 1) {
		styles.href = stylesNames[2];
		document.head.appendChild(styles);
		currentStyle = 2;

		selectHojasDeEstilos.value = "estilos-futuro";
		document.getElementById("estilos-radio-futuro").checked = true;
		toggleVideoVisibility(true); // Show video
	} else if (currentStyle === 2) {
		styles.href = stylesNames[0];
		document.head.appendChild(styles);
		currentStyle = 0;

		selectHojasDeEstilos.value = "estilos-predeterminados";
		document.getElementById("estilos-radio-predeterminado").checked = true;
		toggleVideoVisibility(false); // Hide video
	}
});

// ********************** Consigna Bonus 1: Cambiar hojas de estilos aleatoriamente **********************
const botonCambiarEstilosAleatorio = document.getElementById(
	"botonCambiarEstilosAleatorio"
);
botonCambiarEstilosAleatorio.addEventListener("click", () => {
	// Remove original stylesheet
	removeOriginalStylesheet();

	// Create a new stylesheet
	const styles = document.createElement("link");
	styles.rel = "stylesheet";
	styles.type = "text/css";

	// If there was a stylesheet path on the localStorage, remove it
	localStorage.removeItem("currentStylesheetPath");
	botonRecordarEstilos.innerHTML = "Recordar Estilos";
	botonRecordarEstilos.classList.remove("botonRecordarPresionado");
	botonRecordarEstilos.classList.add("botonRecordarSinPresionar");

	// Select a random stylesheet
	const randomNumber = Math.floor(Math.random() * 4);

	if (randomNumber === 3) {
		document.getElementById("botonRecordarEstilos").disabled = true;

		selectHojasDeEstilos.value = "sin-estilos";
		document.getElementById("estilos-radio-sin").checked = true;
		toggleVideoVisibility(false); // Hide video
		return;
	} else {
		document.getElementById("botonRecordarEstilos").disabled = false;

		if (randomNumber === 0) {
			styles.href = stylesNames[0];
			document.head.appendChild(styles);

			selectHojasDeEstilos.value = "estilos-predeterminados";
			document.getElementById("estilos-radio-predeterminado").checked = true;
			toggleVideoVisibility(false); // Hide video
		} else if (randomNumber === 1) {
			styles.href = stylesNames[1];
			document.head.appendChild(styles);

			selectHojasDeEstilos.value = "estilos-retro";
			document.getElementById("estilos-radio-retro").checked = true;
			toggleVideoVisibility(false); // Hide video
		} else if (randomNumber === 2) {
			styles.href = stylesNames[2];
			document.head.appendChild(styles);

			selectHojasDeEstilos.value = "estilos-futuro";
			document.getElementById("estilos-radio-futuro").checked = true;
			toggleVideoVisibility(true); // Show video
		}
	}
});

// ********************** Consigna Bonus 2: Recordar hojas de estilos **********************
const botonRecordarEstilos = document.getElementById("botonRecordarEstilos");

// Set button styles and set the current stylesheet if it was saved
const currentStylesheetPath = localStorage.getItem("currentStylesheetPath");
if (currentStylesheetPath) {
	// Remove original stylesheet
	removeOriginalStylesheet();

	// Create a new stylesheet
	const styles = document.createElement("link");
	styles.rel = "stylesheet";
	styles.type = "text/css";
	styles.href = currentStylesheetPath;
	document.head.appendChild(styles);

	botonRecordarEstilos.innerHTML = "Estilos Recordados";
	botonRecordarEstilos.classList.remove("botonRecordarSinPresionar");
	botonRecordarEstilos.classList.add("botonRecordarPresionado");
} else {
	botonRecordarEstilos.innerHTML = "Recordar Estilos";
	botonRecordarEstilos.classList.remove("botonRecordarPresionado");
	botonRecordarEstilos.classList.add("botonRecordarSinPresionar");
}

botonRecordarEstilos.addEventListener("click", () => {
	// Get the current stylesheet
	const currentStylesheetPath = localStorage.getItem("currentStylesheetPath");
	const allStyleSheets = document.styleSheets;
	let currentStyleSheetHref = "";

	for (let i = 0; i < allStyleSheets.length; i++) {
		if (allStyleSheets[i].href !== null) {
			currentStyleSheetHref = allStyleSheets[i].href;
		}
	}

	const styleSheetRelativePath =
		"./styles/" + currentStyleSheetHref.split("/").pop();

	if (currentStylesheetPath) {
		// Remove the saved stylesheet
		localStorage.removeItem("currentStylesheetPath");
		botonRecordarEstilos.innerHTML = "Recordar Estilos";
		botonRecordarEstilos.classList.remove("botonRecordarPresionado");
		botonRecordarEstilos.classList.add("botonRecordarSinPresionar");
	} else {
		// Save the current stylesheet
		localStorage.setItem("currentStylesheetPath", styleSheetRelativePath);
		botonRecordarEstilos.innerHTML = "Estilos Recordados";
		botonRecordarEstilos.classList.remove("botonRecordarSinPresionar");
		botonRecordarEstilos.classList.add("botonRecordarPresionado");
	}
});

// ********************** Consigna Bonus 3: Hojas de Estilos con elemento Select **********************
const selectHojasDeEstilos = document.getElementById("selectEstilos");

setTimeout(() => {
	let currentStyleSheetHref = "";
	const allStyleSheets = document.styleSheets;
	for (let i = 0; i < allStyleSheets.length; i++) {
		if (allStyleSheets[i].href !== null) {
			currentStyleSheetHref = allStyleSheets[i].href;
		}
	}

	const styleSheetRelativePath = currentStyleSheetHref.split("/").pop();

	if (styleSheetRelativePath === "estilos.css") {
		document.getElementById("botonRecordarEstilos").disabled = false;
		selectHojasDeEstilos.value = "estilos-predeterminados";
		document.getElementById("estilos-radio-predeterminado").checked = true;
		toggleVideoVisibility(false); // Hide video
	} else if (styleSheetRelativePath === "estilos-retro.css") {
		document.getElementById("botonRecordarEstilos").disabled = false;
		selectHojasDeEstilos.value = "estilos-retro";
		document.getElementById("estilos-radio-retro").checked = true;
		toggleVideoVisibility(false); // Hide video
	} else if (styleSheetRelativePath === "estilos-futuro.css") {
		document.getElementById("botonRecordarEstilos").disabled = false;
		selectHojasDeEstilos.value = "estilos-futuro";
		document.getElementById("estilos-radio-futuro").checked = true;
		toggleVideoVisibility(true); // Show video
	} else {
		document.getElementById("botonRecordarEstilos").disabled = true;
		selectHojasDeEstilos.value = "sin-estilos";
		document.getElementById("estilos-radio-sin").checked = true;
		toggleVideoVisibility(false); // Hide video
	}
}, 100);

selectHojasDeEstilos.addEventListener("change", function () {
	if (this.value === "sin-estilos") {
		document.getElementById("botonRecordarEstilos").disabled = true;
		removeOriginalStylesheet();
		document.getElementById("estilos-radio-sin").checked = true;
		toggleVideoVisibility(false); // Hide video
	} else if (this.value === "estilos-futuro") {
		removeOriginalStylesheet();
		const styles = document.createElement("link");
		styles.rel = "stylesheet";
		styles.type = "text/css";
		styles.href = stylesNames[2];
		document.head.appendChild(styles);
		document.getElementById("botonRecordarEstilos").disabled = false;
		document.getElementById("estilos-radio-futuro").checked = true;
		toggleVideoVisibility(true); // Show video

		// If there was a stylesheet path on the localStorage, remove it
		localStorage.removeItem("currentStylesheetPath");
		botonRecordarEstilos.innerHTML = "Recordar Estilos";
		botonRecordarEstilos.classList.remove("botonRecordarPresionado");
		botonRecordarEstilos.classList.add("botonRecordarSinPresionar");
	} else if (this.value === "estilos-retro") {
		removeOriginalStylesheet();
		const styles = document.createElement("link");
		styles.rel = "stylesheet";
		styles.type = "text/css";
		styles.href = stylesNames[1];
		document.head.appendChild(styles);
		document.getElementById("botonRecordarEstilos").disabled = false;
		document.getElementById("estilos-radio-retro").checked = true;
		toggleVideoVisibility(false); // Hide video

		// If there was a stylesheet path on the localStorage, remove it
		localStorage.removeItem("currentStylesheetPath");
		botonRecordarEstilos.innerHTML = "Recordar Estilos";
		botonRecordarEstilos.classList.remove("botonRecordarPresionado");
		botonRecordarEstilos.classList.add("botonRecordarSinPresionar");
	} else if (this.value === "estilos-predeterminados") {
		removeOriginalStylesheet();
		const styles = document.createElement("link");
		styles.rel = "stylesheet";
		styles.type = "text/css";
		styles.href = stylesNames[0];
		document.head.appendChild(styles);
		document.getElementById("botonRecordarEstilos").disabled = false;
		document.getElementById("estilos-radio-predeterminado").checked = true;
		toggleVideoVisibility(false); // Hide video

		// If there was a stylesheet path on the localStorage, remove it
		localStorage.removeItem("currentStylesheetPath");
		botonRecordarEstilos.innerHTML = "Recordar Estilos";
		botonRecordarEstilos.classList.remove("botonRecordarPresionado");
		botonRecordarEstilos.classList.add("botonRecordarSinPresionar");
	}
});

// ********************** Consigna Bonus 4: Hojas de Estilos con elemento Radio **********************
function changeRadioInput(event) {
	if (event.target.id === "estilos-radio-sin") {
		// document.getElementById('botonRecordarEstilos').disabled = true;
		// removeOriginalStylesheet();
		// selectHojasDeEstilos.value = "sin-estilos";

		document.getElementById("botonRecordarEstilos").disabled = true;
		removeOriginalStylesheet();
		selectHojasDeEstilos.value = "sin-estilos";
		document.getElementById("estilos-radio-sin").checked = true;
		toggleVideoVisibility(false); // Hide video
	} else if (event.target.id === "estilos-radio-futuro") {
		removeOriginalStylesheet();
		const styles = document.createElement("link");
		styles.rel = "stylesheet";
		styles.type = "text/css";
		styles.href = stylesNames[2];
		document.head.appendChild(styles);
		document.getElementById("botonRecordarEstilos").disabled = false;
		document.getElementById("estilos-radio-futuro").checked = true;
		selectHojasDeEstilos.value = "estilos-futuro";
		toggleVideoVisibility(true); // Show video

		// If there was a stylesheet path on the localStorage, remove it
		localStorage.removeItem("currentStylesheetPath");
		botonRecordarEstilos.innerHTML = "Recordar Estilos";
		botonRecordarEstilos.classList.remove("botonRecordarPresionado");
		botonRecordarEstilos.classList.add("botonRecordarSinPresionar");
	} else if (event.target.id === "estilos-radio-retro") {
		removeOriginalStylesheet();
		const styles = document.createElement("link");
		styles.rel = "stylesheet";
		styles.type = "text/css";
		styles.href = stylesNames[1];
		document.head.appendChild(styles);
		document.getElementById("botonRecordarEstilos").disabled = false;
		document.getElementById("estilos-radio-retro").checked = true;
		selectHojasDeEstilos.value = "estilos-retro";
		toggleVideoVisibility(false); // Hide video

		// If there was a stylesheet path on the localStorage, remove it
		localStorage.removeItem("currentStylesheetPath");
		botonRecordarEstilos.innerHTML = "Recordar Estilos";
		botonRecordarEstilos.classList.remove("botonRecordarPresionado");
		botonRecordarEstilos.classList.add("botonRecordarSinPresionar");
	} else if (event.target.id === "estilos-radio-predeterminado") {
		removeOriginalStylesheet();
		const styles = document.createElement("link");
		styles.rel = "stylesheet";
		styles.type = "text/css";
		styles.href = stylesNames[0];
		document.head.appendChild(styles);
		document.getElementById("botonRecordarEstilos").disabled = false;
		document.getElementById("estilos-radio-predeterminado").checked = true;
		selectHojasDeEstilos.value = "estilos-predeterminados";
		toggleVideoVisibility(false); // Hide video

		// If there was a stylesheet path on the localStorage, remove it
		localStorage.removeItem("currentStylesheetPath");
		botonRecordarEstilos.innerHTML = "Recordar Estilos";
		botonRecordarEstilos.classList.remove("botonRecordarPresionado");
		botonRecordarEstilos.classList.add("botonRecordarSinPresionar");
	}
}

document.querySelectorAll("input[name='radioEstilos']").forEach((input) => {
	input.addEventListener("change", (event) => {
		if (event.target.id === "estilos-radio-sin") {
			// document.getElementById('botonRecordarEstilos').disabled = true;
			// removeOriginalStylesheet();
			// selectHojasDeEstilos.value = "sin-estilos";

			document.getElementById("botonRecordarEstilos").disabled = true;
			removeOriginalStylesheet();
			selectHojasDeEstilos.value = "sin-estilos";
			document.getElementById("estilos-radio-sin").checked = true;
			toggleVideoVisibility(false); // Hide video
		} else if (event.target.id === "estilos-radio-futuro") {
			removeOriginalStylesheet();
			const styles = document.createElement("link");
			styles.rel = "stylesheet";
			styles.type = "text/css";
			styles.href = stylesNames[2];
			document.head.appendChild(styles);
			document.getElementById("botonRecordarEstilos").disabled = false;
			document.getElementById("estilos-radio-futuro").checked = true;
			selectHojasDeEstilos.value = "estilos-futuro";
			toggleVideoVisibility(true); // Show video

			// If there was a stylesheet path on the localStorage, remove it
			localStorage.removeItem("currentStylesheetPath");
			botonRecordarEstilos.innerHTML = "Recordar Estilos";
			botonRecordarEstilos.classList.remove("botonRecordarPresionado");
			botonRecordarEstilos.classList.add("botonRecordarSinPresionar");
		} else if (event.target.id === "estilos-radio-retro") {
			removeOriginalStylesheet();
			const styles = document.createElement("link");
			styles.rel = "stylesheet";
			styles.type = "text/css";
			styles.href = stylesNames[1];
			document.head.appendChild(styles);
			document.getElementById("botonRecordarEstilos").disabled = false;
			document.getElementById("estilos-radio-retro").checked = true;
			selectHojasDeEstilos.value = "estilos-retro";
			toggleVideoVisibility(false); // Hide video

			// If there was a stylesheet path on the localStorage, remove it
			localStorage.removeItem("currentStylesheetPath");
			botonRecordarEstilos.innerHTML = "Recordar Estilos";
			botonRecordarEstilos.classList.remove("botonRecordarPresionado");
			botonRecordarEstilos.classList.add("botonRecordarSinPresionar");
		} else if (event.target.id === "estilos-radio-predeterminado") {
			removeOriginalStylesheet();
			const styles = document.createElement("link");
			styles.rel = "stylesheet";
			styles.type = "text/css";
			styles.href = stylesNames[0];
			document.head.appendChild(styles);
			document.getElementById("botonRecordarEstilos").disabled = false;
			document.getElementById("estilos-radio-predeterminado").checked = true;
			selectHojasDeEstilos.value = "estilos-predeterminados";
			toggleVideoVisibility(false); // Hide video

			// If there was a stylesheet path on the localStorage, remove it
			localStorage.removeItem("currentStylesheetPath");
			botonRecordarEstilos.innerHTML = "Recordar Estilos";
			botonRecordarEstilos.classList.remove("botonRecordarPresionado");
			botonRecordarEstilos.classList.add("botonRecordarSinPresionar");
		}
	});
});
