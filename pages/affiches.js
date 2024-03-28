import React, { useState, useEffect } from "react";

// Composants
import AfficheCard from "../components/AfficheCard";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

// Composants MUI
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Style
import styles from "../styles/Affiches.module.css";

export default function Affiches() {

  const theme = createTheme({
    components: {
      MuiNativeSelect: {
        styleOverrides: {
          icon: {
            color: 'rgba(255, 255, 255, 0.5)',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: 'rgba(255, 255, 255, 0.5)',
            '&:before': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&:after': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
          },
        },
      },
    },
  });

  const [affichesData, setAffichesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMethod, setSortMethod] = useState('date'); // Nouvel état pour la méthode de tri

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    fetch(`https://art-papa-backend.vercel.app/affiches/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          let sortedAffiches;
          if (sortMethod === 'date') {
            sortedAffiches = data.affiches.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
          } else if (sortMethod === 'name') {
            sortedAffiches = data.affiches.sort((a, b) => a.filmName.localeCompare(b.filmName));
          }
          setAffichesData(sortedAffiches);
        }
      });
  }, [sortMethod]); // Inclure sortMethod dans le tableau de dépendances

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSortMethod(value);
  };

  const filteredAffiches = affichesData.filter((item) => item.filmName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.searchContainer}>
        <SearchBar onSearchChange={handleSearchChange} values={affichesData} label={'Rechercher une affiche'} search={'filmName'} />

        <ThemeProvider theme={theme}>
          <Box sx={{ minWidth: 80, width: 80, color: 'white' }}>
            <FormControl fullWidth>
              <NativeSelect
                defaultValue={'date'}
                onChange={handleSortChange}
                inputProps={{
                  name: 'sort',
                  id: 'uncontrolled-native',
                  style: { color: 'rgba(255, 255, 255, 0.5)' },
                }}
              >
                <option value={'name'}>A-Z</option>
                <option value={'date'}>New</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </ThemeProvider>
      </div>

      <div className={styles.affiches}>
        {filteredAffiches.map((item, index) => (
          <div className={styles.afficheItem} key={index}>
            <AfficheCard
              affiche={item.imageName}
              name={item.filmName}
              real={item.realName}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
