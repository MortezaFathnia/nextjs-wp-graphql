import { faBathtub, faBed, faCar, faDog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import numeral from "numeral"

export const PropertyCard = ({
  title,
  destination,
  image,
  bedrooms,
  bathrooms,
  price,
  hasParking,
  petFriendly
}) => {
  return (
    <Link className="border-2 p-5 border-slate-300 bg-slate-100 hover:bg-slate-200" href={destination}>
      <div className="flex w-full" style={{ height: '200px', position: 'relative' }}>
        <Image src={image} fill="object-cover" alt={title} />
      </div>
      <div className="mt-3 text-lg font-bold">
        {title}
      </div>
      <div className="text-lg">
        ${numeral(price).format('0,0')}
      </div>
      <div className="flex justify-between text-sm mt-3">
        <div>
          <FontAwesomeIcon icon={faBathtub} />
          <span className="pl-2">{bathrooms} bathrooms</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faBed} />
          <span className="pl-2">{bedrooms} bedrooms</span>
        </div>
      </div>
      {(!!hasParking || !!bedrooms) && (
        <div className="flex justify-between text-sm mt-3">
          <div>
            {!!hasParking && (
              <>
                <FontAwesomeIcon icon={faCar} /> parking available
              </>
            )}
          </div>
          <div>
            {!!petFriendly && (
              <>
                <FontAwesomeIcon icon={faDog} /> pet friendly
              </>
            )}
          </div>
        </div>
      )}
    </Link>
  )
}