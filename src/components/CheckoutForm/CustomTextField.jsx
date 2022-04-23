import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {  Grid, Input } from '@material-ui/core';

function FormInput({ name, value, required }) {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>

<Controller
  control={control}
  name="firstName"
  render={({
    field: { value, name },
    formState,
  }) => (
    <Input name={name} value={value} required/>
  )}
/>
    </Grid>
  );
}

export default FormInput;
