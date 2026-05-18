import '../styles/globals.css';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import user from '../reducers/user';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const reducers = combineReducers({ user });
const persistConfig = { key: 'ArtPapa', storage };
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.2 } },
};

function App({ Component, pageProps, router }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>F. Giraud</title>
        </Head>
        <AnimatePresence mode="wait">
          <motion.div key={router.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </PersistGate>
    </Provider>
  );
}

export default App;
