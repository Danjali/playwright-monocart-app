/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
// Mock Title component
jest.mock('../utils/Title', () => () => <div data-testid="mock-title">Mock Title</div>);
describe('App Component', () => {
  test('renders learn react link', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('renders Title component with correct props', () => {
    const { getByTestId } = render(<App />);
    const titleElement = getByTestId('mock-title');
    expect(titleElement).toBeInTheDocument();
  });
  test('clicking button calls getAlert function', () => {
    const { getByTestId } = render(<App />);
    const buttonElement = getByTestId('myButton');
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });
    fireEvent.click(buttonElement);
    expect(alertSpy).toHaveBeenCalledWith('sum is 30');
    alertSpy.mockRestore();
  });
});
