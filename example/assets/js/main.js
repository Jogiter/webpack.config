!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/a/b/c/",n(n.s=1)}([function(t,e,n){"use strict";n.r(e),n.d(e,"msg",function(){return r});var r="module a"},function(t,e,n){"use strict";n.r(e);var r,o,u=n(0);r="".concat(u," says hello to you"),o=document.getElementById("result"),function(t,e){var n;function r(t){return t>9?"".concat(t):"0".concat(t)}function o(t){var e,n,o,u=0;return t>86400&&(u=Math.floor(t/86400),t%=86400),e=Math.floor(t/3600),t%=3600,n=Math.floor(t/60),o=t%60,{day:r(u),hour:r(e),min:r(n),sec:r(o)}}function u(){e(o(--t)),!t&&clearInterval(n)}(t=Math.round(t))>0?(n=setInterval(u,1e3),u()):e(o(0))}(10,function(t){var e=t.day,n=t.hour,u=t.min,c=t.sec;o.html=e||n||u||c?"".concat(r,"=>").concat(e,"天").concat(n,"时").concat(u,"分").concat(c,"秒"):"倒计时结束"})}]);