/* language data – ENG + 10 most-used languages */
const LANGS = {
  en:{ welcome:"Budget Tracker", signin_google:"Sign in with Google", language:"Language",
       title_dash:"My Budget", new_entry:"New Entry", income:"Income", expense:"Expense",
       add:"Add", history:"History" },
  zh:{ welcome:"预算跟踪器", signin_google:"使用 Google 登录", language:"语言",
       title_dash:"我的预算", new_entry:"新条目", income:"收入", expense:"支出",
       add:"添加", history:"记录" },
  es:{ welcome:"Control de Presupuesto", signin_google:"Iniciar con Google", language:"Idioma",
       title_dash:"Mi Presupuesto", new_entry:"Nuevo Registro", income:"Ingreso", expense:"Gasto",
       add:"Añadir", history:"Historial" },
  hi:{ welcome:"बजट ट्रैकर", signin_google:"Google से साइन इन", language:"भाषा",
       title_dash:"मेरा बजट", new_entry:"नई प्रविष्टि", income:"आय", expense:"व्यय",
       add:"जोड़ें", history:"इतिहास" },
  ar:{ welcome:"متعقب الميزانية", signin_google:"تسجيل دخول Google", language:"اللغة",
       title_dash:"ميزانيتي", new_entry:"إضافة عملية", income:"دخل", expense:"مصروف",
       add:"إضافة", history:"السجل" },
  bn:{ welcome:"বাজেট ট্র্যাকার", signin_google:"Google দিয়ে সাইন ইন", language:"ভাষা",
       title_dash:"আমার বাজেট", new_entry:"নতুন এন্ট্রি", income:"আয়", expense:"খরচ",
       add:"যোগ করুন", history:"ইতিহাস" },
  pt:{ welcome:"Rastreador de Orçamento", signin_google:"Entrar com Google", language:"Idioma",
       title_dash:"Meu Orçamento", new_entry:"Nova Entrada", income:"Receita", expense:"Despesa",
       add:"Adicionar", history:"Histórico" },
  ru:{ welcome:"Учёт бюджета", signin_google:"Войти через Google", language:"Язык",
       title_dash:"Мой бюджет", new_entry:"Новая запись", income:"Доход", expense:"Расход",
       add:"Добавить", history:"История" },
  ja:{ welcome:"予算トラッカー", signin_google:"Googleでログイン", language:"言語",
       title_dash:"マイ予算", new_entry:"新規追加", income:"収入", expense:"支出",
       add:"追加", history:"履歴" },
  de:{ welcome:"Budget-Tracker", signin_google:"Mit Google anmelden", language:"Sprache",
       title_dash:"Mein Budget", new_entry:"Neuer Eintrag", income:"Einnahme", expense:"Ausgabe",
       add:"Hinzufügen", history:"Historie" },
  fr:{ welcome:"Suivi de Budget", signin_google:"Se connecter avec Google", language:"Langue",
       title_dash:"Mon Budget", new_entry:"Nouvelle Entrée", income:"Revenu", expense:"Dépense",
       add:"Ajouter", history:"Historique" }
};

function applyLang(lang){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key=el.dataset.i18n;
    if(LANGS[lang] && LANGS[lang][key]) el.textContent=LANGS[lang][key];
  });
}
function buildLangSelect(sel){
  Object.keys(LANGS).forEach(code=>{
    const op=document.createElement("option"); op.value=code; op.textContent=code.toUpperCase();
    sel.appendChild(op);
  });
}
export { LANGS, applyLang, buildLangSelect };
