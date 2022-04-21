import { Hyperlink } from "@components/Hyperlink";
import { generateDirectionsHref } from "@root/utilities/generateDirectionsHref";
import { Fragment } from "react";

export type AddressType = {
  line1?: string
  line2?: string
  city?: string
  state?: string
  zip?: string
}

export const Address: React.FC<AddressType> = (props) => {
  const {
    line1,
    line2,
    city,
    state,
    zip,
  } = props;

  const directions = generateDirectionsHref({
    line1,
    line2,
    city,
    state,
    zip
  });

  return (
    <Hyperlink
      display="block"
      href={directions}
      dimOnHover
    >
      {line1 && (
        <Fragment>
          <span>
            {line1}
          </span>
          <br />
        </Fragment>
      )}
      {line2 && (
        <Fragment>
          <span>
            {line2}
          </span>
          <br />
        </Fragment>
      )}
      <span>
        {city && (
          <span>
            {`${city}, `}
          </span>
        )}
        {state && (
          <span>
            {state}
          </span>
        )}
        {zip && (
          <span>
            {` ${zip}`}
          </span>
        )}
      </span>
    </Hyperlink>
  )
}
