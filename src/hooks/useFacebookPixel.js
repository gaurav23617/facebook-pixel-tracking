/**
 * @description React hook to implement Facebook Pixel tracking in your application
 * @module useFacebookPixel
 * @returns {Object} Methods to interact with Facebook Pixel
 */
import { useEffect, useCallback } from 'react';
import * as fbEvents from '../lib/facebookEvents';

/**
 * React hook for easily implementing Facebook Pixel in your application
 * @param {Object} options - Configuration options
 * @param {string} options.pixelId - Your Facebook Pixel ID (required)
 * @param {boolean} [options.debug=false] - Enable debug mode
 * @param {boolean} [options.consentRequired=true] - Whether consent is required before tracking
 * @param {boolean} [options.hasInitialConsent=false] - Initial consent status
 * @param {boolean} [options.autoInit=true] - Automatically initialize the pixel with the provided ID
 * @returns {Object} Facebook Pixel tracking methods
 */
const useFacebookPixel = ({
  pixelId,
  debug = false,
  consentRequired = true,
  hasInitialConsent = false,
  autoInit = true
} = {}) => {
  // Initialize Facebook Pixel script
  useEffect(() => {
    if (!pixelId) {
      console.error('Facebook Pixel ID is required for initialization');
      return;
    }

    // Check if Facebook Pixel script is already present
    if (!window.fbq) {
      // Dynamically inject the Facebook Pixel script into the page
      (function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );
    }

    // Initialize the Facebook Pixel events module if autoInit is true
    if (autoInit && window.fbq) {
      fbEvents.initializeFacebookPixel(pixelId, {
        debug,
        consentRequired,
        hasConsent: hasInitialConsent
      });
    }

    // Cleanup function (optional)
    return () => {
      // Nothing to clean up for the Facebook Pixel
    };
  }, [pixelId, debug, consentRequired, hasInitialConsent, autoInit]);

  // Update consent status
  const setConsent = useCallback((hasConsent) => {
    fbEvents.setUserConsentStatus(hasConsent);
  }, []);

  // Return all the tracking methods and utilities
  return {
    // Core functions
    pageView: fbEvents.facebookPageView,
    track: fbEvents.facebookEvent,
    trackCustom: fbEvents.facebookCustomEvent,
    trackWithConsent: fbEvents.facebookTrackWithConsent,

    // Consent management
    setConsent,

    // Common event shortcuts
    trackLead: fbEvents.facebookLeadEvent,
    trackViewContent: fbEvents.facebookViewContentEvent,
    trackAddToCart: fbEvents.facebookAddToCartEvent,
    trackInitiateCheckout: fbEvents.facebookInitiateCheckoutEvent,
    trackCompleteRegistration: fbEvents.facebookCompleteRegistrationEvent,
    trackStartTrial: fbEvents.facebookStartTrialEvent,
    trackSubmitForm: fbEvents.facebookSubmitFormEvent,

    // Configuration
    enableDebugMode: fbEvents.enableDebugMode,
    setConsentRequirement: fbEvents.setConsentRequirement,
  };
};

export default useFacebookPixel;
