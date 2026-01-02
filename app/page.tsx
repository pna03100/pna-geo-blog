export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">
        Headless WordPress + Next.js 14
      </h1>
      <p className="text-xl text-gray-600">
        Core Web Vitals 최적화 블로그
      </p>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Dynamic routes는 /[...slug] 경로에서 처리됩니다.
        </p>
      </div>
    </main>
  )
}

