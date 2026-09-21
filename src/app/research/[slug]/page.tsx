import { notFound } from "next/navigation";
import { articles } from "@/lib/public-content";
import { MarketingPage } from "@/components/marketing-site";
export function generateStaticParams(){return articles.map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const a=articles.find(a=>a.slug===slug);return {title:a?`${a.title} — The Quant Bytes`:"Article not found",description:a?.dek};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!articles.some(a=>a.slug===slug))notFound();return <MarketingPage page="article" slug={slug}/>;}
