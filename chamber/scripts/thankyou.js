// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
        
// Extraer valores específicos
const firstName = urlParams.get('name');
const lastName = urlParams.get('lastname');
const orgTitle = urlParams.get('orgtitle');
const orgName = urlParams.get('org-name');
const email = urlParams.get('email');
const number = urlParams.get('number');
const level = urlParams.get('level');
const description = urlParams.get('business-description');
const date = urlParams.get('timestamp');

// Crear el mensaje de agradecimiento
const thankYouMessage = `Thank you, ${firstName} ${lastName}, for subscribing to our service!`;

// Mostrar el mensaje en el <p> con id "thankYouMessage"
document.getElementById('thankYouMessage').innerHTML = `
<p>${thankYouMessage}</p>
<p>We are glad to receive you here as ${orgTitle} from your company ${orgName}</p>
<p>Your contact data is:</p>
<p>Email: <span>${email}</span></p>
<p>Phone number: <span>${number}</span></p>
<p>Membership Level selected: ${level}</p>
<p>Description: ${description}</p>
<p>Date: ${date}</p>

`;