/**
 * @description This file contains the code for tracking events using Facebook Pixel
 * @namespace facebookEvents
 * @exports facebookPageView
 * @exports facebookEvent
 * @exports facebookCustomEvent
 * @exports facebookSubmitFormEvent
 * @exports facebookLeadEvent
 * @exports facebookViewContentEvent
 * @exports facebookInitiateCheckoutEvent
 * @exports facebookAddToCartEvent
 * @exports facebookCompleteRegistrationEvent
 * @exports facebookStartTrialEvent
 * @exports facebookTrackWithConsent
 */

/**
 * Configuration object for Facebook Pixel tracking
 * @private
 */
const config = {
  enableDebugMode: false,
  consentRequired: true,
  hasConsent: false
};

/**
 * @description Enable or disable debug mode for Facebook Pixel
 * @memberof facebookEvents
 * @function enableDebugMode
 * @param {boolean} enable - Whether to enable debug mode
 */
export const enableDebugMode = (enable = true) => {
  config.enableDebugMode = enable;
  if (enable && window.fbq) {
    window.fbq('set', 'autoConfig', false, 'YOUR_PIXEL_ID');
    console.info('Facebook Pixel debug mode enabled');
  }
};

/**
 * @description Set user consent status for tracking
 * @memberof facebookEvents
 * @function setUserConsentStatus
 * @param {boolean} hasConsent - Whether the user has given consent for tracking
 */
export const setUserConsentStatus = (hasConsent) => {
  config.hasConsent = !!hasConsent;
  console.info(`Facebook Pixel consent status set to: ${config.hasConsent}`);
};

/**
 * @description Set whether consent is required before tracking
 * @memberof facebookEvents
 * @function setConsentRequirement
 * @param {boolean} required - Whether consent is required
 */
export const setConsentRequirement = (required) => {
  config.consentRequired = !!required;
};

/**
 * @description Helper function to check if tracking is allowed
 * @private
 * @returns {boolean} Whether tracking is allowed
 */
const canTrack = () => {
  if (!window.fbq) {
    console.error('Facebook Pixel is not initialized');
    return false;
  }

  if (config.consentRequired && !config.hasConsent) {
    console.warn('User consent required but not provided for Facebook Pixel tracking');
    return false;
  }

  return true;
};

/**
 * @description This function is used to track page view event
 * @memberof facebookEvents
 * @function facebookPageView
 */
export const facebookPageView = () => {
  if (!canTrack()) return;

  window.fbq("track", "PageView");

  if (config.enableDebugMode) {
    console.info('Facebook Pixel PageView event fired');
  }
};

/**
 * @description This function is used to track events which is already defined in facebook
 * @memberof facebookEvents
 * @function facebookEvent
 * @param {string} eventName - The name of the event
 * @param {object} [eventOptions] - The options of the event
 */
export const facebookEvent = (eventName, eventOptions = {}) => {
  if (!canTrack()) return;

  if (!eventName) {
    console.error('Event name is required for Facebook Pixel tracking');
    return;
  }

  window.fbq("track", eventName, eventOptions);

  if (config.enableDebugMode) {
    console.info(`Facebook Pixel standard event fired: ${eventName}`, eventOptions);
  }
};

/**
 * @description This function is used to track custom events
 * @memberof facebookEvents
 * @function facebookCustomEvent
 * @param {string} eventName - The name of the event
 * @param {object} [eventOptions] - The options of the event
 */
export const facebookCustomEvent = (eventName, eventOptions = {}) => {
  if (!canTrack()) return;

  if (!eventName) {
    console.error('Event name is required for Facebook Pixel custom tracking');
    return;
  }

  window.fbq("trackCustom", eventName, eventOptions);

  if (config.enableDebugMode) {
    console.info(`Facebook Pixel custom event fired: ${eventName}`, eventOptions);
  }
};

/**
 * @description This function is used to track the event of submitting a form
 * @memberof facebookEvents
 * @function facebookSubmitFormEvent
 * @param {object} [formData] - Optional form data to include with the event
 * @param {string} [formName] - Optional name of the form being submitted
 */
export const facebookSubmitFormEvent = (formData = {}, formName = '') => {
  if (!canTrack()) return;

  const eventParams = {
    ...formData,
    ...(formName ? { form_name: formName } : {})
  };

  window.fbq("trackCustom", "SubmitForm", eventParams);

  if (config.enableDebugMode) {
    console.info(`Facebook Pixel SubmitForm event fired${formName ? ` for ${formName}` : ''}`, eventParams);
  }
};

