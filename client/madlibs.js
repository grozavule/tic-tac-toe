const madlibForm = document.querySelector('form[name=madlib-selector]');
let madlibInput = document.querySelector('#stories');
const madlibContainer = document.querySelector('#madlib-container');

const submitMadlib = e => {
    e.preventDefault();
    madlib = madlibInput.value;

    let madlibResponses = [];
    let form = e.target;
    for(const elem of form.elements)
    {
        if(elem.tagName === 'INPUT' && elem.type !== 'submit')
        {
            let answer = {
                "id": elem.name.substring(elem.name.indexOf('-')),
                "type": elem.name.substring(0, elem.name.indexOf('-')),
                "value": elem.value
            };
            madlibResponses.push(answer);
        }
    }

    axios.post(`${BASE_URL}/api/madlibs/${madlib}/answers`, madlibResponses)
    .then(res => {
        madlibContainer.innerHTML = res.data.madlib;
    })
    .catch(error => {
        console.log(error);
    });
}

madlibForm.addEventListener('submit', e => {
    e.preventDefault();
    madlib = madlibInput.value;
    
    axios.get(`${BASE_URL}/api/madlibs/${madlib}`)
    .then(res => {
        let requirementsForm = document.createElement('form');
        requirementsForm.setAttribute('id', 'madlib-form');

        requirementsForm.addEventListener('submit', submitMadlib);

        res.data.requirements.forEach((requirement, index) => {
            let label = document.createElement('label');
            label.setAttribute('for', `${requirement}-${index}`);
            label.textContent = requirement;

            let input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('name', `${requirement}-${index}`);
            input.setAttribute('id', `${requirement}-${index}`);

            requirementsForm.appendChild(label);
            requirementsForm.appendChild(input);
        });
        let submitButton = document.createElement('input');
        submitButton.setAttribute('type', 'submit')
        submitButton.setAttribute('value', 'Save');
        requirementsForm.appendChild(submitButton);
        madlibContainer.appendChild(requirementsForm);
    })
    .catch(error => {
        console.log(error);
    });
})