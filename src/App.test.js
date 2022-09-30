import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the main text editor interface and its components', () => {
  const { container } = render(<App />);

  const mainTitle = screen.getByText(/TheEditor/i);
  const docSelection = container.querySelector('select');
  const docText = container.querySelector('trix-editor');
  
  expect(mainTitle).toBeInTheDocument();
  expect(docSelection).toBeInTheDocument();
  expect(docText).toBeInTheDocument();
});

test('enters the into the editors text box', () => {
  const testMsg = "hello test!";
  const { container } = render(<App />);
  const docText = container.querySelector('trix-editor');

  docText.editor.innerHTML = testMsg;

  expect(docText).toBeInTheDocument();
  expect(docText.editor.innerHTML).toBe(testMsg);
});

test('crete a new text document', () => {
  const { container } = render(<App />);
  const docText = container.querySelector('trix-editor');
  const saveButton = container.querySelector('button');
  
  const testMsg = "hello test!";
  docText.editor.innerHTML = testMsg;

  expect(docText).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();
  fireEvent.click(saveButton);
  expect(docText.editor.innerHTML).toBe(testMsg);
});
