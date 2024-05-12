import { FC, ReactElement, useState } from "react"
import { useStore } from "../zustand/store";

interface AppPropsDialog {
    onClose: () => void,
    status: string
}
const AddListDialog:FC<AppPropsDialog> = ({status, onClose}):ReactElement => {
    const [list, setList] = useState<any>({name:'', lastname:''});
    const [error, setError] = useState<boolean>(false)
    const {postLoading, postList} = useStore(set => set);

    const handleClose = () => {
        onClose();
        setError(false)
    }

    const sendList = () => {
        if(!list.lastname || !list.name){
            setError(true);
            return;
        }
        setError(false);
        postList('/users', list);
        
        setTimeout(()=>{
            handleClose()
            setList({name:'', lastname:''})
        },180)
    }
    const disibleState = postLoading ? " loading" : "";
    
    
  return (
    <section id="dialog" className={`diaolig_ ${status}`} onClick={onClose} >
        <div className="contant">
            <div className="contant_is" onClick={(e)=>e.stopPropagation()}>
                <div className="_container">
                    <h3>Add product</h3>
                    <p style={{opacity: error ? "1" : "0", color: "#FF6166"}} >First or last name field is not filled in</p>
                    <input value={list.name} onChange={(e)=>setList({...list, name: e.target.value})} type="text" placeholder="Name" />
                    <input value={list.lastname} onChange={(e)=>setList({...list, lastname: e.target.value})} type="text" placeholder="Lastname" />

                    <div className="function_btns">
                        <button onClick={handleClose} className="consel" >Consel</button>
                        <button onClick={sendList} disabled={postLoading} className={"add" + disibleState} >Add</button>
                    </div>
                </div>
            </div>

        </div>
    </section>
  )
}
export default AddListDialog