import { nothing } from 'lit-html';
import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import { isEmpty as isArrayEmpty, insertItem } from './utils/array';

/**
 * <sortable-dnd> - Component for sortable Drag and Drop list.
 * Component implements HTML Drag and Drop API for arranging items.
 * 
 * Usage:
 * <sortable-dnd
 *      .items="${this.items}"
 *      .onChange="${this.onChange}"></sortable-dnd>
 * 
 * @class SortableDnd
 * @extends {LitElement}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API 
 */
class SortableDnd extends LitElement {
  /**
   * Static getter properties.
   *
   * @returns  {Object}
   */
  static get properties() {
    return {
      /**
       * List of items
       *
       * @type {{items: Array}}
       */
      items: { type: Array },

      /**
       * Dragged item DOM node
       */
      draggedItem: { attribute: false },

      /**
       * Function called when item is dropped
       * 
       * @type {{onChange: Function}}
       */
      onChange: { type: Function }
    };
  }

  /**
   * Static getter styles.
   *
   * @returns  {Object}
   */
  static get styles() {
    return css`
      .dnd-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
      }
      .dnd-list__item--fade {
        opacity: 0.2;
      }
    `;
  }

  /**
   * Creates an instance of DNDList.
   */
  constructor() {
    super();

    // Initialize empty items
    this.items = [];

    // Initialize empty function
    this.onChange = (items) => { };
  }

  /**
   * Render life cycle hook.
   *
   * @returns  {customElement}
   */
  render() {
    return html`
      <ul class="dnd-list">
        ${isArrayEmpty(this.items)
        ? nothing
        : this.items.map((item, index) => {
          let isFaded = false;

          if (this.draggedItem) {
            isFaded = this.draggedItem.index === index;
          }

          return html` <li
                class="dnd-list__item ${classMap({ 'dnd-list__item--fade': isFaded })}"
                draggable="true"
                @dragstart="${this.handleDragStart}"
                @dragenter="${this.handleDragEnter}"
                @dragover="${this.handleDragOver}"
                @drop="${this.handleDrop}"
                @dragend="${this.handleDragEnd}"
                .index="${index}"
              >
                ${item}
              </li>`;
        })}
      </ul>
    `;
  }

  /**
   * Handle item dragstart event.
   *
   * @param {Event} event - dragstart event object
   */
  handleDragStart(event) {
    this.draggedItem = event.target;
    event.dataTransfer.effectAllowed = 'move';
  }

  /**
   * Handle item dragenter event.
   * Prevent default action of dragenter event.
   *
   * @param {Event} event - dragenter event object
   */
  handleDragEnter(event) {
    event.preventDefault();

    if (this.draggedItem) {
      this.setItems(this.draggedItem.index, event.target.index);
      this.draggedItem = event.target;
    }
  }

  /**
   * Handle item dragover event.
   * Prevent default action of dragover event only if group is defined.
   *
   * @param {Event} event - dragover event object
   */
  handleDragOver(event) {
    event.preventDefault();
  }

  /**
   * Handle item drop event.
   *
   * @param {Event} event - drop event object
   */
  handleDrop(event) {
    event.preventDefault();
  }

  /**
   * Handle item dragend event.
   *
   * @param {Event} event - Dragend event object
   */
  handleDragEnd(event) {
    event.preventDefault();
    const dropEffect = event.dataTransfer.dropEffect;

    if (dropEffect === 'move' && this.draggedItem) {
      this.onChange(this.items);
    }

    this.draggedItem = null;
  }

  /**
   * Position items in array according to dragged item and dropped over item.
   *
   * @param {Number} draggedItemIndex - Index of item dragged.
   * @param {Number} dropItemIndex - Index of item over which dragged item is dropped.
   * @returns {undefined}
   */
  setItems(draggedItemIndex, dropItemIndex) {
    const undraggedItems = [...this.items.slice(0, draggedItemIndex), ...this.items.slice(draggedItemIndex + 1)];

    this.items = insertItem(undraggedItems, this.items[draggedItemIndex], dropItemIndex);
  }
}

export default SortableDnd;
