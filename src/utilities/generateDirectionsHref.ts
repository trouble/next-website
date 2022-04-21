export type Address = {}; // TODO: type this

export const generateDirectionsHref = (props?: Address) => {
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
