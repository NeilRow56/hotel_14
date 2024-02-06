import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h4>Hotel App</h4>
      <div className=" flex w-full space-x-8">
        <Link href="/upload-button">UploadBtn</Link>
        <Link href="/upload-dnd">UploadDND</Link>
        <Link href="/">Home</Link>
      </div>
    </main>
  )
}
