exports.index = async(req,res) => {
    const navigations = [
        {
            name: "Lunch Selector",
            path: "/logics/lunch-selection", 
            description: "You can eat Banku or Jollof for lunch. You will go for jollof if you took porridge or milo for breakfast. If you ate Kenkey for breakfast, then you will skip lunch. however you will eat Banku if you skipped breakfast.",
            date: "02/02/2022",
        },

        {
            name: "Number guessing game",
            path: "/logics/number-guess", 
            description: "I want you to create a simple guess the number type game. It should choose a random number between 1 and 100, then challenge the player to guess the number in 10 turns. After each turn the player should be told if they are right or wrong, and if they are wrong, whether the guess was too low or too high. It should also tell the player what numbers they previously guessed. The game will end once the player guesses correctly, or once they run out of turns. When the game ends, the player should be given an option to start playing again.",
            date: "02/02/2022",
        }
    ]
    await res.render('logics/index', {title: "Home", navigations})
}


exports.lunch = async(req,res) => {
    const output = "A decision on what to eat will show here"
    res.render('logics/lunch', {title: "Lunch-Selector", output})
}

exports.lunchDecision = async(req,res) => {
    console.log(req.body)
    const breakfast = req.body.breakfast;
    // console.log(breakfast)
    const output = lunchSelection(breakfast)
    res.render('logics/lunch', {title: "Lunch-Selector", output})
}
/**
 * 
 * @param {*} breakfast 
 * @returns lunch
 */
const lunchSelection = (breakfast) => {
    let lunch = ""
      if (breakfast == "porridge" || breakfast == "milo"){
          lunch = "Your lunch will be Jollof";
      }else if (breakfast == "Kenkey") {
          lunch = "Bossu you had kenkey for breakfast so no lunch for you";
      }else {
          lunch = "Since you skipped breakfast you need to eat heavy. You're eating Banku"
      }
      return lunch;
}

exports.numberGuess = async(req,res) => {
    res.render('logics/numberGuess', {title: "Number-Guess-Game"})
}

exports.numberGuessResult = async(req,res) => {
    
}