let madlibAnswers = {};

const getMadlib = tag => {
    switch(tag)
    {
        case 'dear-santa':
            return require('./madlibs/dear-santa.json');
            break;
        case 'going-to-grandmas':
            return require('./madlibs/going-to-grandmas.json');
        default:
            return {};
            break;
    }
}

module.exports = {
    getMadlib: (req, res) => {
        let madlib = req.params.madlib;
        madlibObj = getMadlib(madlib);

        if(madlibObj.requirements)
        {
            res.status(200).send(madlibObj);
        }
        else
        {
            res.status(400).send(`The requested madlib could not be found`);
        }
    },
    saveAnswers: (req, res) => {
        let madlib = req.params.madlib;
        madlibObj = getMadlib(madlib);

        if(madlibObj.text)
        {
            let updatedMadlibText = madlibObj.text;
            madlibAnswers = req.body;
            req.body.forEach(answer => {
                updatedMadlibText = updatedMadlibText.replace(`{${answer.type}}`, answer.value);
                updatedMadlibText = updatedMadlibText.replaceAll('\n', '<br/>');
            });
            let madlib = {
                "madlib": updatedMadlibText
            }
            res.status(200).send(madlib);
        }
        else
        {
            res.status(400).send(`The requested madlib, ${madlib}, could not be found`);
        }
    }
}