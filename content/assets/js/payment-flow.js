(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var confirmButton = document.getElementById('btn-confirm-payment');
    if (!confirmButton) return;
    confirmButton.addEventListener('click', function () {
      window.location.href = 'transfer.html';
    });
  });
})();