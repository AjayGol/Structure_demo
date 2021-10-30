import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '../../../utils/testWrapper';
import { renderer } from 'react-test-renderer';
import { render as renderLibrary } from '@testing-library/react-native';
import reducer from '../../../../__mocks__/reducer';
const store = createStore(reducer);

// let tree;
// let title = 'Testing';
// beforeEach(() => {
//   tree = render(
//     <Provider store={store}>
//       <BuyAssetScreen />
//     </Provider>,
//   );
// });

test('Buy Assets Screen - renders correctly', () => {
  const snap = renderer.create(<Provider store={store}></Provider>).toJSON();
  expect(snap).toMatchSnapshot();
});
