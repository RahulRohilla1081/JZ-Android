import {useEffect} from 'react';
import AXIOS from '../../utils/AxiosRoutes/AXIOS';
import axios from 'axios';
const nseStocksAction = () => dispatch => {
    // console.log('responseakdbhsajdb');

    // console.log(
    //   'AXIOS.axiosUrl+AXIOS.nse_stock_get',
    //   AXIOS.axiosUrl + AXIOS.nse_stock_get,
    // );

    axios.get(AXIOS.axiosUrl+AXIOS.nse_stock_get).then((response)=>{


        console.log('responseakdbhsajdb', response.data);
        dispatch({
          type: 'NSE_STOCK_DATA_UPDATE',
          nseStockData: response.data,
        });
    }).catch((err)=>{
        console.log(err);
    })

};

export default nseStocksAction;
