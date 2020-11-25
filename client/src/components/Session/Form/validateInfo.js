export default function validateInfo(values) {
  let errors = {};

  if (!values.name.trim()) {
    errors.name = 'Session name required';
  }
  else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    errors.name = 'Enter a valid name';
  }

  if (!values.speaker) {
    errors.speaker = 'Speaker required';
  } 
  
  if (!values.room) {
    errors.room = 'Room required';
  }

  if (!values.timeslot) {
    errors.timeslot = 'Time slot required';
  }
  return errors;
}
