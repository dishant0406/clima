/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Home from './Screens/Home';




function App(): React.JSX.Element {


  return (
    < >
      <StatusBar
        hidden={true}
      />

      <Home />
    </>
  );
}




export default App;
