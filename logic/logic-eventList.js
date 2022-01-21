function emptyInput(){
    const inputSearch = document.getElementById('search_location');
    
    inputSearch.addEventListener('keyup', (e) =>{
        if (inputSearch.value=="") {
            const iconError = document.querySelector('.error-search');
            const msgError = document.querySelector('.error-message');

            iconError.style.visibility = 'hidden';
            msgError.style.visibility = 'hidden';
        }
    });
}

emptyInput();