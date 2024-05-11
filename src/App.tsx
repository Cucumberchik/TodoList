import { FC, ReactNode, useState } from 'react'
import AddListDialog from './components/Add_List'
import "./App.scss"

export const App:FC = ():ReactNode => {
  const [isDialog, setIsDialog] = useState<string>("disabled");

  return (
    <main>
      <AddListDialog status={isDialog} onClause={()=>setIsDialog("cloused")} />
      <div className="container">
        <button className='add_btn' onClick={()=>setIsDialog("opened")} >+ Add</button>
      </div>
    </main>
  )
}
