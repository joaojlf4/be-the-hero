import React, { useEffect, useState } from 'react';
import { Route, useHistory, Redirect } from 'react-router-dom';
import api from '../../services/api';


export default function PrivateRoute({ component: Component, ...rest }) {

  const history = useHistory();
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    login();
  }, [])

  async function login(){


    try{

      const response = await api.post('sessions/login', {
        id: localStorage.getItem('ongId')      
      })

      if(response.status === 200){
        localStorage.setItem('ongName', response.data.name);
        setIsLogged(true);
        setIsLoading(false);
      }else{
        setIsLoading(false);
        alert('Você precisa estar autenticado para acessar essa rota.')
        history.push('/')
      }
    }catch(err){
      setIsLoading(false);
      alert('Você precisa estar autenticado para acessar essa rota')
      history.push('/')
    }
  }

  return (
    <>
      {
        <Route
        {...rest} 
          render={props => 
          isLogged && !isLoading ? <Component {...props}/> : 
          isLoading ? <h1>Loading...</h1> : <Redirect to={{
            pathname: "/",
            state: { from: props.location }
          }}/>
        }/>
      }
    </>
  );
}
