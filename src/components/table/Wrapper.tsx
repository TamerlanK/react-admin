interface WrapperProps {
  children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <section className="w-full h-full p-4 pl-0 pr-8">
      <div className="bg-white h-full rounded-lg shadow-sm p-8">{children}</div>
    </section>
  )
}

export default Wrapper
