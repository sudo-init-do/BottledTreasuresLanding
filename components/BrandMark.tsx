/** The Bottled Treasures logo mark (bottle-shaped square Kufic). Inherits text colour. */
export default function BrandMark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 182 257"
      fill="currentColor"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <path fillRule="evenodd" d="M73 0h35v40h-35z M84.0 15.5a6.5 6.5 0 1 0 13.0 0a6.5 6.5 0 1 0 -13.0 0z" />
      <path d="M0 78h19v127h-19zM0 205h115v20h-115zM0 237h182v20h-182zM33 78h19v63h-19zM33 192h19v13h-19zM33 174h82v18h-82zM33 141h149v20h-149zM55 54h70v11h-70zM64 78h53v52h-53zM97 192h18v13h-18zM129 96h19v15h-19zM129 192h19v13h-19zM129 78h53v18h-53zM129 111h53v19h-53zM129 174h53v18h-53zM129 205h53v20h-53zM162 96h20v15h-20zM162 130h20v11h-20zM162 192h20v13h-20zM162 225h20v12h-20z" />
    </svg>
  );
}

export const BRAND_MARK_PATHS = {
  cap: "M73 0h35v40h-35z M84.0 15.5a6.5 6.5 0 1 0 13.0 0a6.5 6.5 0 1 0 -13.0 0z",
  body: "M0 78h19v127h-19zM0 205h115v20h-115zM0 237h182v20h-182zM33 78h19v63h-19zM33 192h19v13h-19zM33 174h82v18h-82zM33 141h149v20h-149zM55 54h70v11h-70zM64 78h53v52h-53zM97 192h18v13h-18zM129 96h19v15h-19zM129 192h19v13h-19zM129 78h53v18h-53zM129 111h53v19h-53zM129 174h53v18h-53zM129 205h53v20h-53zM162 96h20v15h-20zM162 130h20v11h-20zM162 192h20v13h-20zM162 225h20v12h-20z",
};
