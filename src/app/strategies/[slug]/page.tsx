import { notFound } from "next/navigation";
import { publicStrategies } from "@/lib/public-content";
import { MarketingPage } from "@/components/marketing-site";
export function generateStaticParams(){return publicStrategies.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const s=publicStrategies.find(s=>s.slug===slug);return {title:s?`Quant × ${s.name} — The Quant Club`:"Strategy not found",description:s?.description};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!publicStrategies.some(s=>s.slug===slug))notFound();return <MarketingPage page="strategy" slug={slug}/>;}
