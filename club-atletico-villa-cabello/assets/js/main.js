// Este archivo contiene el código JavaScript que añade interactividad a la página web.


async function validateForm(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    const asunto = document.getElementById('asunto').value;

    if (!nombre || !email || !mensaje || !asunto) {
        showNotification('Por favor, complete todos los campos', 'error');
        return false;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor, ingrese un correo electrónico válido', 'error');
        return false;
    }

    try {
        const response = await fetch('https://api.resend.com/v1/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer re_aKPingQF_6jjpNfBYCZK7AkZv968egkBi'
            },
            body: JSON.stringify({
                from: 'Club Villa Cabello <noreply@clubvillacabello.com>',
                to: ['djfernix@gmail.com'],
                subject: `Nuevo mensaje de contacto: ${asunto}`,
                html: `
                    <h2>Nuevo mensaje de contacto</h2>
                    <p><strong>Nombre:</strong> ${nombre}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Asunto:</strong> ${asunto}</p>
                    <p><strong>Mensaje:</strong></p>
                    <p>${mensaje}</p>
                `
            })
        });

        if (response.ok) {
            showNotification('¡Mensaje enviado con éxito!', 'success');
            document.getElementById('contactForm').reset();
        } else {
            throw new Error('Error al enviar el mensaje');
        }
    } catch (error) {
        showNotification('Error al enviar el mensaje. Por favor, intente más tarde.', 'error');
        console.error('Error:', error);
    }
}

// Función para mostrar notificaciones
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}