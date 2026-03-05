export const YM_ID = 107098259

export const PIXEL = {}

export const AEVENT = {
  clickLogoAviasales: 'click_logo_aviasales',
  clickLogoRich: 'click_logo_rich',
  clickRules: 'click_rules',
  clickProitiOpros: 'click_proiti_opros',
  clickKRozygryshy: 'click_k_rozygryshy',
  clickOk: 'click_ok',
  clickUbedili: 'click_ubedili',
  clickPeredymat: 'click_peredymat',
  clickSticker: 'click_sticker',
  clickVybratNapitki: 'click_vybrat_napitki',
  clickSend: 'click_send',
  clickVk: 'click_vk',
  clickWa: 'click_wa',
  clickTg: 'click_tg',
  clickCopy: 'click_copy',
}

export const METRIKA = {
  ym: {
    script: `(function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}', 'ym');

    ym(${YM_ID}, 'init', {ssr:true, clickmap:true, referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`,
    noscript: `<div><img src="https://mc.yandex.ru/watch/${YM_ID}" style="position:absolute; left:-9999px;" alt="" /></div>`,
  },

  mailru: {
    script: `var _tmr = window._tmr || (window._tmr = []);
      _tmr.push({id: "3746698", type: "pageView", start: (new Date()).getTime()});
      (function (d, w, id) {
        if (d.getElementById(id)) return;
        var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
        ts.src = "https://top-fwz1.mail.ru/js/code.js";
        var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
        if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
      })(document, window, "tmr-code");`,
    noscript: `<div><img src="https://top-fwz1.mail.ru/counter?id=3746698;js=na" style="position:absolute;left:-9999px;" alt="Top.Mail.Ru" /></div>`,
  },
}
