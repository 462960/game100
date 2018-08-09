import React from "react";
import { TopBar } from "Components/TopBar";
import { ErrorBoundary } from "Components/ErrorBoundary";
import { GameBody } from "Components/GameBody";
import { InteractiveBar } from "Components/InteractiveBar";
import { Modal } from "Components/Modal";
import { getRandom } from "Helpers/helpers";

export class GameContainer extends React.Component {
  state = {
    gamerScore: 0,
    computerScore: 0,
    delay: 3000,
    isGameStarted: false,
    active: "",
    catched: "c",
    gamerWon: false,
    isModalOpen: false
  };

  componentDidMount() {
    let units = [];
    for (let item = 1; item < 101; item++) {
      units.push(item);
    }
    this.setState({
      units
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Case of user clicked button
    if (
      (this.state.catched !== prevState.catched &&
        this.state.catched !== "lost" &&
        this.state.isGameStarted &&
        this.state.gamerScore !== prevState.gamerScore &&
        this.state.gamerScore < 5) ||
      (this.state.catched !== prevState.catched &&
        this.state.catched !== "lost" &&
        this.state.isGameStarted &&
        this.state.computerScore !== prevState.computerScore &&
        this.state.computerScore < 5)
    ) {
      setTimeout(() => {
        this.setState({
          active: getRandom(),
          catched: ""
        });
      }, this.state.delay / 2);
    }

    // Case of user failed to click in time
    setTimeout(() => {
      if (
        this.state.isGameStarted &&
        this.state.catched !== "lost" &&
        //  this.state.active !== prevState.active &&
        this.state.catched === prevState.catched &&
        this.state.computerScore < 5 &&
        this.state.gamerScore < 5
        //  this.state.gamerScore === prevState.gamerScore
      ) {
        console.log("Lost case");
        this.setState({
          catched: "lost",
          computerScore: this.state.computerScore + 1
        });
      }
    }, this.state.delay);

    setTimeout(() => {
      if (
        this.state.isGameStarted &&
        this.state.catched === "lost" &&
        // this.state.active !== prevState.active &&
        // this.state.catched === prevState.catched &&
        this.state.computerScore < 5 &&
        this.state.gamerScore < 5
        // this.state.gamerScore === prevState.gamerScore
      ) {
        console.log("After Lost lounch case");
        this.setState({
          catched: "c",
          active: getRandom()
        });
      }
    }, this.state.delay);

    //  if(this.state.catched === 'lost'){
    //    setTimeout(() => {
    //       this.setState({
    //     catched: 'c',

    //    })
    //    }, this.state.delay/2)

    //    setTimeout(() => {
    //     this.setState({
    //   catched: 'c',
    //   active: getRandom(),
    //  })
    //  }, this.state.delay)

    //  }

    // Modals conditional
    if (
      this.state.catched !== prevState.catched &&
      this.state.computerScore === 5
    ) {
      this.setState({
        isGameStarted: false,
        active: "",
        catched: "",
        isModalOpen: true
      });

      setTimeout(() => {
        this.setState({
          isModalOpen: false
        });
      }, 2000);
    }

    if (
      this.state.catched !== prevState.catched &&
      this.state.gamerScore === 5
    ) {
      this.setState({
        isGameStarted: false,
        active: "",
        catched: "",
        gamerWon: true,
        isModalOpen: true
      });

      setTimeout(() => {
        this.setState({
          gamerWon: false,
          isModalOpen: false
        });
      }, 2000);
    }
  }

  getScore = catched => {
    const { active } = this.state;

    this.setState({
      catched
    });

    if (active === catched) {
      this.setState({
        gamerScore: this.state.gamerScore + 1
      });
    } else if (active !== catched) {
      this.setState({
        computerScore: this.state.computerScore + 1
      });
    }
  };

  getValue = e => {
    const { isGameStarted } = this.state;
    e.preventDefault();

    this.setState({
      [e.target.id]: e.target.value
    });

    if (isGameStarted) {
      this.getScore(e.target.value);
    }
  };

  gameStart = () => {
    const { delay, computerScore, gamerScore } = this.state;

    this.setState({
      gamerScore: 0,
      computerScore: 0,
      isGameStarted: true,
      active: getRandom()
    });
  };

  render() {
    const { gamerWon, isModalOpen } = this.state;

    return (
      <ErrorBoundary>
        <TopBar />
        <div className="game-container">
          <Modal gamerWon={gamerWon} isModalOpen={isModalOpen} />
          <InteractiveBar
            {...this.state}
            getValue={this.getValue}
            gameStart={this.gameStart}
          />
          <GameBody {...this.state} getValue={this.getValue} />
        </div>
      </ErrorBoundary>
    );
  }
}
