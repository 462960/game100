import React from "react";
import { TopBar } from "Components/TopBar";
import { ErrorBoundary } from "Components/ErrorBoundary";
 import { GameBody } from "Components/GameBody";
 import { InteractiveBar } from "Components/InteractiveBar";

export class GameContainer extends React.Component{
  state = {
    gamerScore: 0,
    computerScore: 0
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

  clickActive = (e) =>{
    this.setState({
     // [e.target.id]
     gamerScore: this.state.gamerScore + 1
    })
console.log(e.target.value)
  }

  render(){

    console.log(this.state.gamerScore)
    return(
    <ErrorBoundary>
      <TopBar/>
      <div>
        <InteractiveBar/>
      <GameBody
      {...this.state}
      clickActive={this.clickActive}
      />
      </div>
      </ErrorBoundary>
    )
  }
}


