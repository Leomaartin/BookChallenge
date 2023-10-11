function getQueryParam(param) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(param);
}

document.addEventListener('DOMContentLoaded', function() {
    const error = getQueryParam('error');
    if (error) {
        if (error === 'pass') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Contraseña incorrecta.',
                footer: 'Por favor, intenta de nuevo.'
            });
        } else if (error === 'user') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario no encontrado.',
                footer: 'Por favor, registra una cuenta.'
            });
        } else if (error === 'server') {
            alert('Error en el servidor. Por favor, intenta de nuevo más tarde.');
        }
    }
});

