module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        const fortunes = [
            "Open your mind and your heart to good things.",
            "Work with your destiny. Stop trying to outrun it.",
            "An exciting adventure awaits you.",
            "To achieve wisdom, you must first desire it.",
            "You can learn much from people who are different from you.",
            "Move quickly. Now is the time to make progress.",
            "Learn from your mistakes. Try not to make them again."
        ];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
      
        res.status(200).send(randomFortune);
    }
}