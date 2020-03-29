import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './src/routes';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor='#7159c1'/>
      <Routes />
    </>
  );
}