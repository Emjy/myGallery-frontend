import React, { useState, useEffect } from 'react';
import AfficheCard from '../components/AfficheCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../styles/Affiches.module.css';
import { API_URL } from '../lib/api';

const theme = createTheme({
  components: {
    MuiNativeSelect: {
      styleOverrides: { icon: { color: 'rgba(255,255,255,0.5)' } },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: 'rgba(255,255,255,0.5)',
          '&:before': { borderColor: 'rgba(255,255,255,0.5)' },
          '&:after': { borderColor: 'rgba(255,255,255,0.5)' },
        },
      },
    },
  },
});

export default function Affiches() {
  const [affichesData, setAffichesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMethod, setSortMethod] = useState('date');
  const [fullPage, setFullPage] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/affiches/`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.result) return;
        const sorted = [...data.affiches].sort((a, b) =>
          sortMethod === 'name'
            ? a.filmName.localeCompare(b.filmName)
            : new Date(b.creationDate) - new Date(a.creationDate)
        );
        setAffichesData(sorted);
      });
  }, [sortMethod]);

  const filteredAffiches = affichesData.filter((item) =>
    item.filmName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.searchContainer}>
        <SearchBar
          onSearchChange={setSearchQuery}
          values={affichesData}
          label="Rechercher une affiche"
          search="filmName"
        />
        <ThemeProvider theme={theme}>
          <Box sx={{ minWidth: 80, width: 80 }}>
            <FormControl fullWidth>
              <NativeSelect
                defaultValue="date"
                onChange={(e) => setSortMethod(e.target.value)}
                inputProps={{ name: 'sort', style: { color: 'rgba(255,255,255,0.5)' } }}
              >
                <option value="name">A-Z</option>
                <option value="date">New</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </ThemeProvider>
      </div>

      <div className={styles.affiches}>
        {filteredAffiches.map((item) => (
          <div
            className={styles.afficheItem}
            key={item._id}
            onClick={(e) => { e.stopPropagation(); setFullPage(item.imageName); }}
          >
            <AfficheCard affiche={item.imageName} name={item.filmName} real={item.realName} />
          </div>
        ))}
      </div>

      {fullPage && (
        <div className={styles.photoFullPage} onClick={() => setFullPage('')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fullPage} alt="Affiche plein écran" />
        </div>
      )}
    </div>
  );
}
