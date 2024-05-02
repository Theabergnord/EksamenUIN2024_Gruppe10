import {createClient} from '@sanity/client'

export const client = createClient({
  //Hvis du har hentet dette prosjektet fra GitHub, må du endre
  //projectId til din egen prosjektid fra sanity.io/manage
  projectId: "azakqh08",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-05-02"
})

export const writeClient = createClient({
  projectId: "azakqh08",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-05-02",
  token: "skz64LV5OvzharZMPgX9k0uWBLpTKHGXfyRHFZ3Qm5eW7aw7CfDkH1tKxRIQ2rcNqAi16JWsi3zN9riwHh3cHIlMUMgqRDMWNCCYkHA0rWH0rG3qU6BROqx1vYit1zDs00WUPjP7MWCOVjiwOYMMTinwrxfHGT4VtmDxY8vGOU26b2lKlxJC"
})

