// @ts-ignore
import React from 'react';
import { render as rtlRender } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../__mocks__/reducer';
const store = createStore(reducer);

function render(
  ui: React.ReactElement<
    any,
    | string
    | ((
        props: any,
      ) => React.ReactElement<
        any,
        string | any | (new (props: any) => React.Component<any, any, any>)
      > | null)
    | (new (props: any) => React.Component<any, any, any>)
  >,
  { locale = 'en', ...renderOptions } = {},
) {
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react-native';

// override React Testing Library's render with our own
export { render };
