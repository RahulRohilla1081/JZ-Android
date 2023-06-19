import React, {useEffect} from 'react';
import MainLayout from './MainLayout';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {persistor, store} from './src/redux/store';
// import socketServices from './src/utils/SocketIO/socketService';
import RenderDataOnLoad from './src/utils/AxiosRoutes/RenderDataOnLoad';

const App = () => {
  // useEffect(() => {
  //   // SplashScreen.hide();
  //   socketServices.initializeSocket()
  //   socketServices.on('newMessage',(data)=>{
  //     console.log("data",data);
  //   });
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainLayout />
        <RenderDataOnLoad />
      </PersistGate>
    </Provider>
  );
};

export default App;
