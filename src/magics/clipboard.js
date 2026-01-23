/**
 * Clipboard Magic Property
 *
 * Provides a simple wrapper around the Clipboard API for copying text.
 *
 * Usage:
 *   <button @click="$copyToClipboard('text to copy')">Copy</button>
 *
 * @param {Alpine} Alpine - The Alpine.js instance
 */
export default function clipboard(Alpine) {
  Alpine.magic("copyToClipboard", () => (text) => navigator.clipboard.writeText(text));
}
