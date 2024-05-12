import { FC, ReactNode, useEffect, useState } from 'react'
import AddListDialog from './components/Add_Dialog'
import "./App.scss"
import { useStore } from './zustand/store';
import { Spiner } from './icons/Spiner';
import { DeleteDialog } from './components/Delete_Dialog';
import { ChangeDialog } from './components/Change_Dialog';

interface AppList {
  name: string,
  lastname: string,
  _id:number 
}

type TypeState = {status: string, _id: number}

export const App:FC = ():ReactNode => {
  const [isDialog, setIsDialog] = useState<string>("disabled");
  const [isDelete, setIsDelete] = useState<TypeState>({status: 'disabled', _id: NaN})
  const [isChange, setIsChange] = useState<TypeState>({status: 'disabled', _id: NaN})

  const {list, getData, getLoading} = useStore(set => set);
  
  const handleGetData = () => {getData('/users')}

  useEffect(()=>{
    handleGetData()
  },[])

  return (
    <main>
      <ChangeDialog _id={isChange._id} onClose={()=>setIsChange({...isChange, status: "cloused"})} status={isChange.status}/>
      <AddListDialog status={isDialog} onClose={()=>setIsDialog("cloused")} />
      <DeleteDialog status={isDelete.status} onClose={()=>setIsDelete({...isDelete, status : "cloused"})} _id={isDelete._id} />
      <div className="container">
        <button className='add_btn' onClick={()=>setIsDialog("opened")} >+ Add</button>
        {getLoading ? <Spiner /> :
         list.map((el:AppList, id:number)=>(
          <div className="list_item" key={id} >
            <div className="information item">
              <h4>{el.name}</h4>
              <p>{el.lastname}</p>
            </div>
            <div className="function_btns item">
              <button onClick={()=>setIsChange({status:'opened', _id: el._id})} className='change_btn'>Change</button>
              <button onClick={()=>setIsDelete({status: "opened", _id: el._id})} className='delete_btn'>Delete</button>
            </div>
          </div>
         )) }
        
      </div>
    </main>
  )
}
