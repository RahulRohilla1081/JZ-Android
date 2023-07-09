const initialState = {
  watchlist1: [],
  watchlist2: [],
  watchlist3: [],
  watchlist4: [],
  watchlist5: [],
  watchlist6: [],
  watchlist7: [],
};

const watchlist = (state = initialState, action) => {
  switch (action.type) {
    case 'WATCH_LIST_1':
      return {
        ...state,
        watchlist1: action.payload,
      };
    case 'WATCH_LIST_2':
      return {
        ...state,
        watchlist2: action.payload,
      };
    case 'WATCH_LIST_3':
      return {
        ...state,
        watchlist3: action.payload,
      };
    case 'WATCH_LIST_4':
      return {
        ...state,
        watchlist4: action.payload,
      };
    case 'WATCH_LIST_5':
      return {
        ...state,
        watchlist5: action.payload,
      };
    case 'WATCH_LIST_6':
      return {
        ...state,
        watchlist6: action.payload,
      };
    case 'WATCH_LIST_7':
      return {
        ...state,
        watchlist7: action.payload,
      };

    default:
      return state;
  }
};

export default watchlist;
