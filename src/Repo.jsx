import axios from "axios";
import React, { Component } from "react";
import baseURL from "./api/github";
import { Grid } from "@material-ui/core";
import RepoCard from "./RepoCard";

export default class Repo extends Component {
  state = {
    repos: [],
    language: [],
  };

  async componentDidMount() {
    let repoUrls = [
      baseURL(`SiconEPOS`),
      baseURL(`bevy-roguelike`),
      baseURL(`logue`),
      baseURL(`RustWebServer`),
      baseURL(`DeeperAndDeeper`),
    ];

    await axios
      .get("https://github-lang-deploy.herokuapp.com/")
      .then(async (res) => await this.setState({ language: res.data }));

    repoUrls.map(
      async (url) =>
        await axios.get(url).then(async (res) => {
          await this.setState({
            repos: [...this.state.repos, res.data],
          });
        })
    );
  }

  render() {
    const { repos, language } = this.state;

    if (repos.length < 5) {
      return null;
    }

    console.log(repos);
    return (
      <div>
        <Grid className="grid">
          {repos.map((data, i) => (
            <RepoCard repo={data} key={i} language={language} />
          ))}
        </Grid>
      </div>
    );
  }
}
