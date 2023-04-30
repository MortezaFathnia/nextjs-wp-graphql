import { ButtonLink } from "components/ButtonLink"

export const CallToActionButton=({buttonLabel,destination,align='left'})=>{
  const alignMap={
    left:'text-left',
    center:'text-center',
    right:'text-right'
  }
  return(
    <div className={alignMap[align]}>
      <ButtonLink destination={destination} label={buttonLabel}/>
    </div>
  )
}