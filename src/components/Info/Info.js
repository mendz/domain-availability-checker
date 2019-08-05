import React, { useState } from 'react';
import SymbolsCheck from '../UI/SymbolsCheck/SymbolsCheck';

import classes from './Info.module.css';

import { reportFeedback } from '../../utils/setupErrorsTrack';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import githubMark from '../../assets/icons/github-mark-32px.png';

import useToggle from '../../hooks/useToggle';

const Info = () => {
   const [on, toggle] = useToggle();
   const [error, setError] = useState('');

   const report = () => {
      try {
         reportFeedback();
      } catch (error) {
         setError(error.message);
         toggle();
      }
   }

   return (
      <div className={classes.Info}>
         <h1>Legend</h1>
         <p>
            <SymbolsCheck type="success" /> - The domain is available.
         </p>
         <p>
            <SymbolsCheck type="fail" /> - The domain is unavailable.
         </p>
         <p>
            <SymbolsCheck type="error" /> - Something went wrong.
         </p>
         <hr />
         <footer className={classes.Footer}>
            <a
               href="https://github.com/mendz/domain-availability-checker"
               target="_blank"
               rel="noopener noreferrer"
               title="Site Github Repository">
               <img src={githubMark} alt="Github Mark" className={classes.GithubMark} />
            </a>
            <Button clicked={() => report()}>Report an issue</Button>
            <Modal closed={toggle} show={on}>
               <ErrorMessage error={error} />
            </Modal>
         </footer>
      </div>
   )
}

export default Info;
