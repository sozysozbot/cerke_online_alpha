(()=>{"use strict";var e={2392:(e,o)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.API_ORIGIN=void 0,o.API_ORIGIN="https://serene-reef-96808.herokuapp.com"}},o={};function t(n){var r=o[n];if(void 0!==r)return r.exports;var i=o[n]={exports:{}};return e[n](i,i.exports,t),i.exports}(()=>{const e=t(2392);let o;async function n(o,t){return await r(location.href.includes("staging")?`${e.API_ORIGIN}/matching/friend/poll/staging`:`${e.API_ORIGIN}/matching/friend/poll`,{session_token:o},t)}async function r(e,o,t){const n=await fetch(e,{method:"POST",body:JSON.stringify(o),headers:{"Content-Type":"application/json"},keepalive:!0}).then((e=>e.json())).then(t).catch((e=>{console.error("Error:",e)}));if(console.log(n),!n)throw alert("network error!"),new Error("network error!");return n}(async()=>{const t=await async function(o){return await r(location.href.includes("staging")?`${e.API_ORIGIN}/matching/friend/make_room/staging`:`${e.API_ORIGIN}/matching/friend/make_room`,{},(e=>e))}();o=t;const i=location.href.split("/");i[i.length-1]=`friend_join_room.html?room_id=${t.room_id}&room_key=${t.room_key}`,document.getElementById("url").value=i.join("/");let s=await n(t.session_token,(e=>e));for(;"Ok"!==s.type||"LetTheGameBegin"!==s.ret.type;)await new Promise((e=>setTimeout(e,200*(2+Math.random())*.8093))),s=await n(t.session_token,(e=>e));var a,_,m;a=t.session_token,_=s.ret.is_first_move_my_move,m=s.ret.is_IA_down_for_me,sessionStorage.vs="someone",sessionStorage.session_token=a,sessionStorage.is_first_move_my_move=JSON.stringify(_),sessionStorage.is_IA_down_for_me=JSON.stringify(m),location.href="main.html"})()})()})();