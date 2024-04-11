import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './loader.css'
import { RouterProvider } from 'react-router-dom';
import routes from './routes.jsx';
import Global from './providers/Global.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Global>
      <RouterProvider router={routes} />
    </Global>
  </React.StrictMode>,
)
