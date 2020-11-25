export default function validateInfo(values) {
  let errors = {};

  if (!values.name.trim()) {
    errors.name = 'Timeslot Name required';
  }
  else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    errors.name = 'Enter a valid name';
  }

  if (!values.end) {
    errors.end = 'End Time required';
  }
  if (!values.start) {
    errors.start = 'Start Time required';
  }
  return errors;
}
