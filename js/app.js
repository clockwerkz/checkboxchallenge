//TODO: move the error message to the top of the screen - when it errors out and returns back to the options list, the error message is lost.
//TODO: Handle opt out functionality
//TODO: Handle the anchor link to allow the user to return to their options and edit their choices or opt out

let options = {};

document.addEventListener("DOMContentLoaded", async ()=> {
    const optionsUL = document.querySelector('.options');  
    try {
        const res = await fetch('data.json');
        options = await res.json();
        optionsUL.innerHTML = displayOptions();
    } catch (err){
        console.log(err);
    }
});


//Form Submission Handling

function fakeFetch() {
    return new Promise((resolve, reject)=>{
       setTimeout(()=>{
           if (Math.random() < .80 ) {
                return resolve({msg: "Successfully submitted"});
           } 
           reject({error: "Server Error"})
       },2000)  
    })
}

document.querySelector(".email__form-control").addEventListener('submit', (e)=>{
    e.preventDefault();
    const optionsLI = document.querySelectorAll('.option__checkbox');
    const hasOneSelection = [...optionsLI].reduce((acc, option)=> option.checked || acc ? true : acc, false);
    if (!hasOneSelection) {
        return displayOptions("Please select at least 1 newsletter option.")
    }
    optionsLI.forEach(option => {
        if (option.checked) {
            const index = option.dataset.index;
            options[index].checked = true;
        }
    })
    displaySubmittingStatus();
})


// Loading Screens

function displaySubmittingStatus() {
    document.querySelector(".newsletters").classList.add("hide");
    document.querySelector(".loading").classList.remove("hide");
    fakeFetch()
    .then(res => {
        displaySubmissionStatus();
    })
    .catch(error => {
        console.log(error);
        displayOptions("There was an error with submission, please try again.")
    })
}

function displaySubmissionStatus() {
    document.querySelector(".loading").classList.add("hide");
    document.querySelector(".submission").classList.remove("hide");
    const selections = document.querySelector(".submission__options");
    selections.innerHTML = options.filter(option => option.checked).map(option => `<li class="submission__option">${option.title}</li>`).join('');

}


// Rendering Options

function displayOptions(error) {
    if (error) {
        setError(error);
    }
    document.querySelector(".newsletters").classList.remove("hide");
    document.querySelector(".loading").classList.add("hide");
    return options.map((option, idx) => displayOption({...option, idx})).join('');
}

function displayOption({ title, description, selected, idx}) {
    return `
        <li class="option">
            <div class="option__image"></div>
            <div class="option__body">
                <div class="option__title">${title}</div>
                <p class="option__text">${description}</p>
            </div> <!-- option__body -->
            <label class="option__wrapper">
                <input type="checkbox"  data-index="${idx}" class="option__checkbox"/>
            <span class="option__checkbox--custom"  ></span>
            </label> 
        </li>
    `;
}


// Error Display Handlers
clearError = (function() {
    let timer = null;
    return function() {
        if (timer === null) {
            timer = setInterval(() => {
                setError(''); 
                clearInterval(timer);
                timer=null;
            }, 2000);
        }
    }
})();

function setError(errorText) {
    document.querySelector(".email__error").textContent = errorText;
    clearError();
}









