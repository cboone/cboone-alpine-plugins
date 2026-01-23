import lightGallery from "lightgallery";
import lgVideo from "lightgallery/plugins/video";

/**
 * LightGallery Alpine Plugin
 *
 * Provides an Alpine directive for creating photo/video galleries
 * using LightGallery.
 *
 * x-gallery
 *   Creates a lightbox gallery from the element's .gallery-image children.
 *   Automatically manages a `galleryOpen` state variable in the closest
 *   x-data component to track when the gallery is open.
 *
 *   Features:
 *   - Zoom from origin animation
 *   - Video support via lgVideo plugin
 *   - Custom styling classes for backdrop blur and shadows
 *   - Automatic cleanup on component destruction
 *
 *   Usage:
 *     <div x-data="{ galleryOpen: false }" x-gallery>
 *       <a class="gallery-image" href="/photos/large.jpg">
 *         <img src="/photos/thumb.jpg" alt="Photo">
 *       </a>
 *     </div>
 *
 *   The galleryOpen state can be used to control other elements:
 *     <body :inert="galleryOpen" :aria-hidden="galleryOpen">
 *
 * @param {Alpine} Alpine - The Alpine.js instance
 */

// Gallery configuration
const galleryOptions = {
  addClass:
    ">div:first:bg-donkey-900/50 >div:first:backdrop-blur-2xl ~>img:shadow-even-sm ~>img:shadow-donkey-900 ~>iframe:shadow-even-sm ~>iframe:shadow-donkey-900",
  actualSize: false,
  allowMediaOverlap: true,
  counter: false,
  download: false,
  getCaptionFromTitleOrAlt: false,
  gotoNextSlideOnVideoEnd: false,
  hideBarsDelay: 1000,
  licenseKey: "51DE8DB6-B7B6-4BC6-B9FE-DDC87180836E",
  plugins: [lgVideo],
  selector: ".gallery-image",
  subHtmlSelectorRelative: true,
  supportLegacyBrowser: false,
  zoomFromOrigin: true,
};

export default function lightgalleryPlugin(Alpine) {
  Alpine.directive("gallery", (element, {}, { cleanup, evaluate }) => {
    const gallery = lightGallery(element, galleryOptions);

    // Set galleryOpen state when gallery opens
    element.addEventListener("lgAfterOpen", () => {
      evaluate("galleryOpen = true");
    });

    // Handle iframe background color for video embeds
    element.addEventListener("lgAfterAppendSlide", () => {
      const iframe = document.querySelector("iframe");
      if (iframe && iframe.contentDocument) {
        iframe.contentDocument.body.style.backgroundColor = "black";
      }
    });

    // Reset galleryOpen state when gallery closes
    element.addEventListener("lgAfterClose", () => {
      evaluate("galleryOpen = false");
    });

    // Clean up gallery instance on component destruction
    cleanup(() => {
      gallery.destroy();
    });
  });
}
