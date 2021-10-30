import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { useRoute } from '@react-navigation/native';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-native-localize', () => {
  return {
    getLocales: jest.fn(),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    getLocales: jest.fn(),
  };
});

jest.mock('react-native-background-timer', () => {
  return {
    getLocales: jest.fn(),
  };
});

jest.mock('react-native-device-info', () => {
  return {
    getLocales: jest.fn(),
  };
});

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useRoute: () => ({
      params: {},
    }),
    useNavigationParam: jest.fn(
      jest.requireActual('@react-navigation/native').useNavigationParam,
    ),
  };
});
