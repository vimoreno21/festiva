// currentUser.js

// Function to check if a user is logged in
export const isLoggedIn = () => {
    // Get the user data from localStorage
    const userData = localStorage.getItem('user_data');
  
    // Check if user data exists and is valid
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.name) {
          return true; // User is logged in
        }
      } catch (error) {
        // Error parsing user data, treat as not logged in
        console.log("was null and empty error");
      }
    }
    console.log("was null and empty");
    return false; // User is not logged in
};

export const logout = () => {
    // Check if the user is logged in
    if (isLoggedIn()) {
      // Clear user data from localStorage
      localStorage.removeItem('user_data');
    }
};
  