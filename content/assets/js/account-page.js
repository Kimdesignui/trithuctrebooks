(function(){
  'use strict';
  function init(){
    var form=document.querySelector('.ttb-account-form');
    if(!form)return;
    form.addEventListener('submit',function(event){
      event.preventDefault();
      var notice=form.querySelector('.ttb-account-notice');
      if(notice)notice.classList.add('show');
    });
    var logout=document.querySelector('[data-demo-logout]');
    if(logout)logout.addEventListener('click',function(){
      localStorage.removeItem('ttb-demo-authenticated');
      localStorage.removeItem('ttb-demo-user');
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
