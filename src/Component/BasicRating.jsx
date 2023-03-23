import * as React from 'react';
import Rating from '@mui/material/Rating';

function BasicRating({ value }) {

  return (
    
      <Rating
        name="simple-controlled"
        value={value?value:0}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
/>
  )}

  export default BasicRating;