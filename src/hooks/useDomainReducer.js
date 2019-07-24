import {useState} from 'react';

export const FILTER_SHOW_ALL = 'FILTER_SHOW_ALL';
export const FILTER_SHOW_SUCCESS = 'FILTER_SHOW_SUCCESS';
export const FILTER_SHOW_FAIL = 'FILTER_SHOW_FAIL';

const useDomainReducer = (state, action) => {
   switch (action.type) {
      case FILTER_SHOW_ALL:
        return state;

      default:
         return state;
   }
};

export default useDomainReducer;

const [state, dispatch] = useReducer(reducer, initialState, init)