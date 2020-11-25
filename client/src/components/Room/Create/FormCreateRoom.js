import React, { useState } from 'react';
import '../Form/Form.css';
import "bootstrap/dist/css/bootstrap.min.css"
import FormRoom from './FormRoom';
import FormSuccess from '../Form/FormSuccess';

const FormCreateRoom = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
    {/* <a className="ml-3 mt-0 btn btn-info" href='/room'> View Rooms </a> */}
      <div className='form-container'>
        {!isSubmitted ? (
          <FormRoom submitForm={submitForm} />
        ) : (
          <FormSuccess/>
        )}
      </div>
    </>
  );
};
export default FormCreateRoom;
