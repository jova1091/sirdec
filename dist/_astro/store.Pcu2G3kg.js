let t=[],r=(a,u)=>{let n=[],e={get(){return e.lc||e.listen(()=>{})(),e.value},l:u||0,lc:0,listen(s,i){return e.lc=n.push(s,i||e.l)/2,()=>{let o=n.indexOf(s);~o&&(n.splice(o,2),--e.lc||e.off())}},notify(s,i){let o=!t.length;for(let l=0;l<n.length;l+=2)t.push(n[l],n[l+1],e.value,s,i);if(o){for(let l=0;l<t.length;l+=5){let f;for(let d=l+1;!f&&(d+=5)<t.length;)t[d]<t[l+1]&&(f=t.push(t[l],t[l+1],t[l+2],t[l+3],t[l+4]));f||t[l](t[l+2],t[l+3],t[l+4])}t.length=0}},off(){},set(s){let i=e.value;i!==s&&(e.value=s,e.notify(i))},subscribe(s,i){let o=e.listen(s,i);return s(e.value),o},value:a};return e},v=(a={})=>{let u=r(a);return u.setKey=function(n,e){let s=u.value;typeof e>"u"&&n in u.value?(u.value={...u.value},delete u.value[n],u.notify(s,n)):u.value[n]!==e&&(u.value={...u.value,[n]:e},u.notify(s,n))},u};const p=r(),h=r(),c=v({}),b=v({});function m(a){c.set(a.submodulos)}function g(a){b.set(a.variables)}export{h as a,g as b,m as c,p as m,c as s,b as v};