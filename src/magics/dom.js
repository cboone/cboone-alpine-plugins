/**
 * DOM Magic Properties
 *
 * Utility magic properties for common DOM operations.
 *
 * $removePlaceholders()
 *   Removes all elements with x-ref="placeholder" from the DOM.
 *   Useful for cleaning up loading states or skeleton screens.
 *
 *   Usage:
 *     <div x-init="$removePlaceholders()">
 *
 * $scrollToTop()
 *   Scrolls to the top of the page and updates the URL to remove any hash.
 *   Preserves the current pathname and search parameters.
 *
 *   Usage:
 *     <button @click="$scrollToTop()">Back to top</button>
 *
 * @param {Alpine} Alpine - The Alpine.js instance
 */
export default function dom(Alpine) {
  Alpine.magic(
    "removePlaceholders",
    () => () =>
      document.querySelectorAll("[x-ref=placeholder]").forEach((element) => element.remove()),
  );

  Alpine.magic("scrollToTop", () => () => {
    document.getElementsByTagName("body")[0].scrollIntoView();
    history.pushState("", document.title, window.location.pathname + window.location.search);
  });
}
