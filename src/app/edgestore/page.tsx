'use client'

import { SingleImageDropzone } from '@/components/hotel/SingleImageDropzone'
import { useEdgeStore } from '@/lib/edgestore'
import { useState } from 'react'

export default function SingleImageDropzoneUsage() {
  const [file, setFile] = useState<File>()
  const [progress, setProgress] = useState(0)
  const [imageUrl, setImageUrl] = useState('')

  const { edgestore } = useEdgeStore()

  return (
    <div className=" h-screen bg-slate-50 pt-24">
      <section className="mx-auto my-8 w-full max-w-4xl rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:p-8">
        <div className=" flex flex-col">
          <h2 className="mb-2 text-xl font-bold">Single Image Upload</h2>
          <div className="mx-auto">
            <SingleImageDropzone
              width={200}
              height={200}
              value={file}
              onChange={(file) => {
                setFile(file)
              }}
            />
            {progress < 100 && (
              <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100"
                  style={{ width: '85' }}
                >
                  {' '}
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <button
                className="mt-1 rounded-lg bg-blue-500 px-2 py-1 text-gray-50"
                onClick={async () => {
                  if (file) {
                    const res = await edgestore.publicFiles.upload({
                      file,
                      onProgressChange: (progress) => {
                        console.log(progress)
                        setProgress(progress)
                      },
                    })
                    // you can run some server action or api here
                    // to add the necessary data to your database
                    console.log(res)
                    setImageUrl(res?.url)
                  }
                }}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
