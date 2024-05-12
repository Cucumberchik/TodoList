

import { create } from 'zustand'
import axios from "axios"
import { api } from '../api'

type TypeList = {
    name: string,
    lastname:string,
    _id:number
}
interface AppStore {
    list:TypeList[],
    getLoading: boolean,
    postLoading: boolean,
    getData: (link:string) => void,
    postList: (link: string ,obj:TypeList) => void,
    deleteItem: (_id:number) => void
}

export const useStore = create<AppStore>((set)=>({
    list: [],
    getLoading: true,
    postLoading: false,
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
    }
}))