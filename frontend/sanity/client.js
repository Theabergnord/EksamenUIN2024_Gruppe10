import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: "azakqh08",
    dataset: "production",
    useCdn: true,
    apiVersion: "2024-05-07"
  })

  export const writeClient = createClient({
    projectId: "azakqh08",
    dataset: "production",
    useCdn: true,
    apiVersion: "2024-05-02",
    token: "skfcpn7SqPLSodN04ehhmj1sONjordE02VDMM2nY2zCAtA73vZqDrgzxARNnKefDvCtRo4q3v9qhsoMenguD2XqqASsxSXnwAz91Y0pQUcBYLYju4e3b4JVTSACUx2lgaNsYdkQCyxifJi9TgVfogw3SyxZAjx2R2xcH4DQk153BkRdSJBul"
  })