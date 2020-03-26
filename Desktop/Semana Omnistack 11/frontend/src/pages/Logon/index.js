import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { Container, FormSection } from './styles';
import Heroes from '../../assets/heroes.png';
import Logo from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';

export default function Logon() {

  const history = useHistory();

  const [id, setId] = useState('');

  async function handleLogin(e){
    e.preventDefault();

    try{
      const response = await api.post('sessions/login', {
        id     
      })
      if(response.status === 200){
        localStorage.clear();
        localStorage.setItem('ongId', id)
        history.push('/profile')
      }else{
        alert('Identificação inválida.')
      }
    }catch(err){
      alert('Identificação inválida.')
    }
  }
  useEffect(() => {
    if(localStorage.getItem('ongId')){
      history.push('/profile');
    }
  }, [history]);

  return (
    <Container>
      <FormSection>
        <img src={Logo} alt="Be The Hero"/>
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            value={id}
            onChange={e => setId(e.target.value)} 
            placeholder="Sua ID"
            />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </FormSection>
      <img src={Heroes} alt="Heroes"/>
    </Container>
  );
}
