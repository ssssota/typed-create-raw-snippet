import type { Snippet } from "svelte";
import { createRawSnippet as original } from "svelte";

type Getters<T> = {
  [K in keyof T]: () => T[K];
};
export interface CreateRawSnippet {
  <Params extends unknown[]>(
    fn: (...params: Getters<Params>) => {
      render: () => string;
      setup?: (element: Element) => void;
    }
  ): Snippet<Params>;

  <Params extends unknown[], El extends keyof HTMLElementTagNameMap>(
    fn: (...params: Getters<Params>) => {
      render: () => `${string}</${El}>`;
      setup?: (element: HTMLElementTagNameMap[El]) => void;
    }
  ): Snippet<Params>;

  <Params extends unknown[], RenderResult extends string>(
    fn: (...params: Getters<Params>) => {
      render: () => RenderResult;
      setup?: (
        element: HTMLElementTagNameMap[RootElement<RenderResult>]
      ) => void;
    }
  ): Snippet<Params>;
}
type TrimLeft<T extends string> = T extends ` ${infer R}` ? TrimLeft<R> : T;
type TrimRight<T extends string> = T extends `${infer R} ` ? TrimRight<R> : T;
type Trim<T extends string> = TrimLeft<TrimRight<T>>;
type RootElement<T extends string> = Trim<T> extends `${string}</${infer E}>`
  ? E extends keyof HTMLElementTagNameMap
    ? E
    : never
  : never;

export const createRawSnippet = original as CreateRawSnippet;
