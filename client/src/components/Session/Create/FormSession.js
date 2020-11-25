import React from 'react';
import validate from '../Form/validateInfo';
import useForm from './useForm-CreateSession';
import '../Form/Form.css';

const FormSession = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors, options } = useForm(
    submitForm,
    validate
  );
  
  return (
    <>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Create Session
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Session Name</label>
          <input
            className='form-input'
            type='text'
            name='name'
            placeholder="Enter the session name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Time slot</label>
          <select
            className='form-input'
            name='timeslot'
            onChange={handleChange}>
            <option value="">--Please choose a time slot--</option>
            {options.timeslots && options.timeslots.map(function(timeslot) 
            { return <option 
                    key={timeslot.id} 
                    value={timeslot.name}>
                  {timeslot.name} ({timeslot.start} - {timeslot.end})
                  
                </option>;
            })
            }
          </select>
          {errors.timeslot && <p>{errors.timeslot}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Speaker</label>
          <select
            className='form-input'
            name='speaker'
            onChange={handleChange}>
            <option value="">--Please choose a speaker--</option>
             {options.speakers && options.speakers.map(function(speaker) 
            { return <option 
                    key={speaker.id} 
                    value={speaker.name}>
                  {speaker.name}
                </option>;
            })
            }
          </select>
          {errors.speaker && <p>{errors.speaker}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Room</label>
          <select
            className='form-input'
            name='room'
            onChange={handleChange}>
          <option value="N/A">--Please choose a room--</option>
          {options.rooms && options.rooms.map(function(room) 
            { return <option 
                    key={room.id} 
                    value={room.name}>
                  {room.name} (Seats: {room.capacity})
                  
                </option>;
            })
            }
          </select>

          {errors.room && <p>{errors.room}</p>}
        </div>
        
        <button className='form-input-btn' type='submit'>
          Add Session
        </button>
        
      </form>
    </>
  );
};

export default FormSession;
