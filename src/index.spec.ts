import { createRawSnippet } from "./index";
import { it, assertType } from 'vitest';

it('default types', () => {
  createRawSnippet(() => ({
    render: () => '<h1></h1>',
    setup: (element) => {
      assertType<Element>(element);
    },
  }));
});

it('custom types1', () => {
  createRawSnippet<[], 'h1'>(() => ({
    render: () => `<h1></h1>`,
    setup: (element) => {
      assertType<HTMLHeadingElement>(element);
    },
  }));
});

it('custom types2', () => {
  createRawSnippet<[], '<h1></h1>'>(() => ({
    render: () => `<h1></h1>`,
    setup: (element) => {
      assertType<HTMLHeadingElement>(element);
    },
  }));
});
