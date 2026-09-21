import { useId } from "react";
import { QuantLogo } from "./logo";

export type BrandScene = "home" | "platform" | "strategies" | "institutions" | "research" | "about" | "walkthrough";

type SceneProps = { id: string };

function SceneGradients({ id }: SceneProps) {
  return <defs>
    <linearGradient id={`${id}-glass`} x1=".15" y1="0" x2=".8" y2="1"><stop stopColor="#6acff1" stopOpacity=".52" /><stop offset=".5" stopColor="#6a99ef" stopOpacity=".23" /><stop offset="1" stopColor="#305acb" stopOpacity=".47" /></linearGradient>
    <linearGradient id={`${id}-glass-edge`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#76e2ed" stopOpacity=".9" /><stop offset="1" stopColor="#3268dc" stopOpacity=".48" /></linearGradient>
    <linearGradient id={`${id}-prism`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#b692f1" stopOpacity=".78" /><stop offset=".5" stopColor="#8563dc" stopOpacity=".45" /><stop offset="1" stopColor="#3c67d5" stopOpacity=".74" /></linearGradient>
    <linearGradient id={`${id}-prism-blue`} x1="0" y1="0" x2=".7" y2="1"><stop stopColor="#7eb5f2" stopOpacity=".78" /><stop offset="1" stopColor="#5541b6" stopOpacity=".67" /></linearGradient>
    <linearGradient id={`${id}-teal`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#aff0d9" stopOpacity=".82" /><stop offset=".65" stopColor="#51c5c0" stopOpacity=".3" /><stop offset="1" stopColor="#258d9f" stopOpacity=".52" /></linearGradient>
    <radialGradient id={`${id}-teal-halo`}><stop stopColor="#69d4c9" stopOpacity=".2" /><stop offset="1" stopColor="#8ae1d7" stopOpacity="0" /></radialGradient>
    <linearGradient id={`${id}-paper-warm`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffdda6" stopOpacity=".8" /><stop offset="1" stopColor="#e49b8a" stopOpacity=".4" /></linearGradient>
    <linearGradient id={`${id}-paper-blue`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d3e6fc" stopOpacity=".9" /><stop offset="1" stopColor="#6a9ce6" stopOpacity=".56" /></linearGradient>
    <linearGradient id={`${id}-ink`} x1="0" y1=".4" x2="1" y2=".6"><stop stopColor="#5a7fdb" stopOpacity=".08" /><stop offset=".55" stopColor="#416bdd" stopOpacity=".65" /><stop offset="1" stopColor="#c28aca" stopOpacity=".37" /></linearGradient>
    <linearGradient id={`${id}-foundation`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#5cc8dd" stopOpacity=".25" /><stop offset="1" stopColor="#617dd1" stopOpacity=".06" /></linearGradient>
    <linearGradient id={`${id}-path`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#487be1" stopOpacity="0" /><stop offset=".3" stopColor="#6997ef" stopOpacity=".5" /><stop offset=".72" stopColor="#26becb" stopOpacity=".82" /><stop offset="1" stopColor="#3684d7" stopOpacity=".16" /></linearGradient>
    <radialGradient id={`${id}-meeting`} cx=".38" cy=".3"><stop stopColor="#edffff" stopOpacity=".95" /><stop offset=".6" stopColor="#8de2ed" stopOpacity=".65" /><stop offset="1" stopColor="#458ddd" stopOpacity=".35" /></radialGradient>
  </defs>;
}

function PlatformArt({ id }: SceneProps) {
  return <g className="pb-platform-geometry">
    <ellipse cx="506" cy="588" rx="320" ry="69" fill="#548ad8" opacity=".045" />
    <g className="pb-platform-links" fill="none" stroke={`url(#${id}-glass-edge)`} strokeWidth="1.2">
      <path d="M232 328V474L512 621L805 463V316" />
      <path d="M392 158V449M659 166V436" strokeDasharray="4 8" opacity=".55" />
      <path d="M173 368L85 413V496L238 579" opacity=".4" />
      <circle cx="238" cy="579" r="5" fill="#9ce5e7" /><circle cx="85" cy="413" r="4" fill="#c1daf5" />
    </g>
    <g transform="translate(0 158)"><g className="pb-motion pb-hover-slow" opacity=".5"><path d="M463 122L835 310L493 493L121 304Z" fill={`url(#${id}-glass)`} stroke="#7ea9e5" /><path d="M121 304V319L493 509L835 326V310L493 493Z" fill="#3b70be" opacity=".18" /><path d="M463 122L493 493M121 304L835 310" fill="none" stroke="#a4c9ef" strokeWidth=".8" opacity=".55" /></g></g>
    <g transform="translate(0 74)"><g className="pb-motion pb-hover-mid" opacity=".8"><path d="M463 122L835 310L493 493L121 304Z" fill={`url(#${id}-glass)`} stroke={`url(#${id}-glass-edge)`} strokeWidth="1.5" /><path d="M121 304V316L493 506L835 323V310L493 493Z" fill="#3268bf" opacity=".17" /><path d="M264 260L494 377L698 266M366 207L598 325" fill="none" stroke="#e4f8ff" strokeWidth="1.2" opacity=".7" /></g></g>
    <g className="pb-motion pb-hover-fast"><path d="M463 122L835 310L493 493L121 304Z" fill={`url(#${id}-glass)`} stroke={`url(#${id}-glass-edge)`} strokeWidth="1.5" /><path d="M121 304V314L493 504L835 321V310L493 493Z" fill="#3268bf" opacity=".21" /><path d="M463 122L835 310L493 493" fill="none" stroke="#dafcff" strokeWidth="2" opacity=".9" /><path d="M292 275L464 188L657 285L483 379Z" fill="#f4fbff" opacity=".18" stroke="#b1e4f8" /><path d="M371 289L469 240L569 289L471 340Z" fill="#70cddd" opacity=".25" stroke="#b2f4f5" /><path d="M270 326L326 354M345 365L402 394" fill="none" stroke="#d1efff" strokeWidth="5" strokeLinecap="round" opacity=".55" /></g>
    <path className="pb-motion pb-trace pb-trace-blue" d="M232 328V474L512 621L805 463V316" fill="none" strokeWidth="2.4" pathLength="1000" strokeDasharray="38 962" />
  </g>;
}

function StrategiesArt({ id }: SceneProps) {
  return <g className="pb-strategies-geometry">
    <ellipse cx="531" cy="612" rx="286" ry="39" fill="#7364c8" opacity=".045" />
    <path d="M165 428C260 638 730 702 891 417" fill="none" stroke="#ae9dd5" strokeWidth=".9" opacity=".25" />
    <g className="pb-motion pb-fan-left">
      <path d="M470 586L146 393L207 286L502 503Z" fill={`url(#${id}-prism-blue)`} stroke="#8f9bdc" strokeOpacity=".7" />
      <path d="M146 393L177 405L231 303L207 286Z" fill="#7c65ca" opacity=".3" />
      <path d="M474 576L233 207L339 154L536 514Z" fill={`url(#${id}-prism)`} stroke="#b89ce8" strokeOpacity=".8" />
      <path d="M233 207L268 220L364 177L339 154Z" fill="#d4baf7" opacity=".4" />
    </g>
    <g className="pb-motion pb-fan-center">
      <path d="M490 573L431 95L552 112L554 533Z" fill={`url(#${id}-prism-blue)`} stroke="#a5b3ee" />
      <path d="M431 95L458 121L575 134L552 112Z" fill="#d3c1f6" opacity=".8" />
      <path d="M552 112L575 134L576 542L554 533Z" fill="#6354c6" opacity=".25" />
      <path d="M460 143L503 493" fill="none" stroke="#e5e1ff" strokeWidth="1.2" opacity=".7" />
    </g>
    <g className="pb-motion pb-fan-right">
      <path d="M515 582L674 128L778 204L579 551Z" fill={`url(#${id}-prism)`} stroke="#beaae8" />
      <path d="M674 128L681 164L775 233L778 204Z" fill="#d3bef6" opacity=".65" />
      <path d="M538 594L846 282L885 407L612 626Z" fill={`url(#${id}-prism-blue)`} stroke="#a69cdd" />
      <path d="M846 282L839 323L875 439L885 407Z" fill="#6968c6" opacity=".2" />
    </g>
    <g className="pb-motion pb-hover-slow"><path d="M456 505L595 439L678 538L533 606Z" fill={`url(#${id}-prism)`} stroke="#bcbcf1" /><path d="M456 505L533 606L531 631L453 530Z" fill="#6d73d3" opacity=".38" /><path d="M533 606L678 538L678 563L531 631Z" fill="#465dbc" opacity=".33" /><path d="M456 505L595 439L678 538" fill="none" stroke="#ddd7ff" strokeWidth="1.6" /></g>
  </g>;
}

const firmPositions = [[282, 205], [748, 221], [293, 503], [752, 509]];

function InstitutionsArt({ id }: SceneProps) {
  const paths = ["M516 350C409 350 388 205 282 205", "M516 350C616 350 638 221 748 221", "M516 350C414 350 398 503 293 503", "M516 350C633 350 630 509 752 509"];
  return <g className="pb-institutions-geometry">
    <ellipse cx="522" cy="355" rx="360" ry="305" fill={`url(#${id}-teal-halo)`} />
    <ellipse cx="518" cy="360" rx="290" ry="239" fill="none" stroke="#7ecdc6" strokeWidth=".8" strokeDasharray="2 8" opacity=".35" />
    {paths.map((path, index) => <g key={path}><path d={path} fill="none" stroke="#78c5c5" strokeWidth="1.7" opacity=".55" /><path className={`pb-motion pb-trace pb-trace-teal pb-delay-${index}`} d={path} fill="none" strokeWidth="3" pathLength="1000" strokeDasharray="70 930" /></g>)}
    <g className="pb-motion pb-network-heart"><circle cx="516" cy="350" r="65" fill={`url(#${id}-teal)`} stroke="#81d4cb" /><circle cx="516" cy="350" r="48" fill="#effffd" fillOpacity=".42" stroke="#9de2d5" /><path d="M497 348L513 331L534 350L518 367Z" fill="#35aead" fillOpacity=".55" stroke="#bff5e7" /><circle cx="516" cy="350" r="87" fill="none" stroke="#8cdad1" opacity=".35" /></g>
    {firmPositions.map(([x, y], index) => <g key={x} transform={`translate(${x} ${y})`}><g className={`pb-motion pb-hub pb-delay-${index}`}>
      <path d="M-61-19L0-51L61-19V29L0 60L-61 29Z" fill="#56afb1" opacity=".11" transform="translate(0 12)" />
      <path d="M-61-19L0-51L61-19V29L0 60L-61 29Z" fill={`url(#${id}-teal)`} stroke="#84cec9" />
      <path d="M-61-19L0 14L61-19M0 14V60" fill="none" stroke="#abddd6" strokeWidth=".9" />
      <path d="M-24-9L0-23L24-9M-22 21H23M-17-5V15M0-13V15M17-5V15" fill="none" stroke="#3b9b9e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".67" />
    </g></g>)}
  </g>;
}

function ResearchArt({ id }: SceneProps) {
  return <g className="pb-research-geometry">
    <ellipse cx="523" cy="563" rx="267" ry="57" fill="#bd9d8b" opacity=".055" />
    <g transform="rotate(-19 410 365)"><g className="pb-motion pb-hover-slow"><path d="M252 167H460L506 211V531H252Z" fill={`url(#${id}-paper-warm)`} stroke="#e7bd9d" /><path d="M460 167V211H506" fill="#fff0da" fillOpacity=".65" stroke="#e7bd9d" /><path d="M284 230H418M284 248H384" stroke="#d99482" strokeWidth="3" strokeLinecap="round" opacity=".45" /><path d="M284 319C343 276 400 385 464 326M284 338C343 295 400 404 464 345" fill="none" stroke="#d39089" strokeWidth="1.1" opacity=".65" /></g></g>
    <g transform="rotate(16 655 341)"><g className="pb-motion pb-hover-mid"><path d="M513 139H725L768 184V509H513Z" fill={`url(#${id}-paper-blue)`} stroke="#abc7ea" /><path d="M725 139V184H768" fill="#f1f7ff" fillOpacity=".72" stroke="#abc7ea" /><path d="M553 227C597 227 632 278 731 246M553 245C597 245 632 296 731 264M553 263C597 263 632 314 731 282" fill="none" stroke="#7aa3da" strokeWidth="1.2" opacity=".6" /></g></g>
    <g transform="rotate(-3 522 363)"><g className="pb-motion pb-editorial-front"><path d="M388 161H607L646 204V555H388Z" fill="#fdf4e8" fillOpacity=".76" stroke="#d9c7b1" /><path d="M607 161V204H646" fill="#eadbcb" fillOpacity=".65" stroke="#d9c7b1" /><rect x="422" y="217" width="48" height="9" rx="4.5" fill="#d1946e" opacity=".55" /><path d="M422 265H579M422 287H550" stroke="#6388c2" strokeWidth="5" strokeLinecap="round" opacity=".25" /><path d="M421 420C470 370 529 456 603 393M421 438C470 388 529 474 603 411M421 456C470 406 529 492 603 429" fill="none" stroke="#b98582" strokeWidth="1.1" opacity=".5" /></g></g>
    <g className="pb-motion pb-ink-wave"><path d="M171 486C294 359 353 494 474 373S696 260 881 359L881 374C696 286 591 268 474 394S294 380 171 505Z" fill={`url(#${id}-ink)`} /><path d="M189 509C307 389 365 522 486 402S706 291 865 382" fill="none" stroke="#c587a8" strokeWidth="1.1" opacity=".6" /><path d="M174 475C294 350 350 480 472 363S691 249 880 348" fill="none" stroke="#92b2e1" strokeWidth="1" opacity=".6" /></g>
  </g>;
}

function AboutArt({ id }: SceneProps) {
  return <g className="pb-about-geometry">
    <g fill="none" stroke="#8eaed2" strokeWidth=".7" opacity=".18">
      {[0, 1, 2, 3, 4, 5].map(index => <path key={index} d={`M${192 + index * 47} ${444 + index * 23}L${591 + index * 43} ${244 + index * 25}`} />)}
      {[0, 1, 2, 3, 4, 5].map(index => <path key={index} d={`M${190 + index * 71} ${444 - index * 36}L${451 + index * 73} ${584 - index * 34}`} />)}
    </g>
    <g className="pb-motion pb-foundation-layer"><path d="M171 442L543 256L847 415L474 614Z" fill={`url(#${id}-foundation)`} stroke="#b6cce5" strokeOpacity=".5" /><path d="M171 442V450L474 622L847 424V415L474 614Z" fill="#6d92c6" opacity=".1" /></g>
    <g transform="translate(0 -22)"><g className="pb-motion pb-hover-mid"><path d="M293 449L361 414L436 454L368 490Z" fill="#7ec7dc" opacity=".26" stroke="#84c9da" /><path d="M433 526L501 489L576 529L508 566Z" fill="#5683cc" opacity=".25" stroke="#769ce0" /><path d="M625 441L693 406L768 446L700 482Z" fill="#5175c5" opacity=".2" stroke="#8caae0" /></g></g>
    <g transform="rotate(-12 532 320)">
      <g className="pb-about-extrusion" fill="none" stroke="#6a97c9" opacity=".11" strokeWidth="19"><path d="M400 385A147 147 0 1 1 643 354" /><path d="M585 379L687 457" /></g>
      <g className="pb-motion pb-about-mark"><svg x="307" y="92" width="436" height="436" viewBox="0 0 128 128"><QuantLogo compact /></svg></g>
    </g>
    <path className="pb-motion pb-foundation-slice" d="M692 217L734 238L718 279L676 256Z" fill="#77bfed" fillOpacity=".34" stroke="#8cbae8" />
    <path d="M289 342L322 359L305 401L272 384Z" fill="#41bac6" fillOpacity=".24" stroke="#8bd1d6" strokeOpacity=".5" />
  </g>;
}

function WalkthroughArt({ id }: SceneProps) {
  const paths = ["M83 104C365 104 320 350 572 350", "M42 259C325 142 401 350 572 350", "M50 430C332 552 366 350 572 350", "M144 628C377 598 344 350 572 350"];
  return <g className="pb-walkthrough-geometry">
    <ellipse cx="572" cy="350" rx="220" ry="233" fill={`url(#${id}-teal-halo)`} />
    {paths.map((path, index) => <g key={path}><path d={path} fill="none" stroke={`url(#${id}-path)`} strokeWidth={index === 1 ? "2.2" : "1.3"} /><path className={`pb-motion pb-trace pb-trace-cyan pb-delay-${index}`} d={path} fill="none" strokeWidth="3" pathLength="1000" strokeDasharray="45 955" /></g>)}
    <path d="M572 350C731 350 742 251 922 277M572 350C731 350 769 438 953 408" fill="none" stroke={`url(#${id}-path)`} strokeWidth="1.3" />
    <path className="pb-motion pb-trace pb-trace-blue" d="M572 350C731 350 742 251 922 277" fill="none" strokeWidth="2.5" pathLength="1000" strokeDasharray="54 946" />
    <g className="pb-motion pb-meeting-node"><circle cx="572" cy="350" r="85" fill={`url(#${id}-meeting)`} stroke="#8acbdd" /><circle cx="572" cy="350" r="65" fill="none" stroke="#d8faff" strokeWidth="2" /><circle cx="572" cy="350" r="109" fill="none" stroke="#79b8db" strokeWidth=".8" opacity=".3" /><circle cx="572" cy="350" r="136" fill="none" stroke="#9bcddf" strokeWidth=".7" opacity=".2" /><path d="M553 337L572 351L591 337M553 363L572 377L591 363" fill="none" stroke="#3f91bb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity=".75" /></g>
    <g className="pb-motion pb-conversation-orbit" fill="#b8f2ed" stroke="#67bccc"><circle cx="487" cy="285" r="7" /><circle cx="651" cy="423" r="5" /></g>
  </g>;
}

function HomeArt({ id }: SceneProps) {
  return <g className="pb-home-geometry">
    {[0, 1, 2].map(index => <g key={index} transform={`translate(0 ${index * 25})`}><path d="M130 466C330 190 525 615 889 247" fill="none" stroke={`url(#${id}-path)`} strokeWidth="1" /><path className={`pb-motion pb-trace pb-trace-blue pb-delay-${index}`} d="M130 466C330 190 525 615 889 247" fill="none" strokeWidth="1.8" pathLength="1000" strokeDasharray="34 966" /></g>)}
    <g className="pb-home-mark"><svg x="585" y="179" width="194" height="194" viewBox="0 0 128 128"><QuantLogo compact /></svg></g>
  </g>;
}

/** Decorative page-specific geometry. Motion is controlled by the parent BrandBackdrop. */
export function PageBrandArt({ scene, tone = "light" }: { scene: BrandScene; tone?: "light" | "dark" }) {
  const id = `pb-${useId().replaceAll(":", "")}`;
  const Art = { home: HomeArt, platform: PlatformArt, strategies: StrategiesArt, institutions: InstitutionsArt, research: ResearchArt, about: AboutArt, walkthrough: WalkthroughArt }[scene];
  return <div className={`pb-art pb-scene-${scene} pb-tone-${tone}`} aria-hidden="true">
    <svg className="pb-canvas" viewBox="0 0 960 700" preserveAspectRatio="xMidYMid meet" focusable="false">
      <SceneGradients id={id} />
      <Art id={id} />
    </svg>
  </div>;
}
