import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import store from '../../src/store';
import useAppSelector from '../../src/hooks/useAppSelector';

test('should return state selector', () => {
  const { result } = renderHook(() => useAppSelector((state) => state.films), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });
  expect(result.current).toEqual(store.getState().films);
});
