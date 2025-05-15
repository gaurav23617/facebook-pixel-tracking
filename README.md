# React Facebook Pixel Tracker

A comprehensive React library for Facebook Pixel tracking with built-in consent management.

## Features

- 🚀 Simple integration with React applications
- 🔒 Built-in consent management for GDPR compliance
- 📊 Support for standard and custom events
- 🔄 Automatic script loading
- 🧩 TypeScript support
- 📝 Detailed documentation

## Installation

```bash
npm install react-fb-pixel-tracker
# or
yarn add react-fb-pixel-tracker
```

## Usage

### Basic Usage

```jsx
import React from 'react';
import useFacebookPixel from 'react-fb-pixel-tracker';

function App() {
  // Initialize Facebook Pixel
  const fbPixel = useFacebookPixel({
    pixelId: 'YOUR_PIXEL_ID',
    debug: process.env.NODE_ENV === 'development'
  });

  // Track page view on component mount
  React.useEffect(() => {
    fbPixel.pageView();
  }, [fbPixel]);

  const handleButtonClick = () => {
    // Track custom event
    fbPixel.trackCustom('ButtonClick', { buttonName: 'Get Started' });
  };

  return (
    <div>
      <h1>Welcome to my app!</h1>
      <button onClick={handleButtonClick}>Get Started</button>
    </div>
  );
}

export default App;
```

### With Consent Management

```jsx
import React, { useState } from 'react';
import useFacebookPixel from 'react-fb-pixel-tracker';

function App() {
  const [hasConsent, setHasConsent] = useState(false);

  // Initialize Facebook Pixel with consent required
  const fbPixel = useFacebookPixel({
    pixelId: 'YOUR_PIXEL_ID',
    consentRequired: true,
    hasInitialConsent: hasConsent
  });

  const handleAcceptCookies = () => {
    setHasConsent(true);
    fbPixel.setConsent(true);
    
    // Now we can track events
    fbPixel.pageView();
  };

  const handleDeclineCookies = () => {
    setHasConsent(false);
    fbPixel.setConsent(false);
  };

  return (
    <div>
      <h1>Welcome to my app!</h1>
      
      {/* Cookie consent banner */}
      <div className="cookie-banner">
        <p>We use cookies to improve your experience.</p>
        <button onClick={handleAcceptCookies}>Accept</button>
        <button onClick={handleDeclineCookies}>Decline</button>
      </div>
      
      {/* Rest of your app */}
    </div>
  );
}

export default App;
```

### Global Setup

For Next.js or other frameworks, you can set up the pixel globally:

```jsx
// In _app.js (Next.js)
import useFacebookPixel from 'react-fb-pixel-tracker';

function MyApp({ Component, pageProps }) {
  // Initialize Facebook Pixel
  const fbPixel = useFacebookPixel({
    pixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID
  });

  // Track page views on route changes
  useEffect(() => {
    const handleRouteChange = () => {
      fbPixel.pageView();
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [fbPixel, router.events]);

  return <Component {...pageProps} />;
}
```

## API Reference

### `useFacebookPixel(options)`

React hook that initializes Facebook Pixel and returns tracking methods.

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `pixelId` | `string` | - | Your Facebook Pixel ID (required) |
| `debug` | `boolean` | `false` | Enable debug mode |
| `consentRequired` | `boolean` | `true` | Whether consent is required before tracking |
| `hasInitialConsent` | `boolean` | `false` | Initial consent status |
| `autoInit` | `boolean` | `true` | Automatically initialize the pixel |

#### Returns

An object with the following methods:

| Method | Description |
|--------|-------------|
| `pageView()` | Track page view event |
| `track(eventName, eventOptions)` | Track standard Facebook events |
| `trackCustom(eventName, eventOptions)` | Track custom events |
| `trackWithConsent(trackingFunction, ...args)` | Track only if consent is given |
| `setConsent(hasConsent)` | Update consent status |
| `trackLead(eventOptions)` | Track Lead event |
| `trackViewContent(contentData)` | Track ViewContent event |
| `trackAddToCart(cartData)` | Track AddToCart event |
| `trackInitiateCheckout(checkoutData)` | Track InitiateCheckout event |
| `trackCompleteRegistration(registrationData)` | Track CompleteRegistration event |
| `trackStartTrial(trialData)` | Track StartTrial event |
| `trackSubmitForm(formData, formName)` | Track form submission event |
| `enableDebugMode(enable)` | Enable/disable debug mode |
| `setConsentRequirement(required)` | Set whether consent is required |

### Direct Imports

You can also import individual functions:

```jsx
import { 
  trackPageView, 
  trackEvent, 
  initializeFacebookPixel 
} from 'react-fb-pixel-tracker';

// Initialize without the hook
initializeFacebookPixel('YOUR_PIXEL_ID', { debug: true });

// Track events directly
trackPageView();
trackEvent('Purchase', { value: 10.00, currency: 'USD' });
```

# Facebook Pixel Tracking Package Structure

```
react-fb-pixel-tracker/
├── src/
│   ├── hooks/
│   │   └── useFacebookPixel.js
│   ├── lib/
│   │   └── facebookEvents.js
│   └── index.js
├── package.json
├── README.md
├── LICENSE
├── .gitignore
├── .npmignore
└── rollup.config.js
```

## License

MIT
