// Unit tests for: t

import { beforeEach, describe, expect, it, vi } from 'vitest';
import Login from '../Login';

import { render } from '@testing-library/react';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';

// Mock the i18n instance
const mockT = vi.fn((key: string) => key);

i18n.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        title: 'Title',
        'auth.login': 'Login',
        'auth.baseline': 'Baseline',
      },
    },
  },
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mockT,
  }),
  Trans: ({ i18nKey }: { i18nKey: string }) => <span>{i18nKey}</span>,
}));

describe('t() t method', () => {
  beforeEach(() => {
    mockT.mockClear();
  });

  it('should call t with "title" key', () => {
    // Render the Login component
    render(
      <I18nextProvider i18n={i18n}>
        <Login />
      </I18nextProvider>
    );

    // Assert that t is called with the correct key
    expect(mockT).toHaveBeenCalledWith('title');
  });

  it('should call t with "auth.login" key', () => {
    // Render the Login component
    render(
      <I18nextProvider i18n={i18n}>
        <Login />
      </I18nextProvider>
    );

    // Assert that t is called with the correct key
    expect(mockT).toHaveBeenCalledWith('auth.login');
  });

  it('should call t with "auth.baseline" key', () => {
    // Render the Login component
    render(
      <I18nextProvider i18n={i18n}>
        <Login />
      </I18nextProvider>
    );

    // Assert that t is called with the correct key
    expect(mockT).toHaveBeenCalledWith('auth.baseline');
  });

  // Edge case: Ensure no unexpected keys are used
  it('should not call t with any unexpected keys', () => {
    // Render the Login component
    render(
      <I18nextProvider i18n={i18n}>
        <Login />
      </I18nextProvider>
    );

    // Assert that t is not called with any unexpected keys
    const expectedKeys = ['title', 'auth.login', 'auth.baseline'];
    const calls = mockT.mock.calls.map((call) => call[0]);
    calls.forEach((call) => {
      expect(expectedKeys).toContain(call);
    });
  });
});

// End of unit tests for: t
