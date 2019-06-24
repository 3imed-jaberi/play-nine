import React, { Component } from 'react'
import { Stars, Button , Answer , Numbers , ResultOfGame } from './GameElement';
import possibleCombinationSum from '../functions/possibleCombinationSum';

class Game extends Component {

  static randomNumber = () => 1 + Math.floor(Math.random()*9) ;
  static initState = () => ({
    selectedNumbers: [],
    randomNbOfStars: Game.randomNumber(),
    usedNumbers : [],
    answerIsCorrect: null,
    redraws: 5 ,
    doneStatus: null
  })
  state = Game.initState() ;
  // reset the game .. 
  resetGame = () => this.setState(Game.initState()) ;

  // a author function .. from bit.ly/s-pcs

  selectNumber = (clickedNumber) =>{
    // check the click in the numbers with index [ 0 ==> 8 ] .. 
    if (this.state.selectedNumbers.indexOf(clickedNumber) > -1 ) { return; }
        this.setState( oldState => ({
            answerIsCorrect:null,
            selectedNumbers : oldState.selectedNumbers.concat(clickedNumber)
        }));
  };

  unselectNumber = (clickedNumber) =>{
        this.setState( oldState => ({
            answerIsCorrect:null,
            selectedNumbers : oldState.selectedNumbers.filter(number => number !== clickedNumber)
        }));
  };

  checkAnswer = () => {
    this.setState(oldState => ({
      answerIsCorrect : oldState.randomNbOfStars === oldState.selectedNumbers.reduce((sum , currentValue ) => sum+currentValue , 0)
    }));
  };

  acceptAnswer = () => {
    this.setState(oldState => ({
      usedNumbers : oldState.usedNumbers.concat(oldState.selectedNumbers),
      selectNumber : [],
      answerIsCorrect : null,
      randomNbOfStars : Game.randomNumber()
    }), this.updatedDoneStatus);
  };

  redraw = () => {
    if (this.state.redraws === 0 ) { return ; }
    this.setState(oldState => ({
      randomNbOfStars : Game.randomNumber(),
      answerIsCorrect : null,
      selectedNumbers: [],
      redraws: oldState.redraws - 1 
    }),this.updatedDoneStatus);
  };



  possibleSolutions = ({randomNbOfStars , usedNumbers}) => {
    
    const MinInInterval = 0 ;
    const MaxInInterval = 9 ;
    let possibleNumbers = [] ;
    // i can use _.range with loadash or underscore but i use native js methods  .. 
    for (let count = MinInInterval ; count < MaxInInterval ; count++ ){
      possibleNumbers.push(count+1);
    };

    possibleNumbers = possibleNumbers.filter(number => usedNumbers.indexOf(number) === -1);

    return possibleCombinationSum(possibleNumbers , randomNbOfStars);
  }

  updatedDoneStatus = () => {
    this.setState(oldState  => {
      if (oldState.usedNumbers.length === 9){
        return { doneStatus: 'Done. Nice!'};
      }
      if (oldState.redraws === 0 && !this.possibleSolutions(oldState)){
        return { doneStatus: 'Game Over!'};
      }
    })
  }

  render() {
    const { 
            selectedNumbers ,
            randomNbOfStars , 
            answerIsCorrect , 
            usedNumbers , 
            redraws,
            doneStatus
          } = this.state ;
    return (
      <div className="container">
          <h3> Play Nine </h3>
          <hr/>
          <div className="row">
          <Stars nbOfStars={randomNbOfStars} />
          <Button 
               selectedNumbers={selectedNumbers} 
               redraws={redraws}
               checkAnswer={this.checkAnswer}
               acceptAnswer={this.acceptAnswer}
               redraw={this.redraw}
               answerIsCorrect={answerIsCorrect}
          />
          <Answer 
              selectedNumbers={selectedNumbers} 
              unselectNumber={this.unselectNumber} 
          />
          </div>
          <br/>
          {
            doneStatus 
                            ? 
            <ResultOfGame resetGame={this.resetGame} doneStatus={doneStatus} /> 
                            : 
            <Numbers  
              selectedNumbers={selectedNumbers} 
              selectNumber={this.selectNumber}  
              usedNumbers={usedNumbers} 
            />
          }
      </div>
    )
  }
}

export default Game ;