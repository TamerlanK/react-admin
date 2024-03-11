interface HeadTextProps {
  children: React.ReactNode
}

const HeadText = ({ children }: HeadTextProps) => {
  return (
    <h1 className="mb-4 text-2xl font-semibold text-slate-900">{children}</h1>
  )
}

export default HeadText
