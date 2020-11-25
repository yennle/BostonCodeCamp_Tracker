import React from 'react';
import validate from '../Form/validateInfo';
import useForm from './useForm-UpdateSpeaker';
import '../Form/Form.css';

const FormSpeaker = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Update Speaker
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Speaker Name</label>
          <input
            className='form-input'
            type='text'
            name='name'
            placeholder="Enter the full name"
            value={values.name}
            onChange={handleChange}
          />
          
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder="Enter the valid email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Phone Number</label>
          <input
            className='form-input '
            type='tel'
            name='phone'
            placeholder="Enter the valid phone number"
            value={values.phone}
            onChange={handleChange}
          />
          {errors.phone && <p>{errors.phone}</p>}
        </div>
        <div className='form-inputs '>
          <label className='form-label'>Day Phone</label>
          <input
            className='form-input'
            type='tel'
            name='dayphone'
            placeholder="Enter the day phone number (optional)"
            value={values.dayphone}
            onChange={handleChange}
          />
          {errors.dayphone && <p>{errors.dayphone}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Update Speaker
        </button>
        
      </form>
    </>
  );
};

export default FormSpeaker;
