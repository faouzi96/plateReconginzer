import React from 'react'
import { store } from '../store/store'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from '../routes/routes'

const AppProvider = ({children}: any) => {
  return (
    <Provider store={store}>
        {children}
        <RouterProvider router={router} />
        
    </Provider>
  )
}

export default AppProvider