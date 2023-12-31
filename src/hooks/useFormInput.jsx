import { useState } from "react";

const useFormInput = (initValue) => {
  // input state
  const [input, setInput] = useState(initValue);

  //  onchange input value update
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //  reset input
  const handleFormReset = () => {
    setInput(initValue);
  };

  // returning all state and actions handler
  return { input, handleInputChange, handleFormReset };
};

export default useFormInput;
