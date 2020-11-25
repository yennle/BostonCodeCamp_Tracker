import React from 'react';
import validate from '../Form/validateInfo';
import useForm from './useForm-UpdaterRoom';
import '../Form/Form.css';

const FormRoom = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Update Room
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Room Name</label>
          <input
            className='form-input'
            type='text'
            name='name'
            placeholder="Enter the room name"
            value={values.name}
            onChange={handleChange}
          />
          
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Capacity</label>
          <input
            className='form-input'
            type='number'
            name='capacity'
            placeholder="How many seats in this room?"
            value={values.capacity}
            onChange={handleChange}
          />
          {errors.capacity && <p>{errors.capacity}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Update Room
        </button>
        
      </form>
    </>
  );
};

export default FormRoom;
