import React, { useState } from 'react';
import '../Form/Form.css';
import "bootstrap/dist/css/bootstrap.min.css"
import FormTimeslot from './FormTimeslot';
import FormSuccess from '../Form/FormSuccess';

const FormCreateTimeslot = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
    {/* <a className="ml-3 mt-0 btn btn-info" href='/timeslot'> View Timeslots </a> */}
      <div className='form-container mt-0 '>
        
        {!isSubmitted ? (
          <FormTimeslot submitForm={submitForm} />
        ) : (
          <FormSuccess/>
        )}
      </div>
    </>
  );
};
export default FormCreateTimeslot;
