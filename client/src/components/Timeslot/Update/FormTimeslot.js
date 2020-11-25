import React from 'react';
import validate from '../Form/validateInfo';
import useForm from './useForm-UpdateTimeslot';
import '../Form/Form.css';

const FormTimeslot = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Update Timeslot
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Timeslot Name</label>
          <input
            className='form-input'
            type='text'
            name='name'
            placeholder="Enter the time slot name"
            value={values.name}
            onChange={handleChange}
          />
          
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Start Time</label>
          <input
            className='form-input'
            type='time'
            name='start'
            min="09:00" 
            max="18:00"
            value={values.start}
            onChange={handleChange}
          />
          {errors.start && <p>{errors.start}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>End Time</label>
          <input
            className='form-input '
            type='time'
            name='end'
            min="09:00" 
            max="18:00"
            value={values.end}
            onChange={handleChange}
          />
          {errors.end && <p>{errors.end}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Update Timeslot
        </button>
        
      </form>
    </>
  );
};

export default FormTimeslot;
