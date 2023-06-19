const initialState = {
  is_auth: false,
  auth_id: null,
  auth_name: null,
  auth_contact: null,
  auth_email: null,
  auth_gender: null,
  session_token: null,
  screen_access: [],
  components_access: [],
  roles_access: [],
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_DATA_GET':
      return {
        ...state,
        is_auth: action.is_auth,
        auth_id: action.auth_id,
        auth_name: action.auth_name,
        auth_contact: action.auth_contact,
        auth_email: action.auth_email,
        auth_gender: action.auth_gender,
        screen_access: action.screen_access,
        components_access: action.components_access,
        session_token: action.session_token,
        roles_access: action.roles_access,
      };
    case 'AUTH_SESSION_LOGOUT':
      return {
        ...state,
        is_auth: action.is_auth,
        auth_id: action.auth_id,
        auth_name: action.auth_name,
        auth_contact: action.auth_contact,
        auth_email: action.auth_email,
        auth_gender: action.auth_gender,
        screen_access: action.screen_access,
        components_access: action.components_access,
        session_token: action.session_token,
        roles_access: action.roles_access,
      };
    default:
      return state;
  }
};

export default auth;
