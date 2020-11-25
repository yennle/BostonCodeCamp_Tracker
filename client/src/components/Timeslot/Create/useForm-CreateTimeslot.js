import { useState, useEffect } from 'react';
import axios from 'axios';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    name: '',
    start: '',
    end: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  
  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
    console.log(values)
    
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        axios.post('http://localhost:5000/api/timeslots', values)
          .then(res => console.log(res.data));
        callback();
      }
    },
    [errors]
  );
  
  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
