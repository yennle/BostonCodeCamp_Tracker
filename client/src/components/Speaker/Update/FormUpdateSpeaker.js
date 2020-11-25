import React, { useState } from 'react';
import '../Form/Form.css';
import FormSpeaker from './FormSpeaker';
import FormSuccess from '../Form/FormSuccess';

const FormUpdateSpeaker = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container'>
        <span className='close-btn'>×</span>
        {/* <div className='form-content-left'>
          <img className='form-img' src='img/img-2.svg' alt='spaceship' />
        </div> */}
        {!isSubmitted ? (
          <FormSpeaker submitForm={submitForm} />
        ) : (
          <FormSuccess/>
        )}
      </div>
    </>
  );
};

export default FormUpdateSpeaker;
