import { NhostClient } from "@nhost/react";

const NHOST_SUBDOMAIN = "vypqguygkfyvryjcvult"
const NHOST_REGION = "eu-central-1"

//SETUP OF NHOST CLIENT 
const nhost = new NhostClient({
  subdomain: NHOST_SUBDOMAIN,
  region: NHOST_REGION,
})

export default nhost;