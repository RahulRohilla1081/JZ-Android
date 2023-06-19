import  { useEffect } from 'react'
import socketServices from '../../utils/SocketIO/socketService';

const  stocksAction=()=>(dispatch)=> {
//    useEffect(() => {
     socketServices.initializeSocket();
     socketServices.on('newMessage', data => {
    //    console.log('data', data);
       dispatch({type: 'STOCKS_UPDATE', stocksArray: data.USER_DATA});
     });
//    }, []);
}

export default stocksAction