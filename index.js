function getLife(pipe) {
    const mDate = new Date(pipe.getAttribute('data-manufacture-date'));
    const currDate = new Date();
    const diff = currDate.getFullYear() - mDate.getFullYear();
    

    if (diff > 8) return 5;
    if (diff > 5) return 3;
    if (diff > 2) return 1;
    return 0;
}

function thickness(pipe){
    const width = pipe.offsetWidth;
    return (width < 6) ? 3 : 1;
}

function farmland(pipe){
    return pipe.classList.contains('farm') ? 3 : 0;
}

function tankarea(pipe){
    return pipe.classList.contains('neartank') ? 3 : 0;
}
function material(pipe){
    return pipe.classList.contains('plastic') ? 3 : 0;
}

