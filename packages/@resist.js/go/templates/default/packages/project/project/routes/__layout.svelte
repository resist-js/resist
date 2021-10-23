<script lang="ts" context="module">
  /**
   * @type {import('@resistjs/svelte-kit').Load}
   */
  export async function load({ page, session }) {
    return {
      props: {
        path: page.path,
        session,
      },
    }
  }
</script>

<script lang="ts">
  // Start: Local Imports
  // End: Local Imports

  // Start: External Imports
  import '../styles/tailwind.postcss'

  // End: External Imports

  // Start: Local component properties
  export const path = ''
  export let session: any

  // End: Local component properties

  // Start: Local component methods

  const toggleThemeMode = (event: CustomEvent<{ dark: boolean }>): void => {
    const htmlTag = document.getElementsByTagName('html').item(0)
    htmlTag.className = event.detail.dark ? 'dark' : 'light'
  }

  // End: Local component methods
</script>

<div class="bg-white dark:bg-black">
  <main id="skip" class="flex flex-col justify-center px-8 bg-white dark:bg-black">

  </main>
  <p>
    ({session?.request_uuid}) <br />{JSON.stringify(session ?? {})}
  </p>
</div>
