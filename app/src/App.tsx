import React from 'react'
import AppProvider from './provider/AppProvider';
import AppHeader from './features/AppHeader/AppHeader';
import { app } from './firebaseConfig'

function App() {
  return (
    <AppProvider><AppHeader /></AppProvider>
  );
}

export default App;
