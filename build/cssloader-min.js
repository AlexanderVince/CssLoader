/**
 * cssloader.js
 * 
 * @author Alexander Vince https://github.com/AlexanderVince 
 * @copyright 2015 Alexander Vince 
 * @license BSD 3-Clause <http://opensource.org/licenses/BSD-3-Clause>
 *
 */
window.CssLoader=function(a,b,c){"use strict";var d={__initialised:!1,require:function(c){return this.__initialised?!1:(this.__initialised=!0,this.__head=b.getElementsByTagName("head")[0],this.__len=this.__head.getElementsByTagName("link").length,this.__queries=c,a.matchMedia?(this.__addListener(),this.__matchMedia(),this):(this.__matchMedia(!0),this))}};return d.__addListener=function(){if(a.addEventListener){var b=this;a.addEventListener("resize",function(){b.__matchMedia()},!1)}},d.__matchMedia=function(b){for(var c=[].concat(this.__queries),d=0,e=c.length;e>d;d++){var f=c[d],g=a.matchMedia(f.media);(b||!f.rendered&&g.matches)&&(this.__writeTag(f),c[d].rendered=!0)}this.__queries=[].concat(c)},d.__writeTag=function(a){for(var c,d,e=[].concat(this.__queries),f=b.getElementsByTagName("head")[0],g=f.getElementsByTagName("link"),h=this.__createTag(a),i=[],j=0,k=e.length;k>j;j++){var l=e[j];l.href===a.href?(i.push(l),c=i.length-1):l.rendered&&i.push(l)}d=g[this.__len+c],d?f.insertBefore(h,d):f.appendChild(h)},d.__createTag=function(a){var c=b.createElement("link");return c.rel="stylesheet",c.type="text/css",c.href=a.href,c.media=a.media,c},d}(window,document);