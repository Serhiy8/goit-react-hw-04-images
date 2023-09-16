import { Component } from 'react';
import css from './searchbar.module.css';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChangeInput = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue.trim());
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmitForm}>
          <button type="submit" className={css.SearchFormButton}>
            Search
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleChangeInput}
          />
        </form>
      </header>
    );
  }
}
