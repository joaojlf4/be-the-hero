import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { Container, Content } from './styles';
import { FiArrowLeft } from 'react-icons/fi';
import Logo from '../../assets/logo.svg';

export default function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();

    try{
      const response = await api.post('ongs', {
        name,
        email,
        whatsapp,
        city,
        uf  
      });
      localStorage.setItem('ongId', response.data.id);
      
      history.push('/profile')
    }catch(err){
      alert('Houve um erro no cadastro, tente novamente.')
    }
  } 

  return (
    <Container>
      <Content>
        <section>
          <img src={Logo} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </section>
        <form  onSubmit={handleRegister}>
          <input 
            value={name}
            onChange={e => setName(e.target.value)} 
            type="text" 
            placeholder="Nome da ONG"/>  
          
          <input
            value={email}
            onChange={e => setEmail(e.target.value)} 
            type="email" 
            placeholder="Email"/>  
          <input 
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            placeholder="Whatsapp"/>  
          <div>
            <input 
              value={city}
              placeholder="Cidade"
              onChange={e => setCity(e.target.value)}/>
            <input
              value={uf}
              onChange={e => setUf(e.target.value)} 
              placeholder="UF" 
              style={{ width: 80 }}/>
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </Content>
    </Container>
  );
}
