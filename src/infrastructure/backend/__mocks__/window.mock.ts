export const mockWindow = {
  location: {
    origin: 'http://localhost:3000',
  },
};

Object.defineProperty(window, 'location', {
  value: mockWindow.location,
  writable: true,
});
