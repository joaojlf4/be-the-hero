import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { Container, Header } from './styles';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import Logo from '../../assets/logo.svg';

export default function Profile() {

  const history = useHistory();
  
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    loadIncidents();
  }, []);

  async function loadIncidents(){
    try{
      const response = await api.get('incidents/own', {
        headers: {
          Authorization: localStorage.getItem('ongId')
        }
      })
      if(response.status === 200){
        setIncidents(response.data)
      }
    }catch(err){
      setIncidents([])
    }
  }
  async function handleDeleteIncident(id){
    try {
      await api.delete('incidents/' + id, {
        headers: {
          Authorization: localStorage.getItem('ongId')
        }
      })
      loadIncidents();
    } catch (err) {
      alert('Não foi possível excluir o caso.')
    }
  }

  async function handleLogout(){
    await localStorage.clear();
    history.push('/');
  }
  return (
    <Container>
      <Header>
        <img src={Logo} alt="Be The Hero"/>
        <span>Bem vinda, {localStorage.getItem('ongName')}</span>
    
        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041"/>
        </button>
      </Header>

      <h1>Casos Cadastrados</h1>

      <ul>
          {
            incidents.length > 0 ? 
            incidents.map(incident => <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>
  
              <strong>DESCRIÇÃO:</strong>
              <p>{incident.description}</p>
  
              <strong>VALOR:</strong>
              <p>{incident.value}</p>
  
              <button onClick={() => { handleDeleteIncident(incident.id) }} type="button">
                <FiTrash2 size={20} color="#A8A8B3"/>
              </button>
            </li>) : <p>Não há casos cadastrados</p>
          }
           {/*<li>
            <strong>CASO:</strong>
            <p>Caso teste</p>

            <strong>DESCRIÇÃO:</strong>
            <p>Descrição teste</p>

            <strong>VALOR:</strong>
            <p>100,00</p>

            <button onClick={} type="button">
              <FiTrash2 size={20} color="#A8A8B3"/>
            </button>
          </li>*/}
      </ul>
    </Container>
  );
}
