let username = '';

module.exports = {
    getName: (req, res) => {
        res.status(200).send({ "name": username });
    },    
    saveName: (req, res) => {
        username = req.body.name;
        res.status(200).send(req.body);
    },
    updateName: (req, res) => {
        console.log(req.body);
        username = req.body.name;
        res.status(200).send({ "name": username });
    }
}