import '@testing-library/jest-dom'

import { Languages } from "@/shared/enums/languages";
import { ValueBoolean } from '@/frontend/enums/boolean';

import es from "@/shared/i18n/es/global.json";
import dotenv from 'dotenv';
import i18next from "i18next";

dotenv.config({ path: '.env.test' });

import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

(global as any).IntersectionObserver = class IntersectionObserver {
  constructor() { }
  observe(): void { }
  unobserve(): void { }
  disconnect(): void { }
};

const mock_push = jest.fn();

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({
    push: mock_push
  })
}));

jest.mock('@/frontend/hooks/path', () => ({
  __esModule: true,
  default: jest.fn(),
}));

beforeAll(() => {
  global.scroll = jest.fn();
  global.URL.createObjectURL = jest.fn(() => "mock-url");

  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn().mockImplementation((key: string) => {
        if (key === 'last_page') {
          return ValueBoolean.NOT;
        }
        return null;
      }),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    },
    configurable: true
  });

  i18next.init({
    interpolation: { escapeValue: false },
    lng: Languages.SPANISH,
    resources: {
      es: { global: es }
    }
  })
});