import React from 'react'
 import MermasForm from './MermasForm'
import MermasTable from './MermasTable'
import LossesProvider from '../../provider/LossesProvider'
const MermasPage = () => {

  return (
    <div>
      MermasPage
     <LossesProvider>
        <MermasForm />
        <MermasTable />
      </LossesProvider> 
    </div>
  )
}

export default MermasPage