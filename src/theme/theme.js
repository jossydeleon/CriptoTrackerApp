import { DarkTheme } from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#18182f',
    dark: '#20233f',
    primary: '#3fa7fe',
    secondary: '#484d79',
    text: 'black',
    gray:'#f7f7f7',
    lightgray: '#C7C7C7',
    darkgray: '#5E5E5E',
    cgray: '#ececec',
    offlinegray: '#535353',
    white:'#FFF', 
  },
  font: {
    boldSize: wp('5.1%'),
    boldMediumSize: wp('4.5'),
    subheadingSize: wp('3.8'),
    titleSize: wp('4.5%'),
    textSize: wp('3.5%'),
    mediumSize: wp('3.3%'),
    smallSize: wp('3.1%'),
  },
};