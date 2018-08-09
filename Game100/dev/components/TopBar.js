import React from "react";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import { GitHubIcon } from "./GitHubIcon";
import IconButton from "material-ui/IconButton";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";

// GitHub account link
const linkGitHub = "https://github.com/462960/game100";

export const TopBar = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <AppBar
      title="Game 100"
      iconElementRight={<IconButton />}
      iconElementLeft={
        <IconButton href={linkGitHub} target="blank">
          <GitHubIcon />
        </IconButton>
      }
    />
  </MuiThemeProvider>
);
