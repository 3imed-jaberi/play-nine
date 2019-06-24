import React from 'react'

const Stars = (props) => {
  // let nbOfStars = 1 + Math.floor(Math.random()*9) ;
  let stars = [] ;
  for (let index=0 ; index < props.nbOfStars ; index++){
    stars.unshift(<i key={index} className="fa fa-star"></i>);
  }
  return (
    <div className="col-5">
         {stars}
    </div>
  )
}

const Button = (props) => {
  let button ; 
  switch (props.answerIsCorrect) {
    case true:
                button = <button className="btn btn-success" onClick={props.acceptAnswer}> <i className="fa fa-check"></i> </button> ;
      break;    
    case false:
                button = <button className="btn btn-danger"> <i className="fa fa-times"></i> </button> ;

      break;
  
    default:
                button = <button className="btn" onClick={props.checkAnswer} disabled={props.selectedNumbers.length === 0 }> = </button> ;
      break;
  }
  return (
    <div className="col-2 text-center">
        {button}
        <br/><br/>
        <button
          className="btn btn-warning btn-sm" 
          onClick={props.redraw}
          disabled={props.redraws === 0 }
        >
          <i className="fas fa-sync"></i> {props.redraws}
        </button>
    </div>
  )
}

const Answer = (props) => {
  return (
    <div className="col-5">
        { 
          props.selectedNumbers.map((number , index) => 
            <span key={index} onClick={() => props.unselectNumber(number)}>
               {number}
            </span> 
        )}
    </div>
  )
}

const Numbers = (props) => {
      const MinInInterval = 0 ;
      const MaxInInterval = 9 ;
      const arrayOfNumbers = [] ; 
    for (let count = MinInInterval ; count < MaxInInterval ; count++ ){
        arrayOfNumbers.push(count+1);
    };

    const numberClassName = (number) => {
      //
      if (props.usedNumbers.indexOf(number) > -1){
        return 'used';
      }
      //
      if (props.selectedNumbers.indexOf(number) > -1){
        return 'selected';
      }
    };


  return (
    <div className="bborder text-center">
        {
          arrayOfNumbers.map( (number , index) => 
          <span key={index} 
              className={numberClassName(number)}
              onClick={() => props.selectNumber(number)}
          >{number}</span> 
        )}
    </div>
  )
};

const ResultOfGame = (props) => {
 
  return (
    <div className="text-center" >
      <h2>{props.doneStatus}</h2>
      <button className="btn btn-secondary" onClick={props.resetGame} > Play Again </button>
    </div>
  )
};

export { Stars , Button , Answer , Numbers , ResultOfGame } ;