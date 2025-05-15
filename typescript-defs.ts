/**
 * Type definitions for react-fb-pixel-tracker
 */

declare module 'react-fb-pixel-tracker' {
  /**
   * Options for useFacebookPixel hook
   */
  export interface FacebookPixelOptions {
    /** Your Facebook Pixel ID */
    pixelId: string;
    /** Enable debug mode */
    debug?: boolean;
    /** Whether consent is required before tracking */
    consentRequired?: boolean;
    /** Initial consent status */
    hasInitialConsent?: boolean;
    /** Automatically initialize the pixel with the provided ID */
    autoInit?: boolean;
  }

  /**
   * Return value from useFacebookPixel hook
   */
  export interface FacebookPixelMethods {
    /** Track page view event */
    pageView: () => void;
    /** Track standard Facebook events */
    track: (eventName: string, eventOptions?: Record<string, any>) => void;
    /** Track custom events */
    trackCustom: (eventName: string, eventOptions?: Record<string, any>) => void;
    /** Track only if consent is given */
    trackWithConsent: <T extends any[]>(trackingFunction: (...args: T) => void, ...args: T) => boolean;
    /** Update consent status */
    setConsent: (hasConsent: boolean) => void;
    /** Track Lead event */
    trackLead: (eventOptions?: Record<string, any>) => void;
    /** Track ViewContent event */
    trackViewContent: (contentData: {
      content_ids: string | string[];
      content_type: string;
      value?: number;
      currency?: string;
      [key: string]: any;
    }) => void;
    /** Track AddToCart event */
    trackAddToCart: (cartData: {
      content_ids: string | string[];
      content_type: string;
      value: number;
      currency: string;
      [key: string]: any;
    }) => void;
    /** Track InitiateCheckout event */
    trackInitiateCheckout: (checkoutData?: Record<string, any>) => void;
    /** Track CompleteRegistration event */
    trackCompleteRegistration: (registrationData?: Record<string, any>) => void;
    /** Track StartTrial event */
    trackStartTrial: (trialData: {
      currency: string;
      value: number;
      predicted_ltv?: string;
      [key: string]: any;
    }) => void;
    /** Track form submission event */
    trackSubmitForm: (formData?: Record<string, any>, formName?: string) => void;
    /** Enable/disable debug mode */
    enableDebugMode: (enable?: boolean) => void;
    /** Set whether consent is required */
    setConsentRequirement: (required: boolean) => void;
  }

  /**
   * React hook for easily implementing Facebook Pixel in your application
   */
  export default function useFacebookPixel(options?: FacebookPixelOptions): FacebookPixelMethods;

  /**
   * Enable or disable debug mode for Facebook Pixel
   */
  export function enableDebugMode(enable?: boolean): void;

  /**
   * Set user consent status for tracking
   */
  export function setUserConsentStatus(hasConsent: boolean): void;

  /**
   * Set whether consent is required before tracking
   */
  export function setConsentRequirement(required: boolean): void;

  /**
   * Track page view event
   */
  export function trackPageView(): void;

  /**
   * Track standard events
   */
  export function trackEvent(eventName: string, eventOptions?: Record<string, any>): void;

  /**
   * Track custom events
   */
  export function trackCustomEvent(eventName: string, eventOptions?: Record<string, any>): void;

  /**
   * Track form submission event
   */
  export function trackSubmitForm(formData?: Record<string, any>, formName?: string): void;

  /**
   * Track Lead standard event
   */
  export function trackLead(eventOptions?: Record<string, any>): void;

  /**
   * Track ViewContent standard event
   */
  export function trackViewContent(contentData: {
    content_ids: string | string[];
    content_type: string;
    value?: number;
    currency?: string;
    [key: string]: any;
  }): void;

  /**
   * Track AddToCart standard event
   */
  export function trackAddToCart(cartData: {
    content_ids: string | string[];
    content_type: string;
    value: number;
    currency: string;
    [key: string]: any;
  }): void;

  /**
   * Track InitiateCheckout standard event
   */
  export function trackInitiateCheckout(checkoutData?: Record<string, any>): void;

  /**
   * Track CompleteRegistration standard event
   */
  export function trackCompleteRegistration(registrationData?: Record<string, any>): void;

  /**
   * Track StartTrial standard event
   */
  export function trackStartTrial(trialData: {
    currency: string;
    value: number;
    predicted_ltv?: string;
    [key: string]: any;
  }): void;

  /**
   * Track only if user has given consent
   */
  export function trackWithConsent<T extends any[]>(
    trackingFunction: (...args: T) => void,
    ...args: T
  ): boolean;

  /**
   * Initialize Facebook Pixel with advanced options
   */
  export function initializeFacebookPixel(
    pixelId: string,
    options?: {
      debug?: boolean;
      consentRequired?: boolean;
      hasConsent?: boolean;
    }
  ): void;

  /**
   * All Facebook Events functions grouped together
   */
  export const FacebookEvents: Record<string, any>;
}