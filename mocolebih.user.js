// ==UserScript==
// @name           mocolebih
// @namespace      vachzar/mocolebih
// @description    membaca lebih web-web berita ampas
// @homepageURL    http://vachzar.com/mocolebih
// @supportURL     https://github.com/vachzar/mocolebih/issues
// @icon           https://raw.githubusercontent.com/vachzar/mocolebih/master/img/logo.png
// @updateURL      https://raw.githubusercontent.com/vachzar/mocolebih/master/mocolebih.meta.js
// @downloadURL    https://raw.githubusercontent.com/vachzar/mocolebih/master/mocolebih.user.js
// @version        1.1
// @license        DBAD
// @grant          GM_addStyle
// @author         vachzar
// @require        http://code.jquery.com/jquery-1.10.1.min.js
// @run-at         document-start
// @include        http://*.tribunnews.com/*
// @include        http://*.viva.co.id/news/read/*
// allow pasting
// ==/UserScript==

$( document ).ready(function() {
  Baca(/tribunnews.com/, Tribun);
  Baca(/viva.co.id/, Viva);
});

function Baca(check, callback) {
  if (check.test(window.location.host)) {
     callback();
     controls();
  }
}

var Tribun = function(){
  var links = [];
  $(document).find('.paging a').each(function () {
    links.push($(this).attr('href'));
  });
  
  $.each(links, function( index, value ) {
    if(index !== 0){
      var data = $.ajax({url: value, data: {param1: value, param2: value}, async: false}).responseText; 
      $(data).find('.txt-article').each(function(){
        $('.txt-article').append($(this).html());
      });
    }
  });  
    $('.paging').prev('div').hide();
    $('.paging').hide();  
    $('.txt-article').append( "<p><b>"+links.length+" Pages Loaded by MocoLebih </b></p>" );
};

var Viva = function(){
  var links = [];
  $(document).find('.pagelist a.page').each(function () {
    links.push($(this).attr('href'));
  });
  
  $.each(links, function( index, value ) {
    if(index !== 0){
      var data = $.ajax({url: value, data: {param1: value, param2: value}, async: false}).responseText; 
      $(data).find('#article-content > span').each(function(){
        $('#article-content > span').append($(this).html());
      });
    }
  });  
    $('.pagelist').prev('div').hide();
    $('.pagelist').hide();  
    $('#article-content').append( "<p><b>"+links.length+" Pages Loaded by MocoLebih </b></p>" );
};
