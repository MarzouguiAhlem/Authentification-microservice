import React from "react";
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux to interact with the Redux store
import { ThreeDots } from 'react-loader-spinner'; // Import the ThreeDots component from the react-loader-spinner library
import "./Loader.css"; 

// Loader component displays a loading spinner while waiting for data
const Loader = () => {
  const dispatch = useDispatch(); // Initialize the useDispatch hook to access Redux store dispatch function

  return (
    <aside className='modal-container'> 
      <ThreeDots // Render the ThreeDots loading spinner component
        height="100" 
        width="100"  
        radius="9"   
        color="#1abc9c" 
        ariaLabel="three-dots-loading" // ARIA label for accessibility
        wrapperStyle={{}} // Additional style to apply to the spinner wrapper
        wrapperClassName="" // Additional CSS class to apply to the spinner wrapper
        visible={true} // Set the visibility of the spinner (always visible in this case)
      />
    </aside>
  );
};

export default Loader; // Export the Loader component for use in other parts of the application
