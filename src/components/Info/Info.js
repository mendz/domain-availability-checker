import React from 'react';
import SymbolsCheck from '../UI/SymbolsCheck/SymbolsCheck';

import classes from './Info.module.css';

import { reportFeedback } from '../../utils/setupErrorsTrack';
import githubMark from '../../assets/icons/github-mark-32px.png';

const Info = () => {
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
         <h2>DISCLAIMER</h2>
         <p>
            <small>Currently, the site is using a DNS check to find if the domain has IPs or not, therefore sometimes the result could be false positive.</small>
         </p>
         <footer className={classes.Footer}>
            <a
               href="https://github.com/mendz/domain-availability-checker"
               target="_blank"
               rel="noopener noreferrer"
               title="Site Github Repository">
               <img src={githubMark} alt="Github Mark" />
            </a>
            <button onClick={() => reportFeedback()}>Report an issue</button>
         </footer>
      </div>
   )
}

export default Info;
