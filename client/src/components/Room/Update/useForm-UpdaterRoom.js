import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

const useForm = (callback, validate) => {
  
  const [values, setValues] = useState({
    name: '',
    capacity: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
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
      console.log(id)
      axios.get('http://localhost:5000/api/rooms/'+id)
          .then(response => {
              setValues({
                name: response.data.name,
                capacity: response.data.capacity
              })
          })
          .catch(function (error) {
            console.log(error);
          })
      if (Object.keys(errors).length === 0 && isSubmitting) {
        axios.put('http://localhost:5000/api/rooms/'+id, values)
          .then(res => console.log(res.data));
        callback();
        
      }
    },
    [errors]
  );
  
  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
