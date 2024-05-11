import { FC, ReactElement, useState } from "react"
import { useStore } from "../zustand/store";

interface AppPropsDialog {
    onClause: () => void,
    status: string
}
type TypeList = {
    name:string,
    lastname:string,
    _id:number
}
const AddListDialog:FC<AppPropsDialog> = ({status, onClause}):ReactElement => {
    const [list, setList] = useState<TypeList>({name:'', lastname:'', _id: new Date().getTime()});
    const [error, setError] = useState<boolean>(false)
    const {postLoading, postList} = useStore(set => set);

    const handleClose = () => {
        onClause();
        setError(false)
    }

    const sendList = () => {
        if(!list.lastname || !list.name){
            setError(true);
            return
        }
        setError(false);
        postList('/users', list);
        
        setTimeout(()=>{
            handleClose()
            setList({name:'', lastname:'', _id: new Date().getTime()})
        },1400)
    }
    const disibleState = postLoading ? " loading" : "";
    
    
  return (
    <section id="dialog" className={`diaolig_ ${status}`} onClick={onClause} >
        <div className="contant">
            <div className="contant_is" onClick={(e)=>e.stopPropagation()}>
                <div className="_container">
                    <h3>Add product</h3>
                    <p style={{opacity: error ? "1" : "0", color: "#FF6166"}} >First or last name field is not filled in</p>
                    <input onChange={(e)=>setList({...list, name: e.target.value})} type="text" placeholder="Name" />
                    <input onChange={(e)=>setList({...list, lastname: e.target.value})} type="text" placeholder="Lastname" />

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