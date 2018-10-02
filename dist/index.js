!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.tablecrud=t():e.tablecrud=t()}(global,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t,n){this.pool=e,this.tableName=t,this.rowTypes=n}return e.prototype.all=function(e){var t=this;return new Promise(function(n,r){t.pool.query("SELECT * FROM "+t.tableName+" "+(e?"ORDER BY "+e:""),function(e,t){return e?r(e):n(t)})})},e.prototype.one=function(e){var t=this;return new Promise(function(n,r){t.pool.query("SELECT * FROM "+t.tableName+" WHERE id = ?",e,function(e,t){return e?r(e):n(t[0])})})},e.prototype.insert=function(e){var t=this;return new Promise(function(n,r){t.pool.query("insert into "+t.tableName+" ("+Object.keys(e).map(function(e){return""+e})+") VALUES("+Object.keys(e).map(function(e){return"?"})+");",t.rowToValueArray(e),function(e,t){return e?r(e):n({id:t.insertId})})})},e.prototype.update=function(e,t){var n=this,r=this.rowToValueArray(t);return r.push(e),new Promise(function(e,o){n.pool.query("UPDATE "+n.tableName+" SET "+Object.keys(t).map(function(e){return e+" = ?"})+" WHERE id = ?",r,function(t,n){return t?o(t):e(n.affectedRows)})})},e.prototype.delete=function(e){var t=this;return new Promise(function(n,r){t.pool.query("DELETE FROM "+t.tableName+" WHERE id = ?",e,function(e,t){return e?r(e):n(t.affectedRows)})})},e.prototype.find=function(e){var t=this;return new Promise(function(n,r){t.pool.query("SELECT * FROM "+t.tableName+" WHERE "+Object.keys(e).map(function(e){return e+" = ?"}),t.rowToValueArray(e),function(e,t){return e?r(e):n(t)})})},e.prototype.findOne=function(e){var t=this;return new Promise(function(n,r){var o="SELECT * FROM "+t.tableName+" WHERE "+Object.keys(e).map(function(e){return e+" = ?"}).join(" and ")+" LIMIT 1;";console.log(o),t.pool.query(o,t.rowToValueArray(e),function(e,t){return e?r(e):n(t[0])})})},e.prototype.rowToValueArray=function(e){var t=[];return Object.keys(e).map(function(n){t.push(e[n])}),t},e}();t.default=r}])});