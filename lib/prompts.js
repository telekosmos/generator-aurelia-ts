'use strict';
require('sugar');

function mapped(list) {
  return list.map(function(elem) {
    return elem.replace(/\s/, '-').camelize(false); // MIND THE camelize as for rethinkDB!!!
  })
}

module.exports = {
  mapListAnswers: function(obj, listOfAnswers) {
    for (var answer of mapped(listOfAnswers))
      obj[answer] = answer;
  },
  value: function(answer, key) {
    if (typeof answer === 'undefined') return false;
    if (typeof answer === 'boolean') {
      return answer ? key : false;
    }
  }
}
