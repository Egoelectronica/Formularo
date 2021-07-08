import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native'
import {configureFonts, DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Navigation from './src/navigation/Navigation';


export default function App(){


  const fontConfig = {
    default: {
      regular: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Montserrat-Medium',
        fontWeight: 'normal',
      },
      bold: {
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'normal',
      },
    },
  };

  const theme = {
    ...DefaultTheme,
    fonts: configureFonts(fontConfig),
    colors: {
      ...DefaultTheme.colors,
      primary: '#ff4033',
      secondary: '#ffc604'
    },
  };

  return(
    <React.Fragment>
      <PaperProvider theme={theme}>
        <Navigation/>
      </PaperProvider>
    </React.Fragment>
  )
}