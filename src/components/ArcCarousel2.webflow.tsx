import ArcCarousel2 from "./ArcCarousel2";
import { props, PropType, PropValues } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

type LinkValue = PropValues[PropType.Link];

interface WebflowProps {
  autoplayDelay?: number;
  rotationDeg?: number;
  dropPx?: number;
  cardWidth?: number;
  cardSpacing?: number;
  [key: string]: any;
}

function transformLinks(webflowProps: WebflowProps) {
  const transformed: Record<string, any> = {};
  for (const [key, value] of Object.entries(webflowProps)) {
    if (key.endsWith("BtnLink") && value && typeof value === "object" && "href" in value) {
      transformed[key] = { href: (value as LinkValue).href, target: (value as LinkValue).target };
    } else {
      transformed[key] = value;
    }
  }
  return transformed;
}

function ArcCarousel2Wrapper(webflowProps: WebflowProps) {
  return <ArcCarousel2 {...transformLinks(webflowProps)} />;
}

function cardProps(n: number, title?: string, desc?: string, btnText?: string) {
  return {
    [`card${n}Image`]: props.Image({
      name: `Card ${n} Image`,
      group: `Card ${n}`,
    }),
    [`card${n}Title`]: props.Text({
      name: `Card ${n} Title`,
      defaultValue: title || "",
      group: `Card ${n}`,
    }),
    [`card${n}Desc`]: props.Text({
      name: `Card ${n} Description`,
      defaultValue: desc || "",
      group: `Card ${n}`,
    }),
    [`card${n}BtnText`]: props.Text({
      name: `Card ${n} Button Text`,
      defaultValue: btnText || "",
      group: `Card ${n}`,
    }),
    [`card${n}BtnLink`]: props.Link({
      name: `Card ${n} Button Link`,
      group: `Card ${n}`,
    }),
  };
}

export default declareComponent(ArcCarousel2Wrapper, {
  name: "Arc Carousel 2 (Slick)",
  description:
    "Fan/arc card carousel (Slick-based) with up to 10 cards. Test version using react-slick center mode.",
  group: "Sliders",
  options: {
    ssr: false,
  },
  props: {
    rotationDeg: props.Number({
      name: "Rotation Angle",
      defaultValue: 12,
      group: "Settings",
    }),
    dropPx: props.Number({
      name: "Drop Distance",
      defaultValue: 30,
      group: "Settings",
    }),
    autoplayDelay: props.Number({
      name: "Autoplay Delay (ms)",
      defaultValue: 3500,
      group: "Settings",
    }),
    cardWidth: props.Number({
      name: "Card Width (px)",
      defaultValue: 280,
      group: "Settings",
    }),
    cardSpacing: props.Number({
      name: "Card Spacing (px)",
      defaultValue: 10,
      group: "Settings",
    }),
    ...cardProps(1,
      "2025 Policy Manifesto",
      "An evidence-based plan to transform New Zealand into the world's most electric economy, saving households $29 million daily.",
      "Read More"
    ),
    ...cardProps(2,
      "Delivered Cost of Energy",
      "Investment decisions must account for the delivered cost of energy that consumers actually pay, not just simple generation costs.",
      "Read More"
    ),
    ...cardProps(3,
      "Electric Farms",
      "Electrifying farms presents a real opportunity to reduce costs, diversify income and play a significant role in NZ's renewable energy system.",
      "Read More"
    ),
    ...cardProps(4,
      "Electric Homes",
      "NZ has reached the electrification tipping point — households can save up to $4,500 per year by switching to electric appliances and solar.",
      "Read More"
    ),
    ...cardProps(5,
      "Investing in Tomorrow",
      "Household electrification can massively reduce emissions while saving money, with potential combined savings of $29 million per day by 2040.",
      "Read More"
    ),
    ...cardProps(6,
      "Ratepayers Assistance Scheme",
      "Making electrification affordable through cheap and easy loans that allow homes to upgrade to electric machines, solar and batteries.",
      "Read More"
    ),
    ...cardProps(7,
      "Symmetrical Export Tariffs",
      "Paying customers the same rate for electricity exported to the grid during peak times as they are charged for consumption.",
      "Read More"
    ),
    ...cardProps(8,
      "The Machine Count",
      "NZ's first comprehensive inventory of 10 million fossil fuel machines — 84% have cost-effective electric alternatives available today.",
      "Read More"
    ),
    ...cardProps(9),
    ...cardProps(10),
  },
});
