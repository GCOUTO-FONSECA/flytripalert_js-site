export default async function Home(
    {searchParams}:{searchParams: Promise<Record<string, string | string[] | undefined>>}) 
    {
        const sp = await searchParams;
        const raw = Number(sp?.page ?? 1);
        return (<div>Learning Page</div>)
    }
