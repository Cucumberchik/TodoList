import { FC, ReactElement, useState } from "react"

interface AppPropsDialog {
    onClause: () => void,
    status: string

}
const AddListDialog:FC<AppPropsDialog> = ({status, onClause}):ReactElement => {
    const [isLoadin, setIsLoading] = useState<boolean>(false);

  return (
    <section id="dialog" className={`diaolig_ ${status}`} onClick={onClause} >
        <div className="contant">
            <div className="contant_is" onClick={(e)=>e.stopPropagation()}>
                <div className="_container">
                    <h3>Add product</h3>
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Lastname" />

                    <div className="function_btns">
                        <button onClick={onClause} className="consel" >Consel</button>
                        <button className={"add" + (isLoadin ? " loading" : "")} >Add</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
export default AddListDialog