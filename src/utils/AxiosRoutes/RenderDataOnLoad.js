import { View, Text } from 'react-native'
import {useEffect} from 'react'
import { connect } from 'react-redux';
import nseStocksAction from '../../redux/action/nseStockAction';


const RenderDataOnLoad = (props) => {
   
useEffect(()=>{
    props.nseStocksAction();
},[])
}


const mapStateToProps = state => ({
  IS_AUTH: state.auth.is_auth,

});
export default connect(mapStateToProps, {
  nseStocksAction,
})(RenderDataOnLoad);