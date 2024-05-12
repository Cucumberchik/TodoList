

import { useEffect, useState, type FC, type ReactElement } from 'react'
import { useStore } from '../zustand/store';

interface AppChangeDialog {
    status: string,
    _id: number,
    onClose: () => void
}

export const ChangeDialog:FC<AppChangeDialog> = ({status, _id, onClose}):ReactElement => {
    const [error, setError] = useState(false)
    const [list, setList] = useState({name:"", lastname:""});
    const [disibleState, setDisibleState] = useState<string>('')

    const {patchLoading, patchItem, getItem} = useStore(set=> set);

    useEffect(()=>{
        getItem(_id, setList)
    },[_id])

    const sendList = () => {
        if(!list.lastname || !list.name) {
            setError(true)
            setDisibleState('');
        };
        setDisibleState(' loading');
        patchItem(_id, list);

        setTimeout(()=>{onClose()},160)
        setDisibleState('');

    };



  return (
    <section id='dialog' className={`diaolig_ ${status}`}>
         <div className="contant">
            <div className="contant_is" onClick={(e)=>e.stopPropagation()}>
                <div className="_container">
                    <h3>Change product</h3>
                    <p style={{opacity: error ? "1" : "0", color: "#FF6166"}} >First or last name field is not filled in</p>
                    <input value={list.name} onChange={(e)=>setList({...list, name: e.target.value})} type="text" placeholder="Name" />
                    <input value={list.lastname} onChange={(e)=>setList({...list, lastname: e.target.value})} type="text" placeholder="Lastname" />

                    <div className="function_btns">
                        <button onClick={onClose} className="consel" >Consel</button>
                        <button onClick={sendList} disabled={patchLoading} className={"add" + disibleState} >Change</button>
                    </div>
                </div>
            </div>

        </div>
    </section>
  )
}
