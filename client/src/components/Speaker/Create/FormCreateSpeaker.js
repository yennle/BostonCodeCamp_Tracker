import React, { useState } from 'react';
import '../Form/Form.css';
import "bootstrap/dist/css/bootstrap.min.css"
import FormSpeaker from './FormSpeaker';
import FormSuccess from '../Form/FormSuccess';

const FormCreateSpeaker = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
    {/* <a className="ml-3 mt-0 btn btn-info" href='/speaker'> View Speakers </a> */}
      <div className='form-container mt-0 '>
        
        {!isSubmitted ? (
          <FormSpeaker submitForm={submitForm} />
        ) : (
          <FormSuccess/>
        )}
      </div>
    </>
  );
};
export default FormCreateSpeaker;
