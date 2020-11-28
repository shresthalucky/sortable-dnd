import { LitElement, html } from 'lit-element';

import '../src';

class Demo extends LitElement {

  constructor() {
    super();

    this.fruitItems = ['🍊 orange', '🍌 banana', '🍉 watermelon', '🍎 apple'];
  }

  onFruitChange = (newItems) => {
    console.log(newItems);
  }

  render() {
    return html`
      <sortable-dnd
        .items="${this.fruitItems}"
        .onChange="${this.onFruitChange}"
      ></sortable-dnd>
    `;
  }
}

customElements.define('app-demo', Demo);
