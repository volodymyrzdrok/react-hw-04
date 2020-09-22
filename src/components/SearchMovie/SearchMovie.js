import React, { useState } from 'react';
import styles from './SearchMovie.module.css';

const SearchMovie = ({ hendleChangeQuery }) => {
  const [value, setValue] = useState('');

  const hendleSubmit = e => {
    e.preventDefault();
    if (value.replace(/\s/g, '') === '') {
      return;
    } else {
      hendleChangeQuery(value);
      setValue('');
    }
  };

  const hendleChange = e => {
    setValue(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={hendleSubmit}>
      <input
        className={styles.searchInput}
        type="text"
        autoComplete="off"
        value={value}
        onChange={hendleChange}
        autoFocus
        placeholder="Search movie..."
      />
      <button className={styles.btn} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchMovie;

// import React, { Component, useState } from 'react';
// import styles from './SearchMovie.module.css';

// class SearchMovie extends Component {
//   state = {
//     value: '',
//   };

//   hendleSubmit = e => {
//     const { value } = this.state;
//     e.preventDefault();
//     if (value.replace(/\s/g, '') === '') {
//       return;
//     } else {
//       this.props.hendleChangeQuery(value);
//       this.setState({ value: '' });
//     }
//   };

//   hendleChange = e => {
//     this.setState({ value: e.target.value });
//   };

//   render() {
//     return (
//       <div>
//         <form className={styles.form} onSubmit={this.hendleSubmit}>
//           <input
//             className={styles.searchInput}
//             type="text"
//             autoComplete="off"
//             value={this.state.value}
//             onChange={this.hendleChange}
//             autoFocus
//             placeholder="Search movie..."
//           />
//           <button className={styles.btn} type="submit">
//             Search
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

// export default SearchMovie;
