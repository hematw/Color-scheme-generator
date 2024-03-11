const url = "https://www.thecolorapi.com/scheme?";

document.getElementById("color-form").addEventListener("submit", (e) => {
    e.preventDefault();

    fetchAndRender();
});

fetchAndRender()

function fetchAndRender() {
    const selectedMode = document.getElementById("mode-opt").value;

    const inputColor = document.getElementById("color-input").value.slice(1);

    const endpoint = `${url}mode=${selectedMode}&hex=${inputColor}`;

    const colorsContainer = document.getElementById("colors-container");

    let colorsHtml = "";

    fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
            data.colors.forEach((color) => {
                colorsHtml += `
                <div class="color">
                    <div class="colored-div" style="background-color:${color.hex.value}" ></div>
                    <div class="color-code">
                        <p>${color.hex.value}</p>
                    </div>
                </div>
                `;
            });

            colorsContainer.innerHTML = colorsHtml;
        })
        .catch((err) => console.log(err));
}


function copyColorCode(e) {
    navigator.clipboard.writeText(copyText.value)
}