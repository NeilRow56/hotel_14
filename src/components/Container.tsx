const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto w-full max-w-[1920px] py-4 xl:px-20">
      {children}
    </div>
  )
}

export default Container
