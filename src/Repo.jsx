import axios from "axios";
import React, { Component } from "react";
import baseURL from "./api/github";
import { makeStyles, Grid } from "@material-ui/core";
import RepoCard from "./RepoCard";

export default class Repo extends Component {
  state = {
    repo: [],
    language: [],
  };

  async componentDidMount() {
    const api_key = process.env.REACT_APP_API_KEY;

    let repo = [
      baseURL(`SiconEPOS`),
      baseURL(`bevy-roguelike`),
      baseURL(`logue`),
      baseURL(`RustWebServer`),
    ];

    await axios
      .get("https://github-lang-deploy.herokuapp.com/")
      .then(async (res) => await this.setState({ language: res.data }));

    repo.map(
      async (url) =>
        await axios.get(url).then(async (res) => {
          await this.setState({
            repo: [...this.state.repo, res.data],
          });
        })
    );
  }


  render() {
    const { repo, language } = this.state;
    console.log(repo);
    return (
      <div>
        <Grid className="grid">
          {repo.map((data, i) => (
              <RepoCard repo={data} key={i} language={language} />
          ))}
        </Grid>
      </div>
    );
  }
}


const useStyles = makeStyles((theme) => ({
      grid: {
          padding: theme.spacing(8),
          margin: theme.spacing(8),
      }
}))