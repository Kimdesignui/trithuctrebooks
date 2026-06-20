(function(){
  'use strict';
  var readUrl='https://ebookbanquyen.vn/ebook/doc-sach/31305/1';
  var detailUrl='trang-chi-tiet-sach.html';
  var audioUrl='nghe-audiobooks.html';
  var progressValues=[93,74,48,62,31,85,56,19,67,42,90,25,71,38,82,53,16,64,77,34];
  var paperBookIndexes=[1,3,4,6,8,10];
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
    var readingMode=/\/customer\/reading-book\/?$/i.test(location.pathname);
    var purchasedMode=/\/customer\/purchased-book\/?$/i.test(location.pathname);
    document.querySelectorAll('.ttb-purchased-card').forEach(function(card,index){
      var initialBadge=card.querySelector('.ttb-purchased-badge');
      if(readingMode&&initialBadge&&initialBadge.textContent.trim().toLowerCase()==='video'){card.remove();return;}
      var days=card.querySelector('.ttb-purchased-days');
      var action=card.querySelector('.ttb-book-action');
      var badge=card.querySelector('.ttb-purchased-badge');
      var isPaper=purchasedMode&&paperBookIndexes.indexOf(index)>-1;
      setTarget(card.querySelector('.ttb-purchased-cover'),detailUrl,false);
      if(!action)return;
      if(purchasedMode){
        if(isPaper&&badge){badge.textContent='Sách giấy';badge.className='ttb-purchased-badge paper';}
        action.textContent='Xem chi tiết';
        action.className='ttb-book-action purple';
        setTarget(action,detailUrl,false);
        if(days)days.remove();
        return;
      }
      if(isPaper){
        if(badge){badge.textContent='Sách giấy';badge.className='ttb-purchased-badge paper';}
        action.textContent='Xem chi tiết';
        action.className='ttb-book-action purple';
        setTarget(action,detailUrl,false);
        if(days)days.remove();
        return;
      }
      if(days)days.parentNode.insertBefore(createProgress(progressValues[index%progressValues.length]),days);
      var text=action.textContent.trim().toLowerCase();
      if(text.indexOf('nghe')>-1)setTarget(action,audioUrl,false);
      else if(text.indexOf('đọc')>-1)setTarget(action,readUrl,true);
      else setTarget(action,detailUrl,false);
    });
    if(purchasedMode){
      document.querySelectorAll('.ttb-recent-meta span').forEach(function(item){
        if(item.textContent.toLowerCase().indexOf('còn')>-1)item.remove();
      });
      var recentProgress=document.querySelector('.ttb-reading-progress');
      if(recentProgress)recentProgress.remove();
      var recentActions=document.querySelector('.ttb-recent-actions');
      if(recentActions){
        recentActions.innerHTML='<a class="ttb-action-purple" href="'+detailUrl+'">Xem chi tiết</a>';
      }
    }
    document.querySelectorAll('.ttb-recent-actions a').forEach(function(link){
      var text=link.textContent.trim().toLowerCase();
      if(text.indexOf('đọc')>-1)setTarget(link,readUrl,true);
      else if(text.indexOf('nghe')>-1)setTarget(link,audioUrl,false);
      else setTarget(link,detailUrl,false);
    });
    document.querySelectorAll('.ttb-purchased-pagination a').forEach(function(link,index){
      var label=link.textContent.trim();
      var page=/^\d+$/.test(label)?label:(index===0?'2':'4');
      link.href=(readingMode?'/customer/reading-book':'/customer/purchased-book')+'?page='+page;
    });
    if(readingMode){
      var videoAction=document.querySelector('.ttb-recent-actions .ttb-action-red');
      if(videoAction)videoAction.remove();
    }
    var recent=document.querySelector('.ttb-reading-progress');
    if(readingMode&&recent){recent.innerHTML='';recent.appendChild(createProgress(93));}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
