import React, { Component } from "react";
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Typography,
  withStyles,
} from "@material-ui/core";

const useStyles = (theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    marginLeft: "40px",
    marginRight: "40px",
    fontFamily: "verdana",
    backgroundColor: "#44475a",
    boxShadow: "2px 2px 4px #000000",
  },
  card_title: {
    fontFamily: "verdana",
    color: "#bd93f9",
    textShadow: "2px 2px 4px #000000",
  },
  card_content: {
    fontFamily: "verdana",
    color: "#ffb86c",
    fontSize: "20px",
  },
  links: {
    color: "#50fa7b",
  },
});
// const classes = useStyles();

class RepoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {url: ""};
    }
  componentWillMount() {
    import(`./images/${this.props.repo.name.replace("-", "")}.png`).then(
      (image) => {
        this.setState({ url: image.default });
        console.log(image);
      }
    );
  }

  render() {
    const image = import(
      `./images/${this.props.repo.name.replace("-", "")}.png`
    );
    const {classes} = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          title={this.props.repo.name}
          className={classes.card_title}
        ></CardHeader>
        <CardContent>
          <Typography className={classes.card_content}>
            {this.props.repo.description}
          </Typography>
          <a href={this.props.repo.html_url} className={classes.links}>
            {this.props.repo.html_url}
          </a>
          <br></br>
          <img src={this.state.url} height={"70%"} width={"70%"} />
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(useStyles)(RepoCard);
