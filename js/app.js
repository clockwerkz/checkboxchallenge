const app = document.getElementById("app");
let render;
let Model = {};

document.addEventListener("DOMContentLoaded", async ()=> {
    render = View(app);   
    try {
        const res = await fetch('data.json');
        Model = await res.json();
        render.mainPage(Model);
    } catch (err){
        console.log(err);
    }
});




const Controller = (() => {
    const handleClickEvent = (e) => {
        e.preventDefault();
        const index = e.target.dataset.index;
        if (index !== undefined) {
            Model[index].selected = !Model[index].selected;
            return render.mainPage(Model);
        }
        if (e.target.classList.contains("btn")) {
            console.log('clicked', e.target.classList);
            render.submissionConfirmation(Model.filter(option => option.selected).map(op => op.title))
        }
    }

    return {
        handleClickEvent
    }
})();

app.addEventListener("click", (e)=> Controller.handleClickEvent);


const View = (app) => {
    const mainPage = (choices, error) => {
        app.innerHTML = `
            <div class="newsletters">
                <h1 class="newsletters__title">Newsletters</h1>
                <p class="newsletters__text">Select all the newsletters you'd like to receive</p>
                <ul class="choices">
                    ${choices.map((choice, idx) => displayChoice({...choice, idx})).join("")}
                </ul>
                ${emailForm(error)}
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

    const emailForm = (error) => {
        return `
        <div class="email">
                <form class="email__form-control">
                    <input type="email" class="email__input" id="user-email" placeholder="Enter email"/>
                    <button class="btn" type="submit">Subscribe</button>
                    <div class="email__option">
                        <input type="checkbox" id="opt-out" class="email__opt-out">
                        <label for="opt-out" class="email__text">I do not want to receive information about future newsletters.</label>
                    </div>
                </form>
            </div> <!-- email__form -->`;
    }

    const submissionConfirmation = (selections) => {
        console.log(selections);
        app.innerHTML = `<div class="submission">
                <h2 class="submission__title">Thanks for submitting!</h2>
                <p class="submission__text">You have subscribed to the following newsletters:</p>
                <ul class="submission__options">
                ${selections.map(selection =>(
                    `<li class="submission__option">${selection}</li>`
                ))}
                </ul>
                <p class="submission__opt-out">Click <a href="#">here</a> to edit your selections or opt out.</p>
            </div> <!-- submission -->`;
    }

    return {
        mainPage,
        submissionConfirmation
    }
}

