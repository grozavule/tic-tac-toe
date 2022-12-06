const introForm = document.querySelector('form#introduction-form');
const introContainer = document.querySelector('#introduction');
const introInput = document.querySelector('#name');

const removeAllChildren = elem => {
    while(elem.lastChild)
    {
        elem.removeChild(elem.lastChild);
    }
}

const displayIntroductionForm = e => {
    removeAllChildren(introContainer);

    axios.get(`${BASE_URL}/api/introduction`)
    .then(res => {
        let name = res.data.name;

        let newForm = document.createElement('form');
        newForm.addEventListener('submit', updateName);
    
        let newLabel = document.createElement('label');
        newLabel.textContent = 'Change your name';
    
        let newInput = document.createElement('input');
        newInput.name = 'name';
        newInput.id = 'name';
        newInput.value = name;
    
        let newSubmitBtn = document.createElement('input');
        newSubmitBtn.type = 'submit';
        newSubmitBtn.value = 'Update';
    
        newForm.appendChild(newLabel);
        newForm.appendChild(newInput);
        newForm.appendChild(newSubmitBtn);
    
        introContainer.appendChild(newForm);
    });
}

const displayIntroduction = (name) => {
    removeAllChildren(introContainer);

    let heading = document.createElement('h1');
    heading.textContent = `Welcome, ${name}`;

    let changeNameBtn = document.createElement('button');
    changeNameBtn.textContent = 'Change Name';
    changeNameBtn.addEventListener('click', displayIntroductionForm);
    
    introContainer.appendChild(heading);
    introContainer.appendChild(changeNameBtn);
}


const updateName = e => {
    e.preventDefault();
    let name = document.querySelector('input#name').value;
    let nameObj = { "name": name };
    axios.put(`${BASE_URL}/api/introduction`, nameObj)
    .then(res => {
        console.log(res.data.name);
        displayIntroduction(res.data.name);
        alert(`Your name has been updated`);
    })
    .catch(error => {
        console.log(error);
    })
}

introForm.addEventListener('submit', e => {
    e.preventDefault();
    let name = introInput.value;
    let nameObj = { "name": name };
    axios.post(`${BASE_URL}/api/introduction`, nameObj)
    .then(res => {
        displayIntroduction(res.data.name);
    })
    .catch(error => {
        console.log(error);
    });
});