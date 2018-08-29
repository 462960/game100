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
    delay: 2000,
    isGameStarted: false,
    active: "",
    catched: "",
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

  prolongGame() {
    this.state.prolongID = setTimeout(() => {
      this.setState({
        active: getRandom(),
        catched: ""
      });
    }, this.state.delay);
  }

  userFailedInTime() {
    this.state.failID = setTimeout(() => {
      this.setState({
        catched: "fail",
        active: getRandom(),
        computerScore: this.state.computerScore + 1
      });
    }, this.state.delay);
  }

  componentDidUpdate() {
    const {
      isGameStarted,
      catched,
      active,
      computerScore,
      gamerScore,
      prolongID,
      failID
    } = this.state;

    // Case of high scores
    if (isGameStarted && (computerScore > 4 || gamerScore > 4)) {
      clearTimeout(prolongID);
      clearTimeout(failID);
      this.setState({
        isGameStarted: false
      });

      // Case of user clicked button
    } else if (
      typeof catched === "number" &&
      isGameStarted &&
      gamerScore < 5 &&
      computerScore < 5
    ) {
      clearTimeout(failID);
      clearTimeout(prolongID);
      this.prolongGame();

      //Case of user faled to click in time
    } else if (isGameStarted && gamerScore < 5 && computerScore < 5) {
      clearTimeout(failID);
      clearTimeout(prolongID);
      this.userFailedInTime();
    }

    // Modals conditional
    if (active && computerScore === 5) {
      setTimeout(() => {
        this.setState({
          active: "",
          catched: "",
          isModalOpen: true
        });
      }, 2500);

      setTimeout(() => {
        this.setState({
          isModalOpen: false
        });
      }, 4000);
    } else if (catched && gamerScore === 5) {
      setTimeout(() => {
        this.setState({
          active: "",
          catched: "",
          gamerWon: true,
          isModalOpen: true
        });
      }, 2500);

      setTimeout(() => {
        this.setState({
          gamerWon: false,
          isModalOpen: false
        });
      }, 4000);
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
    this.setState({
      active: "",
      catched: "",
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
