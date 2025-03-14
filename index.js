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

function getJoints(pipe) {
    const classList = Array.from(pipe.classList);
    const areaClass = classList.find(cls => cls.startsWith("area")); // Find class like "area1", "area2", etc.
    
    if (areaClass) {
        return document.querySelectorAll(`.${areaClass}`).length; // Count all elements with the same area class
    }
    
    return 0;
}

function colorcoding(life, thickness , joints, farm, tankarea, plastic, pipe){
    const sum = life + thickness + joints + farm + tankarea + plastic;
    
    if (sum > 9) {
        pipe.style.backgroundColor = 'red';
    } 
    else if (sum > 7 && sum <= 10) {
        pipe.style.backgroundColor = 'blue';
    } 
    else {
        pipe.style.backgroundColor = 'green';
    }
}



function evaluatePipes(){
    const pipes = document.querySelectorAll('.pipes');
    pipes.forEach(pipe => {
        const life = getLife(pipe);
        const thickness = thickness(pipe);
        const tankarea = tankarea(pipe);
        const plastic = material(pipe);
        const joints = getJoints(pipe);
        const farm = farmland(pipe);

        colorcoding(life, thickness, joints, farm, tankarea, plastic, pipe);
    });

}

evaluatePipes();