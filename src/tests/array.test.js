import { assert } from 'chai';
import { describe, it } from 'mocha';

import * as arrayUtils from '../utils/array';

describe('Array Tests', function () {
  const array = [1, 2, 3, 4, 5];

  describe('Check if an array is empty or not', function () {

    context('with empty array', function () {
      it('should return true', function () {
        assert.isTrue(arrayUtils.isEmpty([]))
      })
    })

    context('with non empty array', function () {
      it('should return false', function () {
        assert.isFalse(arrayUtils.isEmpty(array))
      })
    })

    context('with non array type', function () {
      it('should throw TypeError', function () {
        assert.throws(() => { arrayUtils.isEmpty(1) }, TypeError, 'array expected')
      })
    })
  })

  describe('Insert item in specified index of given array', function () {

    context('with non empty array', function () {
      it('should return array with insertion', function () {
        const expectedArray = [0, 1, 2, 3, 4, 5];
        const actualArray = arrayUtils.insertItem(array, 0, 0);

        assert.deepEqual(actualArray, expectedArray)
      })
    })

    context('with non array type', function () {
      it('should throw TypeError', function () {
        assert.throws(() => { arrayUtils.insertItem(1, 0, 0) }, TypeError, 'array expected')
      })
    })
  })

  describe('Remove item of specified index from given array', function () {

    context('with array type', function () {
      it('should return array with deletion', function () {
        const expectedArray = [1, 2, 3, 5];
        const actualArray = arrayUtils.removeItem(array, 3);

        assert.deepEqual(actualArray, expectedArray)
      })
    })

    context('with non array type', function () {
      it('should throw TypeError', function () {
        assert.throws(() => { arrayUtils.removeItem(1, 0, 0) }, TypeError, 'array expected')
      })
    })
  })

})