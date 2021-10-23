<script lang="ts" context="module">
  export function load({ error, status, session }): {
    props: {
      title: string
      status: any
      error: any
      session: any
    }
  } {
    return {
      props: {
        title: `${status}: ${error.message}`,
        status,
        error,
        session,
      },
    }
  }
</script>

<script lang="ts">
  // Start: Svelte Imports
  import { dev } from '$app/env'
  // End: Svelte Imports

  // Start: Local Imports

  // End: Local Imports

  // Start: Exported Properties
  export let status: string
  export let error: Error
  export let session: any
  // End: Exported Properties
</script>

<!-- Start: Error View Layout -->
<div class="md:container md:mx-auto">
  <div class="flex flex-col justify-center items-center">
    <!-- Start: Error Status Code -->
    <h1>
      {status}
    </h1>
    <!-- End: Error Status Code -->
    <p>
      {error.name} - {error.message} - ({session.request_uuid}) <br />{JSON.stringify(session)}
    </p>
    <!-- Start: Error Message container -->
    {#if dev && error.stack}
      <pre> {error.message} </pre>
    {/if}
    <!-- End: Error Message container -->
  </div>
</div>

<!-- End: Error View Layout -->
<style lang="scss" type="text/scss">
  h1 {
    font-size: 2.8em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }
  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>