/**
 * @description Track a Lead standard event
 * @memberof facebookEvents
 * @function facebookLeadEvent
 * @param {object} [eventOptions] - Additional parameters for the event
 */
export const facebookLeadEvent = (eventOptions = {}) => {
  facebookEvent('Lead', eventOptions);
};

/**
 * @description Track a ViewContent standard event
 * @memberof facebookEvents
 * @function facebookViewContentEvent
 * @param {object} contentData - Content information
 * @param {string|string[]} contentData.content_ids - ID(s) of the content
 * @param {string} contentData.content_type - Type of content (product, product_group, etc.)
 * @param {number} [contentData.value] - Monetary value of the content
 * @param {string} [contentData.currency] - Currency code (USD, EUR, etc.)
 */
export const facebookViewContentEvent = (contentData) => {
  facebookEvent('ViewContent', contentData);
};

/**
 * @description Track an AddToCart standard event
 * @memberof facebookEvents
 * @function facebookAddToCartEvent
 * @param {object} cartData - Cart information
 * @param {string|string[]} cartData.content_ids - ID(s) of the added products
 * @param {string} cartData.content_type - Type of content (product, product_group, etc.)
 * @param {number} cartData.value - Monetary value of the cart
 * @param {string} cartData.currency - Currency code (USD, EUR, etc.)
 */
export const facebookAddToCartEvent = (cartData) => {
  facebookEvent('AddToCart', cartData);
};

/**
 * @description Track an InitiateCheckout standard event
 * @memberof facebookEvents
 * @function facebookInitiateCheckoutEvent
 * @param {object} checkoutData - Checkout information
 */
export const facebookInitiateCheckoutEvent = (checkoutData = {}) => {
  facebookEvent('InitiateCheckout', checkoutData);
};

/**
 * @description Track a CompleteRegistration standard event
 * @memberof facebookEvents
 * @function facebookCompleteRegistrationEvent
 * @param {object} [registrationData] - Registration information
 */
export const facebookCompleteRegistrationEvent = (registrationData = {}) => {
  facebookEvent('CompleteRegistration', registrationData);
};

/**
 * @description Track a StartTrial standard event
 * @memberof facebookEvents
 * @function facebookStartTrialEvent
 * @param {object} trialData - Trial information
 * @param {string} trialData.currency - Currency code (USD, EUR, etc.)
 * @param {number} trialData.value - Monetary value of the trial
 * @param {string} [trialData.predicted_ltv] - Predicted lifetime value
 */
export const facebookStartTrialEvent = (trialData) => {
  facebookEvent('StartTrial', trialData);
};

/**
 * @description Utility function to only track events if user has given consent
 * @memberof facebookEvents
 * @function facebookTrackWithConsent
 * @param {Function} trackingFunction - The tracking function to call
 * @param  {...any} args - Arguments to pass to the tracking function
 * @returns {boolean} Whether the event was tracked
 */
export const facebookTrackWithConsent = (trackingFunction, ...args) => {
  if (!config.hasConsent) {
    if (config.enableDebugMode) {
      console.warn('Facebook Pixel tracking skipped due to missing consent');
    }
    return false;
  }

  trackingFunction(...args);
  return true;
};

/**
 * @description Initialize Facebook Pixel with advanced options
 * @memberof facebookEvents
 * @function initializeFacebookPixel
 * @param {string} pixelId - Your Facebook Pixel ID
 * @param {object} [options] - Advanced initialization options
 * @param {boolean} [options.debug=false] - Enable debug mode
 * @param {boolean} [options.consentRequired=true] - Whether consent is required
 * @param {boolean} [options.hasConsent=false] - Initial consent status
 */
export const initializeFacebookPixel = (pixelId, options = {}) => {
  if (!pixelId) {
    console.error('Facebook Pixel ID is required for initialization');
    return;
  }

  if (!window.fbq) {
    console.error('Facebook Pixel base code not found on page');
    return;
  }

  // Apply options
  if (options.debug !== undefined) enableDebugMode(options.debug);
  if (options.consentRequired !== undefined) setConsentRequirement(options.consentRequired);
  if (options.hasConsent !== undefined) setUserConsentStatus(options.hasConsent);

  // Initialize pixel with provided ID
  window.fbq('init', pixelId);

  if (config.enableDebugMode) {
    console.info(`Facebook Pixel initialized with ID: ${pixelId}`);
  }

  // Automatically track initial page view
  facebookPageView();
};
