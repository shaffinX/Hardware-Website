import {ref, remove} from 'firebase/database';
import {database} from './firebase';
export default function Month()
{
    let date = new Date();
    if(date.getDate()===1){
        const refernce = ref(database,'Bill/')
        remove(refernce);        
    }
}