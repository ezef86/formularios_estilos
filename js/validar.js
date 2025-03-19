document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector(".formulario");

	form.addEventListener("submit", (event) => {
		event.preventDefault(); // Prevent default form submission

		let isValid = true;
		const errorMessages = [];

		// Validate "Nombre"
		const nombre = document.getElementById("nombre");
		if (nombre.value.trim() === "") {
			errorMessages.push("El campo 'Nombre' es obligatorio.");
			isValid = false;
		}

		// Validate "Apellido"
		const apellido = document.getElementById("apellido");
		if (apellido.value.trim() === "") {
			errorMessages.push("El campo 'Apellido' es obligatorio.");
			isValid = false;
		}

		// Validate "Documento"
		const documento = document.getElementById("documento");
		if (documento.value.trim() === "" || isNaN(documento.value)) {
			errorMessages.push("El campo 'Documento' debe ser un número válido.");
			isValid = false;
		}

		// Validate "Nacionalidad"
		const nacionalidad = document.getElementById("nacionalidad");
		if (nacionalidad.value === "seleccionar") {
			errorMessages.push("Debe seleccionar una nacionalidad.");
			isValid = false;
		}

		// Validate "Sexo"
		const sexo = document.querySelector("input[name='sexo']:checked");
		if (!sexo) {
			errorMessages.push("Debe seleccionar un sexo.");
			isValid = false;
		}

		// Validate "Teléfono"
		const telefono = document.getElementById("telefono");
		if (telefono.value.trim() === "" || isNaN(telefono.value)) {
			errorMessages.push("El campo 'Teléfono' debe ser un número válido.");
			isValid = false;
		}

		// Validate "Email"
		const email = document.getElementById("email");
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email.value.trim())) {
			errorMessages.push(
				"El campo 'Email' debe contener una dirección de correo válida."
			);
			isValid = false;
		}

		// Validate "Condiciones"
		const condiciones = document.getElementById("condiciones");
		if (!condiciones.checked) {
			errorMessages.push("Debe aceptar las condiciones.");
			isValid = false;
		}

		// Show all error messages in a single alert
		if (!isValid) {
			alert(errorMessages.join("\n"));
		} else {
			alert("Formulario enviado con éxito.");
			form.submit();
		}
	});
});
