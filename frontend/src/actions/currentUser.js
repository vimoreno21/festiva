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


// Function to get the name and email of the logged-in user
export const getUserInfo = () => {
  // Get the user data from localStorage
  const userData = localStorage.getItem('user_data');

  // Check if user data exists and is valid
  if (isLoggedIn()) {
    try {
      const user = JSON.parse(userData);
      if (user.name && user._id) {
        return {
          name: user.name,
          id: user._id
        };
      }
    } catch (error) {
      // Error parsing user data
      console.error("Error parsing user data:", error);
    }
  }

  // Return null if user data is not available or valid
  return "No Name!";
};