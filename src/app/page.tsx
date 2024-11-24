import PageClient from "./pageClient";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className={`text-5xl font-bold transition-all mb-8`}>
        Population Display
      </h1>
      <PageClient />
      <p className="text-gray-300 mt-8">Made by Marek Kramár for Elanco</p>
    </div>
  );
}
