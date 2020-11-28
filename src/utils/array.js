/**
 * Check if array is empty or not.
 *
 * @param {Array} array
 * @returns {Boolean}
 */
export const isEmpty = (array) => {
    if (Array.isArray(array)) {
        return !array.length;
    }

    throw new TypeError('array expected');
};

/**
 * Insert item in specified index of given list.
 *
 * @param {Array} list - List of items
 * @param {any} item - Item to insert into list
 * @param {Number} index - Index to insert the item
 * @returns {Array} List with item inserted
 */
export const insertItem = (list, item, index) => {
    if (Array.isArray(list)) {
        return [...list.slice(0, index), item, ...list.slice(index)];
    }

    throw new TypeError('array expected');
};

/**
 * Remove item in index from list.
 *
 * @param {Array} list - List of items
 * @param {Number} index - Index of item
 * @returns {Array} List with item removed
 */
export const removeItem = (list, index) => {
    if (Array.isArray(list)) {
        return list.filter((item, i) => index !== i);
    }

    throw new TypeError('array expected');
};
