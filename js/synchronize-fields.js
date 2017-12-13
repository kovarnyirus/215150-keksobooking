'use strict';
(function () {
  function synchronizeFields(syncField, syncedField, syncArray, syncedArray, callback) {
    var index = syncArray.indexOf(syncField.value);
    callback(syncedField, syncedArray[index]);
  }
  window.synchronizeFields = synchronizeFields;
})();
