/**
 * React Facebook Pixel Tracker
 * An easy-to-use solution for implementing Facebook Pixel tracking in React applications
 * 
 * @module react-fb-pixel-tracker
 */

// Main React hook
import useFacebookPixel from './hooks/useFacebookPixel';

// Export all individual tracking functions for more granular control
import * as fbEvents from './lib/facebookEvents';

// Export the hook as default export
export default useFacebookPixel;

// Export all individual functions
export {
  // Core functions
  fbEvents as FacebookEvents,

  // Individual events
  fbEvents.facebookPageView as trackPageView,
  fbEvents.facebookEvent as trackEvent,
  fbEvents.facebookCustomEvent as trackCustomEvent,
  fbEvents.facebookSubmitFormEvent as trackSubmitForm,
  fbEvents.facebookLeadEvent as trackLead,
  fbEvents.facebookViewContentEvent as trackViewContent,
  fbEvents.facebookAddToCartEvent as trackAddToCart,
  fbEvents.facebookInitiateCheckoutEvent as trackInitiateCheckout,
  fbEvents.facebookCompleteRegistrationEvent as trackCompleteRegistration,
  fbEvents.facebookStartTrialEvent as trackStartTrial,
  fbEvents.facebookTrackWithConsent as trackWithConsent,

  // Configuration functions
  fbEvents.enableDebugMode,
  fbEvents.setUserConsentStatus,
  fbEvents.setConsentRequirement,
  fbEvents.initializeFacebookPixel
};
