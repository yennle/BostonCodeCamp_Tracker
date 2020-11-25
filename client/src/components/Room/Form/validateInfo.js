export default function validateInfo(values) {
  let errors = {};

  if (!values.name.trim()) {
    errors.name = 'Room name required';
  }
  else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    errors.name = 'Enter a valid name';
  }

  if (!values.capacity) {
    errors.capacity = 'Enter a valid seats number 10-100';
  } else if (values.capacity <10 || values.capacity >100) {
    errors.capacity = 'Enter a valid seats number 10-100';
  }
  return errors;
}
