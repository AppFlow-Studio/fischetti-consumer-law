import Script from "next/script"
import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from "@/lib/consent"

export default function ConsentModeScript() {
  const script = `
(function(){
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };

  var preferences = null;
  try {
    var raw = window.localStorage && window.localStorage.getItem('${CONSENT_STORAGE_KEY}');
    if (raw) {
      var parsed = JSON.parse(raw);
      if (parsed && parsed.version === ${CONSENT_VERSION} && parsed.necessary === true) {
        preferences = parsed;
      }
    }
  } catch (e) {}

  function value(category) {
    return preferences && preferences[category] === false ? 'denied' : 'granted';
  }

  window.gtag('consent', 'default', {
    ad_storage: value('marketing'),
    analytics_storage: value('analytics'),
    ad_user_data: value('marketing'),
    ad_personalization: value('marketing'),
    functionality_storage: value('functional'),
    personalization_storage: value('functional'),
    security_storage: 'granted'
  });

  window.__clfConsent = preferences;
})();`

  return (
    <Script
      id="clf-consent-default"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: script }}
    />
  )
}
