const initialState = {
  watchlist1: [{
    name:"abcdef"
  }],
  watchlist2: [],
  watchlist3: [],
  watchlist4: [],
  watchlist5: [],
  watchlist6: [],
  watchlist7: [],
};

const watchlist = (state = initialState, action) => {
  switch (action.type) {
    case 'Watchlist1':
      return {
        ...state,
        watchlist1: action.payload,
      };
    case 'Watchlist2':
      return {
        ...state,
        watchlist2: action.payload,
      };
    case 'Watchlist3':
      return {
        ...state,
        watchlist3: action.payload,
      };
    case 'Watchlist4':
      return {
        ...state,
        watchlist4: action.payload,
      };
    case 'Watchlist5':
      return {
        ...state,
        watchlist5: action.payload,
      };
    case 'Watchlist6':
      return {
        ...state,
        watchlist6: action.payload,
      };
    case 'Watchlist7':
      return {
        ...state,
        watchlist7: action.payload,
      };

    default:
      return state;
  }
};

export default watchlist;
