function emptyInput(){
    const inputSearch = document.getElementById('search_location');
    const valueAnt = inputSearch.value;

    inputSearch.addEventListener('keyup', (e) =>{
        if (inputSearch.value !== valueAnt) {
            const iconError = document.querySelector('.error-search');
            const msgError = document.querySelector('.error-message');

            iconError.style.visibility = 'hidden';
            msgError.style.visibility = 'hidden';
        }
    });
}

emptyInput();