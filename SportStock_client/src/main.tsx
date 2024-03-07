import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'
import { persistor, store } from './redux/Store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router}></RouterProvider>
      </PersistGate>
  </Provider>
  <Toaster richColors toastOptions={{}} />
</React.StrictMode>
)
