
import { StyleSheet, Dimensions } from 'react-native';

const entireScreenWidth = Dimensions.get('window').width;
const rem = entireScreenWidth / 360

export default {
  container: {
    // padding: 10 * rem,
  },
  background: {
    width: '100%',
    height: '100%',
    padding: 22 * rem,
  },
  menuViewCol: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  menuTitle: {
    fontFamily: "CoolDots",
    fontSize: rem * 15,
    paddingTop: rem * 12,
    backgroundColor: 'transparent',
    color: '#ca6500'
  },
  endButton: {
    marginTop: 16,
  },
  endButtonTitle: {
    fontFamily: "CoolDots",
    fontSize: rem * 15,
    paddingTop: rem * 16
  },
  centeredArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockedViewCol: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  lockedView: {
    width: 100 * rem,
    height: 60 * rem,
    paddingTop: 10 * rem,
    marginRight: 5 * rem,
    borderRadius: 8,
    borderColor: '#ca6500',
    borderWidth: 2,
  },
  lockedNumber: {
    fontFamily: "CoolDots",
    fontSize: rem * 30,
    color: '#ca6500',
    backgroundColor: 'transparent'
  },
  engagedView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  engagedNumber: {
    fontFamily: "CoolDots",
    fontSize: rem * 150,
    color: '#50C900',
    backgroundColor: 'transparent'
  },
  row: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  mt: {
    marginTop: 18,
  },
};
