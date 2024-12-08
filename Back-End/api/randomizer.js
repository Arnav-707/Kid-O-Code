exports.randomizer = (questions) =>{
    let random =[];
    let length = questions.length;
        for (let i = 0; i < length; i++) {
            let random_index = Math.floor(Math.random()*(questions.length));
            random.push(questions[random_index]);
            let value = questions[random_index];
            let endpoint = questions[questions.length-1];
            questions[questions.length-1] = value;
            questions[random_index] = endpoint;
            questions.pop();  
        }
        return random;
}