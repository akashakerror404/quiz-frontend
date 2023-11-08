// Add an action to store user data in local storage
export const setUserData = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    return {
      type: 'SET_USER_DATA',
      payload: userData,
    };
  };
  
  // Add an action to clear user data from local storage
  export const clearUserData = () => {
    localStorage.removeItem('userData');
    return {
      type: 'CLEAR_USER_DATA',
    };
  };
  
  const initialState = {
    username: '',
    userId: '',
    role: '',
    isAuthenticated: false,
  };
  
  // Initialize state from local storage if available
  const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
    initialState.isAuthenticated = true;
    const parsedUserData = JSON.parse(storedUserData);
    initialState.username = parsedUserData.username;
    initialState.userId = parsedUserData.userId;
    initialState.role = parsedUserData.role;
  }
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_DATA':
        console.log('Setting user:', action.payload);
        localStorage.setItem('userData', JSON.stringify(action.payload));
        return {
          ...state,
          isAuthenticated: true,
          username: action.payload.username,
          role: action.payload.role,
          userId: action.payload.userId,
        };
      case 'CLEAR_USER_DATA':
        console.log('clearing');
        localStorage.removeItem('userData');
        return {
          ...state,
          isAuthenticated: false,
          username: '',
          role: '',
          userId: '',
        };
      default:
        return state;
    }
  };
  