# @cboone/alpine-plugins

Custom Alpine.js plugins and magic properties.

## Installation

```bash
npm install @cboone/alpine-plugins tippy.js lightgallery
```

**Note:** This package is published to GitHub Packages. Configure your `.npmrc`:

```
@cboone:registry=https://npm.pkg.github.com
```

## Usage

### Register All Plugins

```javascript
import Alpine from "alpinejs";
import { registerPlugins } from "@cboone/alpine-plugins";

registerPlugins(Alpine);
Alpine.start();
```

### Without LightGallery

If you don't need the gallery plugin:

```javascript
import Alpine from "alpinejs";
import { registerPlugins } from "@cboone/alpine-plugins";

registerPlugins(Alpine, { lightgallery: false });
Alpine.start();
```

### Individual Plugins

```javascript
import Alpine from "alpinejs";
import { tippyPlugin } from "@cboone/alpine-plugins";

Alpine.plugin(tippyPlugin);
Alpine.start();
```

### Individual Magics

```javascript
import Alpine from "alpinejs";
import clipboard from "@cboone/alpine-plugins/magics/clipboard";

Alpine.plugin(clipboard);
Alpine.start();
```

## Plugins

### Tippy Plugin

Dropdown menus, navigation toggles, and tooltips using Tippy.js.

#### x-dropdown

Creates a dropdown menu from a template.

```html
<div x-data>
  <button x-dropdown>Menu</button>
  <template x-ref="dropdown">
    <menu>
      <li><a href="#">Item 1</a></li>
      <li><a href="#">Item 2</a></li>
    </menu>
  </template>
</div>
```

With options:

```html
<button x-dropdown="{ placement: 'bottom-end' }">Menu</button>
```

With role modifier:

```html
<button x-dropdown:navigation>Menu</button>
```

#### x-navbar-toggle

Specialized dropdown for mobile navigation.

```html
<div x-data>
  <button x-navbar-toggle>☰</button>
  <template x-ref="navbar-menu">
    <nav>...</nav>
  </template>
</div>
```

#### x-tooltip

Tooltips with optional placement and follow cursor.

```html
<button x-tooltip="'Click to submit'">Submit</button>

<button x-tooltip:top="'Tooltip on top'">Hover</button>

<span x-tooltip.followcursor="'Follows cursor'">Hover me</span>
```

#### hideAll

Export for programmatically hiding all Tippy instances:

```javascript
import { hideAll } from "@cboone/alpine-plugins";

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideAll();
  }
});
```

### LightGallery Plugin

Photo/video lightbox galleries.

#### x-gallery

Creates a gallery from child elements with `.gallery-image` class.

```html
<div x-data="{ galleryOpen: false }" x-gallery>
  <a class="gallery-image" href="/photos/large-1.jpg">
    <img src="/photos/thumb-1.jpg" alt="Photo 1" />
  </a>
  <a class="gallery-image" href="/photos/large-2.jpg">
    <img src="/photos/thumb-2.jpg" alt="Photo 2" />
  </a>
</div>
```

The `galleryOpen` state tracks whether the gallery is open:

```html
<body :inert="galleryOpen" :aria-hidden="galleryOpen">
```

## Magic Properties

### $copyToClipboard

Copy text to clipboard.

```html
<button @click="$copyToClipboard('Text to copy')">
  Copy
</button>
```

### $removePlaceholders

Remove all elements with `x-ref="placeholder"`.

```html
<div x-init="$removePlaceholders()">
  <div x-ref="placeholder">Loading...</div>
  <div>Real content</div>
</div>
```

### $scrollToTop

Scroll to top and update URL to remove hash.

```html
<button @click="$scrollToTop()">Back to top</button>
```

## Peer Dependencies

- `alpinejs` ^3.0.0 (required)
- `tippy.js` ^6.0.0 (required)
- `lightgallery` ^2.0.0 (optional)

## License

MIT
