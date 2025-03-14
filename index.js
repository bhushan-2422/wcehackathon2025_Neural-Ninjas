// Toggle visibility for pipelines
document.querySelector('.pipelines').addEventListener('click', function(event) {
    event.preventDefault();
    
    const pipeContainer = document.querySelector('.pipe-container');
    const pipelinesLink = event.target;
    
    // Toggle visibility instead of display
    if (pipeContainer.style.visibility === 'hidden' || pipeContainer.style.visibility === '') {
        pipeContainer.style.visibility = 'visible';
    } else {
        pipeContainer.style.visibility = 'hidden';
    }

    pipelinesLink.classList.toggle('active');
});

// Calculate Life of Pipe
function getLife(pipe) {
    const manufactureDate = new Date(pipe.getAttribute('data-manufacture-date'));
    const currentDate = new Date();
    const diff = currentDate.getFullYear() - manufactureDate.getFullYear();
    

    if (diff > 8) return 5;
    if (diff > 5) return 3;
    if (diff > 2) return 1;
    return 0;
}

// Calculate Thickness
function getThickness(pipe) {
    const width = pipe.offsetWidth;
    return (width < 6) ? 3 : 1;
}

// Calculate Number of Joints
function getJoints(pipe) {
    const classList = Array.from(pipe.classList);
    const areaClass = classList.find(cls => cls.startsWith("area")); // Find class like "area1", "area2", etc.
    
    if (areaClass) {
        return document.querySelectorAll(`.${areaClass}`).length; // Count all elements with the same area class
    }
    
    return 0;
}

// Check if in Farmland
function isInFarmland(pipe) {
    return pipe.classList.contains('farm') ? 3 : 0;
}

// Check if near a tank
function isNearTank(pipe) {
    return pipe.classList.contains('neartank') ? 3 : 0;
}

// Check if plastic
function isPlastic(pipe) {
    return pipe.classList.contains('plastic') ? 3 : 0;
}


