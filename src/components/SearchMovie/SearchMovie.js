import React, { Component } from "react";
import styles from "./SearchMovie.module.css";

class SearchMovie extends Component {
  state = {
    value: "",
  };

  hendleSubmit = (e) => {
    e.preventDefault();
    this.props.hendleChangeQuery(this.state.value);
    this.setState({ value: "" });
  };

  hendleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <div>
        <form className={styles.form} onSubmit={this.hendleSubmit}>
          <input
            className={styles.searchInput}
            type="text"
            autoComplete="off"
            value={this.state.value}
            onChange={this.hendleChange}
            autoFocus
            placeholder="Search movie..."
          />
          <button className={styles.btn} type="submit">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SearchMovie;
