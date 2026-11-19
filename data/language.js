// Shared by the root layout's inline boot script and the client LanguageProvider.
export const STORAGE_KEY = "amt-lang";

// Runs in <head> before first paint: a saved Urdu choice sets lang/dir at once and hides the
// English HTML until React has rendered Urdu (the provider reveals it; the timeout is a safety net).
export const languageBootScript = `(function(){try{if(localStorage.getItem("${STORAGE_KEY}")==="ur"){var d=document.documentElement;d.lang="ur";d.dir="rtl";d.setAttribute("data-lang-pending","");setTimeout(function(){d.removeAttribute("data-lang-pending")},4000)}}catch(e){}})();`;
