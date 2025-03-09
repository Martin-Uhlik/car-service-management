import React from 'react'
import ReactDOM from 'react-dom/client'
import { Pages } from './components/Pages'
import './styles/index.css'
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Pages />
    </RecoilRoot>
  </React.StrictMode>
)
