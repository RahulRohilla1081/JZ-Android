const initialState = {
  stocksArray: [],
  nseStockData:[],



 
};

const stocks = (state = initialState, action) => {
  switch (action.type) {
    case 'STOCKS_UPDATE':
      return {
        ...state,
        stocksArray: action.stocksArray,
      };
    case 'NSE_STOCK_DATA_UPDATE':
      return {
        ...state,
        nseStockData: action.nseStockData,
      };
   
    default:
      return state;
  }
};

export default stocks;
