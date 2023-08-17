import axios from "axios"; // Import the axios library for making HTTP requests

// Create a custom axios instance with default configuration
export default axios.create({
    withCredentials: true, // Configure axios to include credentials (such as cookies) in cross-origin requests
})
