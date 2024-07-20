import { createRawSnippet } from "./index";
import { it, assertType } from 'vitest';

it('original typing', () => {
  createRawSnippet<[]>(() => ({
    render: () => '<h1></h1>',
    setup: (element) => {
      assertType<Element>(element);
    },
  }));
});

it('custom typing', () => {
  createRawSnippet<[string], `<h1>${string}</h1>`>((name) => ({
    render: () => `<h1>${name()}</h1>`,
    setup: (element) => {
      assertType<HTMLHeadingElement>(element);
    },
  }));
});

type Fn<T> = () => T;
it('without explicit typing', () => {
  createRawSnippet((name: Fn<string>) => ({
    render: () => `<h1>${name()}</h1> `,
    setup: (element) => {
      assertType<HTMLHeadingElement>(element);
    },
  }));
});
