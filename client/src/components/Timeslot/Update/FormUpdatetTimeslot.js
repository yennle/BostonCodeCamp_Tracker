import React, { useState } from 'react';
import '../Form/Form.css';
import FormTimeslot from './FormTimeslot';
import FormSuccess from '../Form/FormSuccess';

const FormUpdateTimeslot = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container'>
        {!isSubmitted ? (
          <FormTimeslot submitForm={submitForm} />
        ) : (
          <FormSuccess/>
        )}
      </div>
    </>
  );
};

export default FormUpdateTimeslot;
