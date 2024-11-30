import Link from "next/link";

const Home = () => {
    return ( 
        <div className="flex min-h-screen items-center justify-center">
            Click&nbsp;
            <Link href="/documents/510" className="text-blue-500 underline">here&nbsp;</Link>
            to go to document Id page
        </div>
     );
}

export default Home;