let Model = {};

document.addEventListener("DOMContentLoaded", async ()=> {
    const choices = document.querySelector('.options');  
    try {
        const res = await fetch('data.json');
        Model = await res.json();
        choices.innerHTML = displayChoices(Model);
    } catch (err){
        console.log(err);
    }
});

function displayChoices(choices) {
    return choices.map((choice, idx) => displayChoice({...choice, idx})).join('');
}

document.querySelector(".email__form-control").addEventListener('submit', (e)=>{
    e.preventDefault();
    const choices = document.querySelectorAll('.choice__checkbox');
    choices.forEach(choice => {
        if (choice.checked) {
            const index = choice.dataset.index;
            Model[index].checked = true;
        }
    })
    displaySubmissionStatus();
})

function displaySubmissionStatus() {
    document.querySelector(".newsletters").classList.add("hide");
    document.querySelector(".submission").classList.remove("hide");
    const selections = document.querySelector(".submission__options");
    selections.innerHTML = Model.filter(option => option.checked).map(option => `<li class="submission__option">${option.title}</li>`).join('');

}

function displayChoice({ title, description, selected, idx}) {
    return `
        <li class="option">
            <div class="option__image"></div>
            <div class="option__body">
                <div class="option__title">${title}</div>
                <p class="option__text">${description}</p>
            </div> <!-- option__body -->
            <label class="option__wrapper">
                <input type="checkbox"  data-index="${idx}" class="option__checkbox"/>
                <span class="option__checkbox--custom" tabindex="0"></span>
            </label> 
        </li>
    `;
}








