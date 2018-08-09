import React from "react";
import { TopBar } from "Components/TopBar";
import { ErrorBoundary } from "Components/ErrorBoundary";
 import { GameBody } from "Components/GameBody";
 import { InteractiveBar } from "Components/InteractiveBar";
 import {getRandom} from 'Helpers/helpers';

export class GameContainer extends React.Component{
  state = {
    gamerScore: 0,
    computerScore: 0,
    delay: 1000,
    isGameStarted: false,
    active: '',
    catched: '',
    gamerWon: false,
    isModalOpen: false
  }

  componentDidMount(){
    let units = [];
    for(let item = 1; item < 101; item++){
      units.push(item)
     }
    this.setState({
  units,
 })
  }

  componentDidUpdate(prevProps, prevState){
    if(
      (
        this.state.isGameStarted === true &&
        this.state.gamerScore !== prevState.gamerScore &&
      this.state.gamerScore < 5) || 
      (
        this.state.isGameStarted === true &&
        this.state.computerScore !== prevState.computerScore &&
        this.state.computerScore < 5)
    ){ 
    
    setTimeout(() => {
      this.setState({
      active: getRandom(),
      isGameStarted: true,
      catched: ''
     })
    }, this.state.delay)
    }

    if(
      this.state.catched !== prevState.catched &&
      this.state.computerScore === 5 
    
    ){
    setTimeout (() => { 
      console.log('Computer won!')
      this.setState({
        isGameStarted: false,
        active: '',
        catched: '',
        isModalOpen: true

      })}, this.state.delay*1.2)

      setTimeout(() => {
        this.setState({
         isModalOpen: false
        })
      }, this.state.delay*2)
    }

    if(
      this.state.catched !== prevState.catched &&
      this.state.gamerScore === 5
    ){
    setTimeout (() => { 
      console.log('Gamer won!')
      this.setState({
        isGameStarted: false,
        active: '',
        catched: '',
        gamerWon: true,
        isModalOpen: true

      })}, this.state.delay*1.2)

      setTimeout(() => {
        this.setState({
          gamerWon: false,
        isModalOpen: false
        })
      }, this.state.delay*2)
    }

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
    gamerScore: 0,
    computerScore: 0,
    isGameStarted: true,
    active: getRandom()
   })
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


