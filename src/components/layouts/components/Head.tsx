import { Children } from "@/types";
import Head from 'next/head';

export default function AppHead({ title, favicon, children }:{
  title: string,
  children?: Children["children"],
  favicon?: string
}){
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="MedAI" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href={favicon || "/favicon.ico"} />
      {children}
    </Head>
  )
}