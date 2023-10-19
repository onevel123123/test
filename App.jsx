import React, { useState } from 'react';
import {  Button,  } from '@mui/material';
import { Autocomplete, TextField, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const StyledAutocomplete = styled(Autocomplete)({
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',  // Transparent border
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'currentColor',  // Visible border on hover
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'currentColor',  // Ensure border remains visible on focus
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
        visibility: 'hidden',  // Hide label on focus
      },
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        visibility: 'hidden',  // Hide label when there's a value
      },
  });
  
    

function App() {
const savedCountries = JSON.parse(localStorage.getItem('countries'));
const initialCountries = savedCountries || [
    { name: "Afghanistan", size: 652864 },
    { name: "Albania", size: 28748 },
    // ... other default countries
];

const [countries, setCountries] = useState(initialCountries);

    const [inputCountry, setInputCountry] = useState('');
    const [countrySize, setCountrySize] = useState('');

    const handleCountryChange = (event, newValue) => {
        
        if (newValue && newValue.name) {
            setInputCountry(newValue.name);
            setCountrySize(newValue.size);
        } else {
            setInputCountry(newValue || '');
        }
    };

    const handleSizeChange = (newValue) => {
        setCountrySize(newValue.target.value);
    };

    const handleAddCountry = () => {
        const trimmedCountry = inputCountry.trim().toLowerCase();
const handleAddCountry = () => {
  const trimmedCountry = inputCountry.trim().toLowerCase();
  const trimmedContinent = inputContinent.trim().toLowerCase();

  const countryExists = countries.some(country => country.name.toLowerCase() === trimmedCountry);
  console.log(`Adding  with size  sq. km and continent `);

  if (trimmedCountry) {
    setCountries(prevCountries => {
      let updatedCountries;
      const existingCountry = prevCountries.find(country => country.name.toLowerCase() === trimmedCountry.toLowerCase());

      if (existingCountry) {
        // Update the size of the existing country
        updatedCountries = prevCountries.map(country =>
          country.name.toLowerCase() === trimmedCountry.toLowerCase()
            ? { ...country, size: countrySize, continent: inputContinent }
            : country
        );
      } else {
        // Add the new country
        updatedCountries = [...prevCountries, { name: trimmedCountry, size: countrySize, continent: inputContinent }];
      }

      // Save to localStorage and return the updated list
      localStorage.setItem('countries', JSON.stringify(updatedCountries));
      return updatedCountries.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    });
    setInputCountry('');  // Reset the input after adding or updating
    setInputContinent('');
  }
};
        const countryExists = countries.some(country => country.name.toLowerCase() === trimmedCountry);
        console.log(`Adding ${inputCountry} with size ${countrySize} sq. km`);  

        if (trimmedCountry) {
            setCountries(prevCountries => {
                let updatedCountries;
                const existingCountry = prevCountries.find(country => country.name.toLowerCase() === trimmedCountry.toLowerCase());
                
                if (existingCountry) {
                    //console.log(`Updating size for ${inputCountry} to ${countrySize} sq. km`);
                    // Update the size of the existing country
                    updatedCountries = prevCountries.map(country => 
                        country.name.toLowerCase() === trimmedCountry.toLowerCase()
                        ? { ...country, size: countrySize }
                        : country
                    );
                } else {
                    //console.log(`Adding ${inputCountry} with size ${countrySize} sq. km`);
                    // Add the new country
                    updatedCountries = [...prevCountries, { name: trimmedCountry, size: countrySize }];
                }
                
                // Save to localStorage and return the updated list
                localStorage.setItem('countries', JSON.stringify(updatedCountries));
                return updatedCountries.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
            });
            setInputCountry('');  // Reset the input after adding or updating
        }
        
    };

    return (
        <div style={{ background: 'white', padding: '2rem', maxWidth: '200px',maxHeight: '500px', margin: '1 auto' }}>
            

            <StyledAutocomplete
            
    freeSolo
    id="country-autocomplete"
    options={countries}
    getOptionLabel={(option) => option.name}
    value={countries.find(country => country.name === inputCountry) || null}
    onInputChange={handleCountryChange}
    onChange={handleCountryChange}
    renderOption={(props, option, { selected }) => (
        <div {...props}>
            <ListItemText primary={option.name} />
            <IconButton
                size="small"
                onClick={(event) => {
                    alert('Country will be deleted!');
                    event.stopPropagation();  // Prevent the default behavior of selecting the country
                    setCountries(prevCountries => prevCountries.filter(country => country.name !== option.name));
                    localStorage.setItem('countries', JSON.stringify(countries.filter(country => country.name !== option.name)));
                }}
            >   
                <DeleteIcon />
            </IconButton>
        </div>
    )}
    
    
    renderInput={(params) => <TextField {...params} label="Country" variant="standard" margin="dense" size="small" />}
/>


            <TextField
                id="country-size"
                //label="Country Size (sq. km)"
                value={countrySize}
                onChange={handleSizeChange}
                variant="standard"
                size="small"        
                type="number"
                margin="dense"
                fullWidth
                style={{ marginTop: '0rem', marginBottom: '0rem' }}
            />

            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleAddCountry} 
                style={{ marginTop: '1rem' }}>
                Add New Country
            </Button>
        </div>
    );
}

export default App;
