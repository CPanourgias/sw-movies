import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import store from '../../src/store';
import useAppDispatch from '../../src/hooks/useAppDispatch';

test('should return dispatch function', () => {
  const { result } = renderHook(() => useAppDispatch(), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });
  expect(typeof result.current).toBe('function');
});
