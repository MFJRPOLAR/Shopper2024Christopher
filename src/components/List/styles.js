import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    paddingBottom: 5,
  },
  name: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  store: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
  date: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
  boxgreen: {
    backgroundColor: 'green',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  boxred: {
    backgroundColor: 'red',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  priority: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
    flex: 1,
  }
});

export default styles;