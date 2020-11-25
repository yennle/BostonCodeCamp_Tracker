import React, { useState } from 'react';
import '../Form/Form.css';
import FormRoom from './FormRoom';
import FormSuccess from '../Form/FormSuccess';

const FormUpdateRoom = () => {
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
          <FormRoom submitForm={submitForm} />
        ) : (
          <FormSuccess/>
        )}
      </div>
    </>
  );
};

export default FormUpdateRoom;
