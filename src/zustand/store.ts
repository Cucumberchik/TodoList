

import { create } from 'zustand'
import axios from "axios"
import { api } from '../components/api'

type TypeList = {
    name: string,
    lastname:string
}
interface AppStore {
    list:TypeList[],
    getLoading: boolean,
    postLoading: boolean,
    getData: (link:string) => void,
    postList: (link: string ,obj:TypeList) => void
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
        }catch(e){}
        finally{
            set({postLoading: false});
        }
    }
}))