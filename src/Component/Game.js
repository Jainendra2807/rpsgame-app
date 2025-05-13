import React, { useState } from 'react';
import Rock from '../images/rock1.png';
import Paper from '../images/paper1.png';
import Scissors from '../images/scissors1.png';
import '../Style/Game.css'
const Game = () => {

  //Choices Array
  const choices = [
    { name: "Rock", img: <img src={Rock} alt='' /> },
    { name: "Paper", img: <img src={Paper} alt='' /> },
    { name: "Scissors", img: <img src={Scissors} alt='' /> },
  ]

  //Handling User choices
  const [userChoice, setUserChoice] = useState(null);

  //Handling Computer choices
  const [computerChoice, setComputerChoice] = useState(null);

  //Handling Result
  const [result, setResult] = useState("");

  //Handling stats
  const [stats, setStats] = useState({ Won: 0, Lost: 0, Draw: 0 });

  //Game start here
  const playgame = (choice) => {
    setUserChoice(choice);
    const computer = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(computer)

    determineWinner(choice, computer)
  }
  const determineWinner = (user, computer) => {
    if (user.name === computer.name) {
      setResult("It is Draw");
      setStats({ ...stats, Draw: stats.Draw + 1 })
    }
    else if (
      (user.name === "Rock" && computer.name === "Scissors") ||
      (user.name === "Paper" && computer.name === "Rock") ||
      (user.name === "Scissors" && computer.name === "Rock")
    ) {
      setResult("Congrates,You Won");
      setStats({ ...stats, Won:stats.Won+1});
    }
    else{
      setResult("You Lost")
      setStats({...stats,Lost:stats.Lost+1});
    }
  }
  return (
    <>
      <div className='app'>
        <h1>Rock Paper Scissors</h1>
        {
          !userChoice ?
            (
              <div>
                <h2>Select Your Weapon</h2>
                <div className='choices'>
                  {
                    choices.map((choice) => {
                      return (
                        <>
                          <button className='choice_btn' onClick={() => playgame(choice)}>
                            {choice.img}
                            <span>{choice.name}</span>
                          </button>
                        </>
                      )
                    })
                  }
                </div>
              </div>
            ) :
            (
              <div className='result_screen'>
                <div className='hands'>
                  <div className='player_hand shake'>
                    {userChoice.img}
                  </div>
                  <div className='vs'>VS</div>
                  <div className='computer_hand shake'>
                    {computerChoice.img}
                  </div>
                </div>
                <h2>{result}</h2>
                <button className='play_again' onClick={() => setUserChoice(null)}>Play Again</button>
              </div>
            )
        }
        <div className='stats'>
          <div>Won:{stats.Won}</div>
          <div>Draw:{stats.Draw}</div>
          <div>Lost:{stats.Lost}</div>
        </div>
      </div>
    </>
  )
}

export default Game