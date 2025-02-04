import { FormEvent } from "react";

interface NewListFormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
}

interface NewListFormElement extends HTMLFormElement {
  readonly elements: NewListFormElements;
}

interface NewCardFormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  description: HTMLTextAreaElement;
}
interface NewCardFormElement extends HTMLFormElement {
  readonly elements: NewCardFormElements;
}

export type NewListFormEvent = FormEvent<NewListFormElement>;

export type NewCardFormEvent = FormEvent<NewCardFormElement>;