// Apply Color Based on Condition
function applyConditionColor(life, thickness, joints, farmland, neartank, plastic, pipe) {
    const sum = life + thickness + joints + farmland + neartank + plastic;
    
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




// Evaluate All Pipes
function evaluatePipes() {
    const pipes = document.querySelectorAll('.pipe');
    pipes.forEach(pipe => {
        const life = getLife(pipe);
        const thickness = getThickness(pipe);
        const joints = getJoints(pipe);
        const farmland = isInFarmland(pipe);
        const neartank = isNearTank(pipe);
        const plastic = isPlastic(pipe);

        applyConditionColor(life, thickness, joints, farmland, neartank, plastic, pipe);
    });
}

evaluatePipes();

//update card lists
 // Function to check if an <li> with the same text already exists in a list
function listContainsText(list, text) {
    return Array.from(list.children).some(li => li.textContent === text);
}

// Function to update each list dynamically
function updateLists() {
    for (let i = 1; i <= 10; i++) {
        const list = document.querySelector(`.list${i}`); // Select the corresponding list
        const areaElements = document.querySelectorAll(`.area${i}`); // Select corresponding divs

        let added = false; // Ensure only one entry per area group

        areaElements.forEach(pipe => {
            if (!added) {
                if (getLife(pipe) === 5 && !listContainsText(list, "Aged Pipeline:The pipeline was damaged primarily due to its age. Over time, the materials used in the pipeline structure weakened, leading to corrosion, rust buildup, and structural")) 
                    {
                    const li = document.createElement("li");
                    li.textContent = "Aged Pipeline:The pipeline was damaged primarily due to its age. Over time, the materials used in the pipeline structure weakened, leading to corrosion, rust buildup, and structural";
                    list.appendChild(li);
                }
                if (getThickness(pipe) === 3 && !listContainsText(list, "Thickness is less")) {
                    const li = document.createElement("li");
                    li.textContent = "Thickness is less";
                    list.appendChild(li);
                }
                if (getJoints(pipe) > 0) {
                    const text = `Joints: There are ${getJoints(pipe)} number of joints present in these area which leads to corrosion and rust.`;
                    if (!listContainsText(list, text)) {
                        const li = document.createElement("li");
                        li.textContent = text;
                        list.appendChild(li);
                    }
                }
                if (isInFarmland(pipe) === 3 && !listContainsText(list, "Farm: The pipeline is situated on a agriculture land due to pesticides used in agriculture the material of pipe is damaged.")) {
                    const li = document.createElement("li");
                    li.textContent = "Farm: The pipeline is situated on a agriculture land due to pesticides used in agriculture the material of pipe is damaged.";
                    list.appendChild(li);
                }
                if (isNearTank(pipe) === 3 && !listContainsText(list, "Placed near tank area")) {
                    const li = document.createElement("li");
                    li.textContent = "Placed near tank area";
                    list.appendChild(li);
                }
                if (isPlastic(pipe) === 3 && !listContainsText(list, "Material is plastic")) {
                    const li = document.createElement("li");
                    li.textContent = "Material is plastic";
                    list.appendChild(li);
                }

                added = true; // Stop further appending for multiple divs in the same group
            }
        });
    }
}

// Call the function to update all lists
updateLists();


// glow effect
let activeClass = null; // Track the currently glowing class

        // Function to remove glow from all classes
        const removeAllGlows = () => {
            for (let i = 1; i <= 10; i++) {
                document.querySelectorAll(`.area${i}`).forEach(div => {
                    div.classList.remove('glow');
                });
            }
            activeClass = null; // Reset active class
        };

        // Loop through all class names from area1 to area10
        for (let i = 1; i <= 10; i++) {
            const className = `area${i}`;
            
            // Get all divs with this class
            const areaDivs = document.querySelectorAll(`.${className}`);
            
            // Add click event listener to each div
            areaDivs.forEach(div => {
                div.addEventListener('click', (event) => {
                    event.stopPropagation(); // Stop event from bubbling up
                    
                    // Toggle glow only on the clicked group
                    if (activeClass === className) {
                        // If already active, turn off glow
                        removeAllGlows();
                    } else {
                        // Turn off glow for all, then activate the clicked group
                        removeAllGlows();
                        areaDivs.forEach(d => {
                            d.classList.add('glow');
                        });
                        activeClass = className;
                    }
                });
            });
        }

        // Click anywhere outside to remove all glows
        document.addEventListener('click', removeAllGlows);
    


//cards visibility code
document.addEventListener("DOMContentLoaded", function () {
    // Select all area elements
    const areas = {};
    for (let i = 1; i <= 10; i++) {
        areas[`area${i}`] = document.querySelectorAll(`.area${i}`);
    }
    
    // Select the card elements
    const cards = {};
    for (let i = 1; i <= 10; i++) {
        cards[`card${i}`] = document.querySelector(`.card${i}`);
        if (cards[`card${i}`]) {
            cards[`card${i}`].style.display = "none";
        }
    }

    // Function to hide all cards
    function hideCards() {
        for (let i = 1; i <= 10; i++) {
            if (cards[`card${i}`]) {
                cards[`card${i}`].style.display = "none";
            }
        }
    }

    // Add event listeners to each area group
    for (let i = 1; i <= 10; i++) {
        if (areas[`area${i}`]) {
            areas[`area${i}`].forEach(element => {
                element.addEventListener("click", function () {
                    hideCards(); // Hide all cards first
                    if (cards[`card${i}`]) {
                        cards[`card${i}`].style.display = "block"; // Show the corresponding card
                    }
                });
            });
        }
    }
});



//transfer data
// Save list items automatically to localStorage
window.onload = function () {
    let listItems = document.querySelectorAll(".list1 li");
    let itemsArray = [];

    listItems.forEach(item => {
        itemsArray.push(item.innerText);
    });

    localStorage.setItem("listData1", JSON.stringify(itemsArray));
    console.log("List saved to localStorage");


    //color
    let area1 = document.querySelector(".area1");
    if (area1) {
      let color = window.getComputedStyle(area1).backgroundColor;
      localStorage.setItem("savedColor1", color); // Store color in localStorage
    }

    //2
    let listItems2 = document.querySelectorAll(".list2 li");
    let itemsArray2 = [];

    listItems2.forEach(item => {
        itemsArray2.push(item.innerText);
    });

    localStorage.setItem("listData2", JSON.stringify(itemsArray2));
    console.log("List saved to localStorage");

    //color2

    let area2 = document.querySelector(".area2");
    if (area2) {
      let color = window.getComputedStyle(area2).backgroundColor;
      localStorage.setItem("savedColor2", color); // Store color in localStorage
    }

    //3
    let listItems3 = document.querySelectorAll(".list3 li");
    let itemsArray3 = [];

    listItems3.forEach(item => {
        itemsArray3.push(item.innerText);
    });

    localStorage.setItem("listData3", JSON.stringify(itemsArray3));
    console.log("List saved to localStorage");
    //color

    let area3 = document.querySelector(".area3");
    if (area3) {
      let color = window.getComputedStyle(area3).backgroundColor;
      localStorage.setItem("savedColor3", color); // Store color in localStorage
    }

    //4

    let listItems4 = document.querySelectorAll(".list4 li");
    let itemsArray4 = [];

    listItems4.forEach(item => {
        itemsArray4.push(item.innerText);
    });

    localStorage.setItem("listData4", JSON.stringify(itemsArray4));
    console.log("List saved to localStorage");
//color
    let area4 = document.querySelector(".area4");
    if (area4) {
      let color = window.getComputedStyle(area4).backgroundColor;
      localStorage.setItem("savedColor4", color); // Store color in localStorage
    }

    //5
    let listItems5 = document.querySelectorAll(".list5 li");
    let itemsArray5 = [];

    listItems5.forEach(item => {
        itemsArray5.push(item.innerText);
    });

    localStorage.setItem("listData5", JSON.stringify(itemsArray5));
    console.log("List saved to localStorage");
//color
    let area5 = document.querySelector(".area5");
    if (area5) {
      let color = window.getComputedStyle(area5).backgroundColor;
      localStorage.setItem("savedColor5", color); // Store color in localStorage
    }

    //6
    let listItems6 = document.querySelectorAll(".list6 li");
    let itemsArray6 = [];

    listItems6.forEach(item => {
        itemsArray6.push(item.innerText);
    });

    localStorage.setItem("listData6", JSON.stringify(itemsArray6));
    console.log("List saved to localStorage");
//color
    let area6 = document.querySelector(".area6");
    if (area6) {
      let color = window.getComputedStyle(area6).backgroundColor;
      localStorage.setItem("savedColor6", color); // Store color in localStorage
    }

    //7
    let listItems7 = document.querySelectorAll(".list7 li");
    let itemsArray7 = [];

    listItems7.forEach(item => {
        itemsArray7.push(item.innerText);
    });

    localStorage.setItem("listData7", JSON.stringify(itemsArray7));
    console.log("List saved to localStorage");
//color
    let area7 = document.querySelector(".area7");
    if (area7) {
      let color = window.getComputedStyle(area7).backgroundColor;
      localStorage.setItem("savedColor7", color); // Store color in localStorage
    }

    //8
    let listItems8 = document.querySelectorAll(".list8 li");
    let itemsArray8 = [];
    listItems8.forEach(item => {
        itemsArray8.push(item.innerText);
    });

    localStorage.setItem("listData8", JSON.stringify(itemsArray8));
    console.log("List saved to localStorage");
//color
    let area8 = document.querySelector(".area8");
    if (area8) {
      let color = window.getComputedStyle(area8).backgroundColor;
      localStorage.setItem("savedColor8", color); // Store color in localStorage

    }
      //9
      let listItems9 = document.querySelectorAll(".list9 li");
      let itemsArray9 = [];
  
      listItems9.forEach(item => {
          itemsArray9.push(item.innerText);
      });
  
      localStorage.setItem("listData9", JSON.stringify(itemsArray9));
      console.log("List saved to localStorage");
  //color
      let area9 = document.querySelector(".area9");
      if (area9) {
        let color = window.getComputedStyle(area9).backgroundColor;
        localStorage.setItem("savedColor9", color); // Store color in localStorage
      }

      //10
      let listItems10 = document.querySelectorAll(".list10 li");
    let itemsArray10 = [];

    listItems10.forEach(item => {
        itemsArray10.push(item.innerText);
    });

    localStorage.setItem("listData10", JSON.stringify(itemsArray10));
    console.log("List saved to localStorage");
//color
    let area10 = document.querySelector(".area10");
    if (area10) {
      let color = window.getComputedStyle(area10).backgroundColor;
      localStorage.setItem("savedColor10", color); // Store color in localStorage
    }
}