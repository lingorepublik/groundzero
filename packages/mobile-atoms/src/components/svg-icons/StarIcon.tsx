type Props = {
  fillColor?: string;
  strokeColor?: string;
};

export default function StarIcon({
  fillColor = "#ffe291",
  strokeColor = "#ffcf4b",
}: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.2016 9.13502L14.2548 9.49458L22.0501 10.8087L15.2965 14.1663L14.9712 14.3274L15.0245 14.6869L16.1298 22.1473L10.85 16.7621L10.5957 16.5024L10.2703 16.6644L3.51581 20.0209L7.00676 13.3354L7.17497 13.0131L6.9205 12.7543L1.64082 7.36818L9.43611 8.68227L9.60432 8.36004L13.0956 1.67254L14.2016 9.13502Z"
        fill={fillColor}
        stroke={strokeColor}
      />
    </svg>
  );
}
