const AddStocksInWatchList = (WatchlistName,StocksData) => dispatch => {

    // console.log('WatchlistNameasds', WatchlistName);

    dispatch({type: WatchlistName, payload: StocksData});

};

export default AddStocksInWatchList;
