//The useReducer is here because we're gonna have 'global reducer' and this are some react libraier
import React,{ createContext, useReducer } from 'react'
//We pass our Reducer in here 
import AppReducer from './AppReducer'
import { type } from '@testing-library/user-event/dist/type';

//what have here in this State is what we can pass down to our components.

//initial State variable and in the variable we will need just one object.
//Note:Any global state will go into this object but the only one we need is our TRANSACTION.
const initialState = {
    //Note: As long as we have access to our transaction we can do some calculations in our components, like the 'balance' and others
  transaction:  []
}

//Create Context
//Here we're exporting GlobalContext cus we need them in other files and into components
export const GlobalContext = createContext(initialState);

//To give all components access to our GlobalState we need a 'Provider' like warpping all our components in a Provider.

//All our components will be 'children' since we're wrapping them all
export const GlobalProvider = ({ children }) => {

  //in here we need our useReducer so when we need to our useReducer action we use 'dispatch'
  //We pass our Reducer in useReducer And we can access 'State' values
  const [state, dispatch] = useReducer (AppReducer, initialState);

  //Actions that makes call to our reduces
  function deleteTransaction (id) {
    dispatch({
      type : 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction (transactions) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transactions,
    });
  }

  return (<GlobalContext.Provider value={{
    transaction: state.transaction,
    deleteTransaction,
    addTransaction
  }}> 
    { children }
  </GlobalContext.Provider>)
  //The 'Provider' provides 'State' and 'action' the components it is wrapped around.
}