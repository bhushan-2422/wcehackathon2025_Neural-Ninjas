function getLife(pipe) {
    const mDate = new Date(pipe.getAttribute('data-manufacture-date'));
    const currDate = new Date();
    const diff = currDate.getFullYear() - mDate.getFullYear();
    

    if (diff > 8) return 5;
    if (diff > 5) return 3;
    if (diff > 2) return 1;
    return 0;
}

