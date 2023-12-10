"use client"
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const DashLayout = (props: any) => {
    const { children, }: { children: React.ReactNode } = props;
    const { data: session }: any = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session?.user?.role !== "user") {
            router.push("/login");
            return;
        }
    }, [session, router])
    if (session)
        return (<div className='dashboard'>{children}</div>)
}
export default DashLayout;
