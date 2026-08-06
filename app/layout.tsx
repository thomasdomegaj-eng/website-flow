import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
const siteUrl=process.env.NEXT_PUBLIC_SITE_URL??"https://example.com";
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:"FLOWCOAT | Industrial Finishes",template:"%s | FLOWCOAT"},description:"Commercial powder coating for metal parts, fabrications, architectural metalwork and production batches across Sydney.",openGraph:{title:"FLOWCOAT | Industrial Finishes",description:"Professional powder coating for metal parts across Sydney.",url:siteUrl,siteName:"FLOWCOAT",type:"website"}};
export default function RootLayout({children}:{children:React.ReactNode}){const schema={"@context":"https://schema.org","@type":"LocalBusiness",name:"FLOWCOAT",description:"Commercial powder coating for metal parts, fabrications and production batches.",areaServed:{"@type":"City",name:"Sydney"},url:siteUrl};return <html lang="en-AU"><body><a href="#main" className="fixed left-3 top-3 z-50 -translate-y-24 bg-white p-3 font-bold focus:translate-y-0">Skip to content</a><SiteHeader/>{children}<SiteFooter/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/></body></html>}
