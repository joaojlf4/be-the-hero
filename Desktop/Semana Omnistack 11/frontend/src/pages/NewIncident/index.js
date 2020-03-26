import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { Container, Content } from './styles';
import { FiArrowLeft } from 'react-icons/fi';
import Logo from '../../assets/logo.svg';

export default function NewIncident() {

  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  async function handleSubmit(e){
    e.preventDefault();

    try{
      const response = await api.post('incidents', {
        title,
        description,
        value
      }, {
        headers: {
          Authorization: localStorage.getItem('ongId')
        }
      })
      if(response.status === 200){
        history.push('/profile')
      }else{
        alert('Falha na criação do caso.')
      }
    }catch(err){
      alert('Falha na criação do caso.')
    }
  }

  return (
    <Container>
      <Content>
        <section>
          <img src={Logo} alt="Be The Hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para que um herói o atenda.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para o início
          </Link>
        </section>
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)} 
            type="text" 
            placeholder="Título do caso"/>  
          <textarea 
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição" />
          
          <input 
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Valor em reais"/>  
        
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </Content>
    </Container>
  );
}
