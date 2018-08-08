import React from "react";
import { TopBar } from "Components/TopBar";
import { ErrorBoundary } from "Components/ErrorBoundary";
 import { GameBody } from "Components/GameBody";
 import { InteractiveBar } from "Components/InteractiveBar";

export class GameContainer extends React.Component{
  state = {
    gamerScore: 0,
    computerScore: 0,
    delay: 3000,
    isGameStarted: false,
    active: '',
    catched: ''
  }

  componentDidMount(){
    let units = [];
    for(let item = 1; item < 101; item++){
      units.push(item)
     }
    this.setState({
  units
})
  }

  getScore = (catched) => {
    const {active} = this.state;

    this.setState({
  catched
})

     if(active === catched){
      this.setState({
        gamerScore: this.state.gamerScore + 1
      })
    } else if(active !== catched){
      this.setState({
        computerScore: this.state.computerScore + 1
      })
    }
  }

  getValue = (e) =>{
    const {isGameStarted} = this.state;
    e.preventDefault();

    this.setState({
      [e.target.id]: e.target.value
    })

      if(isGameStarted){
        this.getScore(e.target.value)
        }
      }

  gameStart = () => {
    const {
      delay,
      computerScore,
      gamerScore
  } = this.state;


       this.setState({
      isGameStarted: true,
      active: Math.ceil(Math.random()*100)
    })

  setTimeout(() => {
      this.setState({
        isGameStarted: false,
        catched: ''
      })
    }, delay)
   }

  render(){

  return(
    <ErrorBoundary>
      <TopBar/>
      <div className="game-container">
        <InteractiveBar
        {...this.state}
        getValue={this.getValue}
        gameStart={this.gameStart}
        />
      <GameBody
      {...this.state}
      getValue={this.getValue}
      />
      </div>
      </ErrorBoundary>
    )
  }
}


