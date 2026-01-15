import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "a2ui-renderer",
  description: "The protocol to stream UI from LLMs to your React app.",
  base: "/a2ui-renderer/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Demo', link: '/demo/', target: '_blank' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Core Concepts', link: '/guide/concepts' }
        ]
      },
      {
        text: 'Tools',
        items: [
          { text: 'Scanner', link: '/guide/scanner' }
        ]
      },
      {
        text: 'Packages',
        items: [
          { text: '@a2ui-renderer/react', link: '/packages/react' },
          { text: '@a2ui-renderer/stdlib', link: '/packages/stdlib' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/io-q/a2ui-renderer' }
    ]
  }
})
