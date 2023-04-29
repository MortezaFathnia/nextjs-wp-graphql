import Link from "next/link"

export const ButtonLink = ({destination,label}) => {
  return (
    <Link href={destination}>
      <span className='btn'>
        {label}
      </span>
    </Link>
  )
}