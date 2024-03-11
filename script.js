const url = "https://www.thecolorapi.com/scheme?";

fetchColors();


function fetchColors() {
    const selectedMode = document.getElementById("mode-opt").value;
    
    const inputColor = document.getElementById("color-input").value.slice(1);
    
    const endpoint = `${url}mode=${selectedMode}&hex=${inputColor}`;
    
    fetch(endpoint)
    .then((response) => response.json())
    .then((data) => { renderColors(data.colors) })
    .catch((err) => console.log(err));
}

function renderColors(colors) {
    const colorsContainer = document.getElementById("colors-container");
    colorsContainer.innerHTML = "";
    
    colors.forEach((color) => {
        const colorCode = color.hex.value;
        const newDiv = document.createElement("div");
        newDiv.className = "color";
        newDiv.setAttribute("data-color", colorCode);
        newDiv.innerHTML = `
        <div class="colored-div" 
        style="background-color:${colorCode}" 
        data-color="${colorCode}">
        </div>
        
        <div class="color-code">
        <p data-color="${colorCode}">${colorCode}</p>
        </div>`;
        colorsContainer.appendChild(newDiv);
    });
}

function showCopyNotify() {
    const notify = document.getElementById("copy-notify");
    notify.classList.add("active");
    setTimeout(()=> {
        notify.classList.remove("active");
    }, 2500)
}

document.addEventListener("click", (e) => {
    if (e.target.dataset.color) {
        navigator.clipboard.writeText(e.target.dataset.color);
        showCopyNotify()
    }    
})

document.getElementById("color-form").addEventListener("submit", (e) => {
    e.preventDefault();
    fetchColors();
});