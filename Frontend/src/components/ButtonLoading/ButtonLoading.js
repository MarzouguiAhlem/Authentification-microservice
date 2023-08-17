import { useEffect, useState } from "react";

// Simulates a network request with a delay of 2000ms (2 seconds)
function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

const ButtonLoading = ({ onClick }) => {
  // State to track the loading status
  const [isLoading, setLoading] = useState(false);

  // Effect runs when isLoading changes
  useEffect(() => {
    if (isLoading) {
      // Simulate a network request delay using the function
      simulateNetworkRequest().then(() => {
        // Once the delay is over, set loading state to false
        setLoading(false);
      });
    }
    // The effect runs whenever isLoading changes
  }, [isLoading]);

 // This component renders a loading button and manages its loading state
};
// Export the ButtonLoading component
export default ButtonLoading;
