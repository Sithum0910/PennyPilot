// --- Firebase init (paste your config) ---
const firebaseConfig = {
  apiKey: "AIzaSyCnodPUZZs4smAyw-9JQx1_3-iWIJzQeWU",
  authDomain: "pennypilot2-c0c07.firebaseapp.com",
  projectId: "pennypilot2-c0c07",
  storageBucket: "pennypilot2-c0c07.firebasestorage.app",
  messagingSenderId: "158582559799",
  appId: "1:158582559799:web:c756507f5ffdb1fcc89bb2"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();

// --- language / theme helpers ---
import { applyLang, buildLangSelect } from './i18n.js';
const LANG_KEY="lang"; const THEME_KEY="theme";

// 1) login-page logic
if(location.pathname.endsWith("index.html")||location.pathname==='/'){
  const sel=document.getElementById('langSel');
  buildLangSelect(sel);
  sel.value=localStorage.getItem(LANG_KEY)||'en';
  applyLang(sel.value);
  sel.onchange=e=>{ localStorage.setItem(LANG_KEY,sel.value); applyLang(sel.value); };

  document.getElementById("googleBtn").onclick=()=>{
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(()=>location.href="dashboard.html")
        .catch(err=>alert(err.message));
  };

  auth.onAuthStateChanged(user=>{
    if(user) location.href="dashboard.html";
  });
}

// 2) dashboard logic
if(location.pathname.endsWith("dashboard.html")){
  const sel=document.getElementById('langSel');
  buildLangSelect(sel);
  sel.value=localStorage.getItem(LANG_KEY)||'en';
  applyLang(sel.value);
  sel.onchange=e=>{ localStorage.setItem(LANG_KEY,sel.value); applyLang(sel.value); };

  // theme
  const toggle=document.getElementById("themeToggle");
  const setTheme=t=>{ document.body.classList.toggle("dark",t==="dark"); localStorage.setItem(THEME_KEY,t); toggle.textContent=(t==="dark")?"☀️":"🌙"; }
  setTheme(localStorage.getItem(THEME_KEY)||'light');
  toggle.onclick=()=>setTheme(document.body.classList.contains("dark")?'light':'dark');

  // logout
  document.getElementById("logoutBtn").onclick=()=>auth.signOut().then(()=>location.href="index.html");

  // ensure user
  let uid=null;
  auth.onAuthStateChanged(user=>{
    if(!user){ location.href="index.html"; return; }
    uid=user.uid;
    loadTx();
  });

  // add entry
  document.getElementById("addBtn").onclick= async()=>{
    const amount=parseFloat(amount.value); if(!amount) return;
    const tx={ amount, type:type.value, category:category.value||"General",
               note:note.value||"", date:Date.now() };
    await db.collection("users").doc(uid).collection("transactions").add(tx);
    amount.value=""; category.value=""; note.value="";
    loadTx();
  };

  // load & render
  async function loadTx(){
    const snap=await db.collection("users").doc(uid).collection("transactions").orderBy("date","desc").get();
    const list=document.getElementById("txList"); list.innerHTML="";
    let balance=0;
    snap.forEach(doc=>{
      const t=doc.data(); balance += (t.type==="income"?1:-1)*t.amount;
      const li=document.createElement("li"); li.className="tx";
      li.innerHTML=`<span>${new Intl.DateTimeFormat().format(t.date)} • ${t.category}</span>
                    <span>${t.type==="income"?"+":"-"}${t.amount.toFixed(2)}</span>`;
      li.onclick=()=>{ if(confirm("Delete entry?")){ doc.ref.delete().then(loadTx);} };
      list.appendChild(li);
    });
    document.getElementById("balanceLbl").textContent=balance.toFixed(2);
  }
}
