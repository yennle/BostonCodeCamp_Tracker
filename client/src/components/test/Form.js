import React, { useState } from 'react';
import '../Speaker/Form/Form.css';
import FormSpeaker from '../Speaker/Create/FormSpeaker';
import FormSuccess from '../Speaker/Form/FormSuccess';

const Form = () => {
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

export default Form;
