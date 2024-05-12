

import { create } from 'zustand'
import axios from "axios"
import { api } from '../api'

type TypeList = {
    name: string,
    lastname:string,
    _id:number
}
type TypeObj = {
    name: string,
    lastname:string,
}
interface AppStore {
    list:TypeList[],
    getLoading: boolean,
    postLoading: boolean,
    patchLoading: boolean,
    getData: (link:string) => void,
    postList: (link: string ,obj:TypeList) => void,
    deleteItem: (_id:number) => void,
    patchItem: (_id:number, obj:TypeObj) => void,
    getItem: (_id:number, setItem:any) => void

}

export const useStore = create<AppStore>((set)=>({
    list: [],
    getLoading: true,
    postLoading: false,
    patchLoading: false,

    getData: async (link) => {
        set({getLoading: true});

        try{
            const {data} = await axios(api + link);
            set({list: data});

        }catch(e){}
        finally{

            set({getLoading: false})
        }
    },
    postList: async(link, obj) => {

        set({postLoading: true});

        try{
            await axios.post(api + link, obj);
            const {data} = await axios(api + link);
            set({list: data});
        }catch(e){}
        finally{
            set({postLoading: false});
        }
    },
    deleteItem: async(_id) => {
        try{
            await axios.delete(api + "/users/" + _id);
            const {data} = await axios(api + "/users");
            set({list: data});

        }catch(e){
            console.log(e);
            
        }
    },
    patchItem: async(_id, obj) => {
        
        try{
            await axios.patch(api + "/users/" + _id, {name:obj.name, lastname: obj.lastname});
            const {data} = await axios(api + "/users");
            set({list: data});

        }catch(e){
            console.log(e);
            
        }
    },
    getItem: async(_id, setItem) => {
        try{
          let {data} =  await axios(api + "/users/" + _id);
          setItem(data)
        }catch(e){

        }
    }
}))