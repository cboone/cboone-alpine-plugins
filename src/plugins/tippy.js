import tippy, { followCursor, hideAll, roundArrow } from "tippy.js";

/**
 * Tippy.js Alpine Plugin
 *
 * Provides Alpine directives for dropdowns, navigation toggles, and tooltips
 * using Tippy.js for positioning and interactivity.
 *
 * Directives:
 *
 * x-dropdown[="options"]
 *   Creates a dropdown menu from the element's x-ref="dropdown" content.
 *   Default placement: bottom-start
 *   Default trigger: click
 *
 *   Usage:
 *     <button x-dropdown>Menu</button>
 *     <template x-ref="dropdown">
 *       <menu>...</menu>
 *     </template>
 *
 *   With options:
 *     <button x-dropdown="{ placement: 'bottom-end' }">Menu</button>
 *
 *   With role modifier:
 *     <button x-dropdown:navigation>Menu</button>
 *
 * x-navbar-toggle
 *   Specialized dropdown for the mobile navigation menu.
 *   Uses x-ref="navbar-menu" for content.
 *   Default placement: bottom-end
 *   Default role: navigation
 *
 *   Usage:
 *     <button x-navbar-toggle>☰</button>
 *     <template x-ref="navbar-menu">...</template>
 *
 * x-tooltip[.followcursor][:placement]="content"
 *   Creates a tooltip with the given content.
 *   Shows on hover with 500ms delay, hides with 250ms delay.
 *
 *   Usage:
 *     <button x-tooltip="'Click to submit'">Submit</button>
 *
 *   With placement:
 *     <button x-tooltip:top="'Click to submit'">Submit</button>
 *
 *   With follow cursor:
 *     <span x-tooltip.followcursor="'More info'">Hover me</span>
 *
 * @param {Alpine} Alpine - The Alpine.js instance
 */

// Export hideAll for use in keyboard shortcuts
export { hideAll };

// Default options for dropdowns
const dropdownOptions = {
  arrow: false,
  interactive: true,
  offset: [0, 0],
  placement: "bottom-start",
  role: "menu",
  trigger: "click",
  zIndex: 10,
};

// Options for navbar menu
const navbarMenuOptions = {
  arrow: false,
  interactive: true,
  offset: [0, 0],
  placement: "bottom-end",
  role: "navigation",
  trigger: "click",
};

// Options for tooltips
const tooltipOptions = {
  appendTo: () => document.body,
  arrow: roundArrow,
  delay: [500, 250],
  interactive: true,
  placement: "auto",
};

/**
 * Creates a Tippy dropdown instance
 */
function createDropdown(element, dropdownContent, cleanup, options = {}) {
  const dropdown = tippy(element, {
    allowHTML: true,
    content: dropdownContent,
    ...options,
  });
  cleanup(() => dropdown.destroy());
}

/**
 * Gets dropdown content from x-ref within the closest x-data component
 */
function getDropdownContent(element, selector) {
  const component = element.closest("[x-data]");
  const dropdownContent = component.querySelector(`[x-ref="${selector}"]`);
  return dropdownContent.innerHTML;
}

export default function tippyPlugin(Alpine) {
  // x-dropdown directive
  Alpine.directive("dropdown", (element, { expression, value }, { cleanup, evaluate }) => {
    const options = {
      ...dropdownOptions,
      ...(value ? { role: value } : {}),
      ...(expression ? evaluate(expression) : {}),
    };
    createDropdown(element, getDropdownContent(element, "dropdown"), cleanup, options);
  });

  // x-navbar-toggle directive
  Alpine.directive("navbar-toggle", (element, {}, { cleanup }) =>
    createDropdown(element, getDropdownContent(element, "navbar-menu"), cleanup, navbarMenuOptions),
  );

  // x-tooltip directive
  Alpine.directive("tooltip", (element, { expression, modifiers, value }, { cleanup }) =>
    createDropdown(element, expression, cleanup, {
      ...tooltipOptions,
      ...(modifiers && modifiers.includes("followcursor")
        ? {
            followCursor: "initial",
            plugins: [followCursor],
          }
        : {}),
      ...(value ? { placement: value } : {}),
    }),
  );
}
