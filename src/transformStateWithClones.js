'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
// const state = {
//   foo: 'bar',
//   bar: 'foo',
// };

function transformStateWithClones(state, actions) {
  const history = [];
  const clone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(clone, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(clone, action.keysToRemove);
        break;

      case 'clear':
        clear(clone);
        break;
    }
    history.push({ ...clone });
  }

  return history;
}

function addProperties(data, extraData) {
  Object.assign(data, extraData);
}

function removeProperties(keys, keysToRemove) {
  for (const key of keysToRemove) {
    delete keys[key];
  }
}

function clear(state) {
  for (const prop in state) {
    delete state[prop];
  }
}

// console.log(
//   transformStateWithClones(state, [
//     {
//       type: 'addProperties',
//       extraData: { name: 'Jim', hello: 'world' },
//     },
//     {
//       type: 'removeProperties',
//       keysToRemove: ['bar', 'hello'],
//     },
//     {
//       type: 'addProperties',
//       extraData: { another: 'one' },
//     },
//   ]),
// );

module.exports = transformStateWithClones;
