
export const Columns = ({ children, isStackedOnMobile }) => {
  return (
    <div className="my-10">
      <div className={`max-w-5xl mx-auto ${isStackedOnMobile ? 'block md:flex' : 'flex'}`}>
        {children}
      </div>
    </div>
  )
}