!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Player=e():(t.ZCC=t.ZCC||{},t.ZCC.Player=e())}(window,function(){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=41)}({40:function(t,e,i){"use strict";function n(t){this.init(t)}n.prototype.init=function(t){this.option=Object.assign({},{encoding:"16bitInt",channels:1,sampleRate:8e3,flushingTime:1e3},t),this.samples=new Float32Array,this.flush=this.flush.bind(this),this.interval=setInterval(this.flush,this.option.flushingTime),this.maxValue=this.getMaxValue(),this.typedArray=this.getTypedArray(),this.createContext()},n.prototype.getMaxValue=function(){var t={"8bitInt":128,"16bitInt":32768,"32bitInt":2147483648,"32bitFloat":1};return t[this.option.encoding]?t[this.option.encoding]:t["16bitInt"]},n.prototype.getTypedArray=function(){var t={"8bitInt":Int8Array,"16bitInt":Int16Array,"32bitInt":Int32Array,"32bitFloat":Float32Array};return t[this.option.encoding]?t[this.option.encoding]:t["16bitInt"]},n.prototype.createContext=function(){this.audioCtx=new(window.AudioContext||window.webkitAudioContext),this.gainNode=this.audioCtx.createGain(),this.gainNode.gain.value=1,this.gainNode.connect(this.audioCtx.destination),this.startTime=this.audioCtx.currentTime},n.prototype.isTypedArray=function(t){return t.byteLength&&t.buffer&&t.buffer.constructor==ArrayBuffer},n.prototype.feed=function(t){if(this.isTypedArray(t)){t=this.getFormatedValue(t);var e=new Float32Array(this.samples.length+t.length);e.set(this.samples,0),e.set(t,this.samples.length),this.samples=e}},n.prototype.getFormatedValue=function(t){t=new this.typedArray(t.buffer);var e,i=new Float32Array(t.length);for(e=0;e<t.length;e++)i[e]=t[e]/this.maxValue;return i},n.prototype.volume=function(t){this.gainNode.gain.value=t},n.prototype.destroy=function(){this.interval&&clearInterval(this.interval),this.samples=new Float32Array,this.audioCtx.close(),this.audioCtx=null},n.prototype.flush=function(){if(this.samples.length){var t,e,i,n,o,r=this.audioCtx.createBufferSource(),s=this.samples.length/this.option.channels,a=this.audioCtx.createBuffer(this.option.channels,s,this.option.sampleRate);for(e=0;e<this.option.channels;e++)for(t=a.getChannelData(e),i=e,o=50,n=0;n<s;n++)t[n]=this.samples[i],n<50&&(t[n]=t[n]*n/50),n>=s-51&&(t[n]=t[n]*o--/50),i+=this.option.channels;this.startTime<this.audioCtx.currentTime&&(this.startTime=this.audioCtx.currentTime),r.buffer=a,r.connect(this.gainNode),r.start(this.startTime),this.startTime+=a.duration,this.samples=new Float32Array}},t.exports=n},41:function(t,e,i){"use strict";var n=i(40);t.exports=n}})});