export function HeroLetteringDefinitions() {
  return <svg className="sr-only" aria-hidden="true">
    <defs>
      <path id="hero-letter-o" d="M381 138C408 138 422 159 418 187C414 218 396 244 369 244C343 244 328 225 332 196C336 166 354 138 381 138ZM382 143C364 143 351 190 353 218C354 231 360 239 369 239C387 239 399 193 397 165C396 152 391 143 382 143Z" />
      <g id="hero-wordmark" fillRule="evenodd">
        <path id="hero-letter-p" d="M255 141H298C319 141 333 152 333 169C333 188 316 202 293 202H281C279 216 280 231 283 242H255C262 216 263 171 255 141ZM282 148C279 162 279 182 280 196H290C303 196 313 186 313 171C313 157 304 147 293 147C288 147 285 148 282 148Z" />
        <use href="#hero-letter-o" />
        <path id="hero-letter-r" d="M425 141H469C491 141 501 151 501 167C501 182 491 192 477 196C485 211 492 226 503 242H474C471 225 466 210 459 199H451C449 214 450 231 453 242H425C431 213 432 172 425 141ZM451 148C449 160 449 181 450 193H461C474 193 482 184 482 169C482 156 474 147 463 147C458 147 454 147 451 148Z" />
        <path id="hero-letter-t" d="M505 141H583L577 171C574 157 568 148 555 147C551 174 551 214 556 242H528C533 214 533 172 530 147C517 148 510 156 505 171Z" />
        <path id="hero-letter-f" d="M586 141H658L650 172C644 155 632 147 614 147C610 157 610 175 611 187C625 187 634 181 642 171V207C633 197 625 192 611 192C610 209 611 229 615 242H586C592 216 594 172 586 141Z" />
        <use href="#hero-letter-o" transform="translate(329)" />
        <path id="hero-letter-l" d="M753 141H782C777 168 776 209 781 236C798 234 807 221 817 205L812 242H753C759 212 760 172 753 141Z" />
        <path id="hero-letter-i" d="M820 141H849C842 171 842 213 849 242H820C826 213 827 171 820 141Z" />
        <use href="#hero-letter-o" transform="translate(522)" />
      </g>
    </defs>
  </svg>;
}

export function HeroLettering({ outline = false }) {
  if (outline) {
    return <>
      <svg className="hero-lettering hero-ghost" aria-hidden="true" viewBox="0 0 1200 775">
        <use href="#hero-wordmark" transform="translate(0 125)" />
        <use href="#hero-wordmark" transform="translate(0 250)" />
        <use href="#hero-wordmark" transform="translate(0 375)" />
      </svg>
      <div className="mobile-hero-ghost hero-ghost" aria-hidden="true">
        {Array.from({ length: 6 }, (_, row) => (
          <svg key={row} viewBox="254 137 688 108" preserveAspectRatio="none"><use href="#hero-wordmark" /></svg>
        ))}
      </div>
    </>;
  }

  return <>
    <svg className="hero-lettering hero-title-art" aria-hidden="true" viewBox="0 0 1200 775">
      <use href="#hero-wordmark" />
    </svg>
    <svg className="mobile-hero-title hero-title-art" aria-hidden="true" viewBox="254 137 688 108">
      <use href="#hero-wordmark" />
    </svg>
  </>;
}
