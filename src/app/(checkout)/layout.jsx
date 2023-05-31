import React from 'react'
import Navbar from './components/navbar/Navbar'
import Toast from './Toast'
import Loader from '../components/loader/Loader'

export default function layout({ children }) {
  return (
    <div>
      <Loader />
      <Navbar />
      {children}
      <Toast />
    </div>
  );
}
