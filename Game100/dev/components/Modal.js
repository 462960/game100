import React from "react";
import Dialog from "material-ui/Dialog";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export class Modal extends React.Component {
  render() {
    const { gamerWon, isModalOpen } = this.props;

    return (
      <MuiThemeProvider>
        <Dialog open={isModalOpen}>
          {gamerWon ? (
            <div className="winner">Congrats! You're the winner!</div>
          ) : (
            <div className="loser">Sorry, you've lost the game...</div>
          )}
        </Dialog>
      </MuiThemeProvider>
    );
  }
}
