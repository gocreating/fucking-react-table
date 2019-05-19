import { addParameters, addDecorator, configure } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { withInfo } from '@storybook/addon-info'
import { ContentBefore, ContentAfter } from '../src/stories/index'
import DemoTable from '../src/stories/DemoTable'

addDecorator(withKnobs)
addDecorator(withA11y)
addDecorator(withInfo({
  inline: false,
  header: false,
  source: false,
  propTablesExclude: [DemoTable, ContentBefore, ContentAfter],
}))
addParameters({
  options: {
    /**
     * name to display in the top left corner
     * @type {String}
     */
    // name: 'React Virtual Table',
    /**
     * URL for name in top left corner to link to
     * @type {String}
     */
    // url: '#',
    theme: {
      brandTitle: 'React Virtual Table',
      brandUrl: '#',
    },
    /**
     * show story component as full screen
     * @type {Boolean}
     */
    // goFullScreen: false,
    isFullscreen: false,
    /**
     * display panel that shows a list of stories
     * @type {Boolean}
     */
    // showStoriesPanel: true,
    showNav: true,
    /**
     * display panel that shows addon configurations
     * @type {Boolean}
     */
    // showAddonPanel: true,
    showPanel: true,
    /**
     * display floating search box to search through stories
     * @type {Boolean}
     */
    showSearchBox: true,
    /**
     * show addon panel as a vertical panel on the right
     * @type {Boolean}
     */
    // addonPanelInRight: true,
    panelPosition: 'right',
    /**
     * sorts stories
     * @type {Boolean}
     */
    sortStoriesByKind: false,
    /**
     * regex for finding the hierarchy separator
     * @example:
     *   null - turn off hierarchy
     *   /\// - split by `/`
     *   /\./ - split by `.`
     *   /\/|\./ - split by `/` or `.`
     * @type {Regex}
     */
    hierarchySeparator: /\//,
    /**
     * regex for finding the hierarchy root separator
     * @example:
     *   null - turn off multiple hierarchy roots
     *   /\|/ - split by `|`
     * @type {Regex}
     */
    hierarchyRootSeparator: /\|/,
    /**
     * sidebar tree animations
     * @type {Boolean}
     */
    sidebarAnimations: true,
    /**
     * id to select an addon panel
     * @type {String}
     */
    selectedPanel: undefined, // The order of addons in the "Addon panel" is the same as you import them in 'addons.js'. The first panel will be opened by default as you run Storybook
    /**
     * enable/disable shortcuts
     * @type {Boolean}
     */
    enableShortcuts: false, // true by default
    /**
     * show/hide tool bar
     * @type {Boolean}
     */
    isToolshown: true, // true by default
  },
})

function loadStories() {
  require('../src/stories/index.js')
  // You can require as many stories as you need.
}

configure(loadStories, module);
