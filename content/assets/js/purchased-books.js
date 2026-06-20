(function(){
  'use strict';
  var readUrl='https://ebookbanquyen.vn/ebook/doc-sach/31305/1';
  var detailUrl='trang-chi-tiet-sach.html';
  var audioUrl='nghe-audiobooks.html';
  var progressValues=[93,74,48,62,31,85,56,19,67,42,90,25,71,38,82,53,16,64,77,34];
  function setTarget(link,url,external){
    if(!link)return;
    link.href=url;
    if(external){link.target='_blank';link.rel='noopener noreferrer';}
  }
  function createProgress(value){
    var wrap=document.createElement('div');
    wrap.className='ttb-book-progress';
    var progress=document.createElement('progress');
    progress.max=100;
    progress.value=value;
    progress.setAttribute('aria-label','Tiến độ đọc '+value+'%');
    var label=document.createElement('span');
    label.textContent=value+'%';
    wrap.append(progress,label);
    return wrap;
  }
  function init(){
    document.querySelectorAll('.ttb-purchased-card').forEach(function(card,index){
      var days=card.querySelector('.ttb-purchased-days');
      if(days)days.parentNode.insertBefore(createProgress(progressValues[index%progressValues.length]),days);
      setTarget(card.querySelector('.ttb-purchased-cover'),detailUrl,false);
      var action=card.querySelector('.ttb-book-action');
      if(!action)return;
      var text=action.textContent.trim().toLowerCase();
      if(text.indexOf('nghe')>-1)setTarget(action,audioUrl,false);
      else if(text.indexOf('đọc')>-1)setTarget(action,readUrl,true);
      else setTarget(action,detailUrl,false);
    });
    document.querySelectorAll('.ttb-recent-actions a').forEach(function(link){
      var text=link.textContent.trim().toLowerCase();
      if(text.indexOf('đọc')>-1)setTarget(link,readUrl,true);
      else if(text.indexOf('nghe')>-1)setTarget(link,audioUrl,false);
      else setTarget(link,detailUrl,false);
    });
    document.querySelectorAll('.ttb-purchased-pagination a').forEach(function(link,index){
      var label=link.textContent.trim();
      var page=/^\d+$/.test(label)?label:(index===0?'2':'4');
      link.href='/customer/purchased-book?page='+page;
    });
    var recent=document.querySelector('.ttb-reading-progress');
    if(recent){recent.innerHTML='';recent.appendChild(createProgress(93));}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
