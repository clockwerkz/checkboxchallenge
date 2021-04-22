const app = document.getElementById("app");
let render;
let Model = {};

document.addEventListener("DOMContentLoaded", async ()=> {
    render = View(app);   
    try {
        const res = await fetch('data.json');
        Model = await res.json();
        render.mainPage(Model);
    } catch {

    }
});

app.addEventListener("click", (e)=> {
    e.preventDefault();
    const index = e.target.dataset.index;
    if (index !== undefined) {
        Model[index].selected = !Model[index].selected;
        render.mainPage(Model);
    }
});


const View = (app) => {
    const mainPage = (choices) => {
        console.log("Model",choices);
        app.innerHTML = `
            <div class="newsletters">
                <h1 class="newsletters__title">Newsletters</h1>
                <p class="newsletters__text">Select all the newsletters you'd like to receive</p>
                <ul class="choices">
                    ${choices.map((choice, idx) => displayChoice({...choice, idx})).join("")}
                </ul>
            </div> <!-- newsletters -->
        `;
    }

    const displayChoice = ({ title, description, selected, idx }) => {
        return `
            <li class="choice">
                <div class="choice__image"></div>
                <div class="choice__body">
                    <div class="choice__title">${title}</div>
                    <p class="choice__text">${description}</p>
                </div> <!-- choice__body -->
                <input type="checkbox" data-index=${idx} ${selected ? "checked": ""}/>
            </li>
        `;
    }

    return {
        mainPage
    }
}

