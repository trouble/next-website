import { AddressType } from "@components/Address";

export const generateDirectionsHref = (props?: AddressType) => {
  if (props) {
    const {
      line1,
      line2,
      city,
      state,
      zip
    } = props;

    return `https://www.google.com/maps/dir/''/${line1} ${line2} ${city} ${state} ${zip}`;
  }

  return ''
}
