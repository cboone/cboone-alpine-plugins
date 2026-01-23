/**
 * @cboone/alpine-ch-plugins
 *
 * Custom Alpine.js plugins and magic properties.
 *
 * Magics:
 *   $copyToClipboard(text) - Copy text to clipboard
 *   $removePlaceholders()  - Remove placeholder elements
 *   $scrollToTop()         - Scroll to top with URL update
 *
 * Directives (from tippy plugin):
 *   x-dropdown     - Dropdown menus via Tippy.js
 *   x-navbar-toggle - Mobile navigation toggle
 *   x-tooltip      - Tooltips via Tippy.js
 *
 * Directives (from lightgallery plugin):
 *   x-gallery      - Photo/video lightbox gallery
 *
 * Usage:
 *   import Alpine from "alpinejs";
 *   import { registerPlugins } from "@cboone/alpine-ch-plugins";
 *   registerPlugins(Alpine);
 *   Alpine.start();
 */

// Magic properties
import clipboard from "./magics/clipboard.js";
import dom from "./magics/dom.js";

// Plugins
import lightgalleryPlugin from "./plugins/lightgallery.js";
import tippyPlugin, { hideAll } from "./plugins/tippy.js";

// Re-export hideAll for use in keyboard shortcuts
export { hideAll };

// Re-export individual plugins and magics
export { clipboard, dom, lightgalleryPlugin, tippyPlugin };

/**
 * Registers all custom plugins and magic properties with Alpine.
 * Call this before Alpine.start().
 *
 * @param {Alpine} Alpine - The Alpine.js instance
 * @param {Object} options - Registration options
 * @param {boolean} options.lightgallery - Whether to include lightgallery plugin (default: true)
 */
export function registerPlugins(Alpine, options = {}) {
  const { lightgallery = true } = options;

  // Register magic properties
  clipboard(Alpine);
  dom(Alpine);

  // Register directives
  tippyPlugin(Alpine);

  if (lightgallery) {
    lightgalleryPlugin(Alpine);
  }
}
