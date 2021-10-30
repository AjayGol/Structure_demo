import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import reducer from '../../../../__mocks__/reducer';
import { Provider } from 'react-redux';
import BottomBarView from '../BottomBarView';
const store = createStore(reducer);

let tree;
let title = 'Testing';
beforeEach(() => {
  tree = shallow(
    <Provider store={store}>
      <BottomBarView />
    </Provider>,
  );
});

test(`${title} - renders correctly`, () => {
  expect(tree).toMatchSnapshot();
});
