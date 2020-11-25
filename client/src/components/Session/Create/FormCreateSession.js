import React, { useState } from 'react';
import '../Form/Form.css';
import "bootstrap/dist/css/bootstrap.min.css"
import FormSession from './FormSession';
import FormSuccess from '../Form/FormSuccess';

const FormCreateSession = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
    {/* <a className="ml-3 mt-0 btn btn-info" href='/speaker'> View Sessions </a> */}
      <div className='form-container '>
        
        {!isSubmitted ? (
          <FormSession submitForm={submitForm} />
        ) : (
          <FormSuccess/>
        )}
      </div>
    </>
  );
};
export default FormCreateSession;
