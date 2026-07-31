export interface ProductGuideFaq {
  question: string;
  answer: string;
}

export interface ProductGuide {
  /** Answer-first summary. First sentence must answer "what is this" outright. */
  overview: string;
  /** Who it suits, and just as importantly who it does not. */
  bestFor: string;
  /** Setup, first use, and the mistakes people make on day one. */
  howToUse: string;
  /** Cleaning, maintenance, and what shortens the product's life. */
  care: string;
  /** A real decision the buyer is weighing, with a custom heading. */
  compare: { heading: string; text: string };
  faqs: ProductGuideFaq[];
}

/**
 * Long-form product content, one hand-written entry per catalog product.
 *
 * Three rules govern this file:
 *
 * 1. No review content. The catalog's reviewCount values are seeded
 *    placeholders, and 16 of 23 products have zero stored reviews. Depth here
 *    comes from specifications, use, care, and comparison, never from
 *    fabricated customer opinion, and no aggregateRating or Review structured
 *    data is emitted anywhere on the product page.
 * 2. No shared paragraphs. Every entry is written against the individual
 *    product's own specifications. Repeating a block across 23 products would
 *    be duplicate content and would defeat the point.
 * 3. No unsourced statistics. Any number appearing here comes from the
 *    product's own specification list in src/data/products.ts or from the
 *    published shipping and returns policy, not from an outside claim.
 */
export const productGuides: Record<string, ProductGuide> = {
  'bamboo-desk-organizer': {
    overview:
      'The Bamboo Desk Organizer is a five-compartment desk caddy made from 100% natural bamboo, measuring 25 x 15 x 12 cm and weighing 450 grams. It is built to take the highest-volume desk clutter, meaning pens, cables, sticky notes, and a phone, and give each of those a fixed place inside a single corner-sized footprint. A dedicated smartphone slot with a pass-through hole for the charging cable lets the phone stand upright and charge at the same time instead of lying flat across the work surface.',
    bestFor:
      'This suits remote workers, students, and anyone whose desk is also a dining table or a shared surface that has to be cleared regularly. The five compartments in different sizes matter more than the total volume, because mixed stationery in one large bin is only marginally better than a pile. It is less suited to a heavy craft or workshop bench, where tools are longer than the compartments and the surface sees liquids that bamboo does not enjoy.',
    howToUse:
      'Place it on your non-dominant side so your writing hand keeps clear space, and run the charging cable through the phone slot before you fill anything else. Assign the tallest compartment to pens and the shallow ones to items you reach for less, then resist adding a second category to a compartment that already has one. The anti-slip base holds position on wood and laminate, so you can pull an item out one-handed without the whole organizer sliding with it.',
    care: 'Bamboo tolerates a damp cloth but not standing water, so wipe spills promptly rather than letting a ring sit. The water-resistant natural oil finish can be refreshed once a year with a light food-safe oil if the grain starts to look dry, which restores both the color and the moisture resistance. Keep it out of prolonged direct sunlight, since UV lightens bamboo unevenly, and avoid abrasive cleaners entirely because they cut through the oil finish and leave the fibre exposed.',
    compare: {
      heading: 'Bamboo or plastic for a desk organizer',
      text: 'Plastic organizers are cheaper and survive being knocked off a desk, which is a genuine advantage in a busy shared space. Bamboo wins on two other counts: it does not develop the scratched, hazy look that plastic gets within a year of daily use, and it is heavy enough at 450 grams to stay put when you pull a pen from it. If the organizer will live on one desk and be seen every day, bamboo is the better long-term choice. If it will be moved constantly or shared with children, plastic is the more forgiving option.',
    },
    faqs: [
      { question: 'Can it hold a phone while charging?', answer: 'Yes. It has a dedicated smartphone slot with a hole in the back for the charging cable, so the phone stands upright and charges at the same time.' },
      { question: 'How much desk space does it take?', answer: 'It occupies 25 x 15 x 12 cm, which is a corner of a standard desk rather than a significant portion of the working area.' },
      { question: 'Is the bamboo treated?', answer: 'It has a water-resistant natural oil finish. That handles wiped spills, but it is not a sealant, so standing water should still be cleared promptly.' },
    ],
  },

  'smart-water-bottle': {
    overview:
      'The Smart Water Bottle is a 500 ml vacuum-insulated bottle in food-grade 304 stainless steel with a Bluetooth 5.0 sensor and an LED display that shows temperature and volume. Its purpose is to turn hydration from a guess into a number: the display reports what is in the bottle, and the iOS or Android app records intake over the day. Vacuum insulation holds temperature for 24 hours, and the sensor battery runs about 30 days per USB charge.',
    bestFor:
      'This fits people who have already decided to drink more water and found that intention alone does not survive a working day. Tracking works because it converts a vague goal into visible progress, and the one-touch spill-proof lid means it can live on a desk beside a keyboard. It is oversized for anyone who simply wants a plain insulated bottle, since the sensor, the display, and the recharging requirement are all overhead you do not need if you were not going to look at the data.',
    howToUse:
      'Charge the sensor fully before first use, then pair it with the app before you fill the bottle, since pairing with a cold, wet bottle in hand is needlessly awkward. Set a daily target in the app that reflects your actual routine rather than an aspirational figure, because a target you miss every day stops being information. Fill with cold water first thing if you want it cold at midday, as the insulation holds a starting temperature rather than creating one.',
    care: 'Hand wash the bottle body and do not submerge the lid assembly, which contains the sensor and the display. The anti-bacterial lining reduces odor but does not replace washing, so give it a proper clean with a bottle brush rather than a rinse, particularly if you ever put anything other than water in it. Dry it fully with the lid off, since a sealed damp bottle is how stainless steel bottles develop a musty smell. Recharge over USB roughly monthly rather than waiting for the display to go dark mid-day.',
    compare: {
      heading: 'Is a tracking bottle worth it over a plain insulated one',
      text: 'A plain 500 ml insulated bottle does the physical job identically and never needs charging. The tracking version earns its place only if you will actually look at the number, because the feedback loop is the entire feature. If you have tried and failed to build a hydration habit, seeing volume on the display and a running total in the app closes the gap between intending and doing. If you already drink enough water without thinking about it, the sensor is a monthly charging chore in exchange for data you will not use.',
    },
    faqs: [
      { question: 'How long does the battery last?', answer: 'About 30 days per USB charge for the sensor and LED display. That is separate from the vacuum insulation, which needs no power at all.' },
      { question: 'Does it work without the app?', answer: 'Yes. The LED display shows temperature and volume on the bottle itself. The app adds intake history over time via Bluetooth 5.0.' },
      { question: 'Can it go in the dishwasher?', answer: 'No. Hand wash the body and keep the lid assembly out of water entirely, because the sensor and display are housed in it.' },
    ],
  },

  'led-desk-lamp-wireless-charger': {
    overview:
      'The LED Desk Lamp with Wireless Charger is a 10 W, 800 lumen task lamp with a 15 W Qi wireless charging pad built into its base. It replaces two objects and their cables with one. The light is adjustable across five color modes and ten brightness levels from 2700 K warm to 6500 K cool, with a 360 degree flexible neck, touch control, a memory function that recalls your last setting, an auto timer, and an extra USB output for charging a second device by cable.',
    bestFor:
      'This suits a desk that currently holds a lamp, a charging pad, and the cables for both, which is the exact clutter it is designed to consolidate. The adjustable color temperature matters for anyone who works across the day and into the evening, since the right light for detail work at 2 pm is not the right light for reading at 10 pm. It is not a room light: at 800 lumens with a directional head it lights a work surface well and a whole room poorly.',
    howToUse:
      'Place it on the side opposite your writing hand so the head does not cast a shadow across whatever you are working on, and angle the light onto the surface rather than into your eyes or straight at a screen. Set a cooler temperature nearer 6500 K for daytime detail work and a warmer one nearer 2700 K in the evening; the memory function means you only need to find each setting once. Keep the charging base clear of paper, because paper traps the heat a charging phone gives off.',
    care: 'Wipe the shade and base with a dry or barely damp cloth and never spray cleaner directly onto the unit, since liquid finding its way into the charging coil is the one failure this lamp is genuinely vulnerable to. Move the flexible neck by supporting the head rather than pulling on the shade, which is what loosens the joint over time. If wireless charging becomes intermittent, check for a case that is thick or metal-backed before assuming the pad has failed, as case interference is by far the more common cause.',
    compare: {
      heading: 'Combined lamp and charger, or two separate devices',
      text: 'Separate devices give you free choice on each and a failure in one does not cost you the other. The combined unit wins on desk economics: one footprint, one wall socket, and one cable instead of two of each, which is a real gain on a small desk. The trade-off worth knowing is that a phone charging wirelessly runs warmer and charges more slowly than one on a cable, so if you routinely need a fast top-up before leaving, use the lamp\'s separate USB output for that and keep the pad for slow background charging.',
    },
    faqs: [
      { question: 'How bright is it?', answer: '800 lumens from a 10 W LED, across ten brightness levels. That is sized for a work surface rather than for lighting a whole room.' },
      { question: 'Will it charge through a phone case?', answer: 'It charges any Qi-compatible phone at up to 15 W, but a thick case or a metal-backed one can block the field. The separate USB output is the fallback.' },
      { question: 'Does it remember my settings?', answer: 'Yes, it has a memory function that recalls your last brightness and color temperature, so you do not reset it every time you switch it on.' },
    ],
  },

  'premium-gift-box-set': {
    overview:
      'The Premium Gift Box Set is a ready-to-give self-care box containing four items and a personalizable greeting card: a 200 gram aromatherapy scented candle with a 40-hour burn time, three 100 gram organic bath bombs, a premium silk eye mask, and a 100 ml mini USB essential oil diffuser. The box measures 30 x 25 x 10 cm and the set weighs 1.2 kg, packed in gift-ready packaging made from eco-friendly materials, so nothing needs wrapping after it arrives.',
    bestFor:
      'This is the answer to the hardest gifting case, which is a warm relationship where you do not know specifics. Every item is consumable or personal-use, so it does not oblige the recipient to find shelf space for something they did not pick. It works for housewarmings, new jobs, thank-you gestures, and colleague birthdays. It is a weaker choice for someone with a known fragrance sensitivity, since three of the four items are scent-led.',
    howToUse:
      'If you are shipping directly to the recipient, write the card message at checkout rather than sending an unmarked box, because a named card is what separates a gift from a delivery. For the candle, trim the wick to about 5 mm before every burn and allow the first burn to run long enough for the melt pool to reach the edge, which prevents tunnelling and preserves the full 40 hours. Run the mini diffuser on a desk or bedside table rather than in a large room, since a 100 ml tank is sized for close range.',
    care: 'Store the bath bombs sealed and dry until use, because ambient humidity starts the reaction early and a bomb that has absorbed moisture fizzes weakly. Keep the candle out of draughts, which make it burn unevenly down one side regardless of how well the first burn was managed. Hand wash the silk eye mask in cool water with a mild detergent and air dry it flat rather than wringing it, since silk loses its structure when twisted wet. Empty and dry the diffuser tank between different oils.',
    compare: {
      heading: 'A curated set or picking individual gifts',
      text: 'Assembling your own gift lets you match a known preference precisely, and for a close friend that is the better route. The curated set wins when you are buying under time pressure or without specific knowledge, because it removes both the selection decision and the presentation problem in one purchase. It also spreads across several weeks of use rather than a single moment, with a 40-hour candle and three bath bombs, which is what makes a set at this price feel considered rather than token.',
    },
    faqs: [
      { question: 'Does it arrive gift wrapped?', answer: 'Yes. It ships in its own gift-ready packaging with a personalizable greeting card, so it does not need rewrapping before giving.' },
      { question: 'How many items are in the box?', answer: 'Four items plus the card: a 200 gram candle, three organic bath bombs, a silk eye mask, and a 100 ml mini USB diffuser.' },
      { question: 'How long does the candle burn?', answer: 'Approximately 40 hours. Trim the wick to about 5 mm before each burn and let the first burn form a full melt pool to reach that figure.' },
    ],
  },

  'minimalist-wallet': {
    overview:
      'The Minimalist Wallet is a slim full-grain cowhide leather wallet measuring 10.5 x 7.5 x 0.7 cm and weighing 45 grams, built around a fixed capacity of 6 to 8 cards plus folded bills. It stays 7 mm thick when full because it has no expansion designed into it, which is the point rather than a limitation. An RFID blocking layer stops readers at 13.56 MHz, the frequency used by contactless payment cards and many access badges, and it carries a 2-year warranty.',
    bestFor:
      'This suits front-pocket carry and anyone whose current wallet has become a filing cabinet for receipts and cards they never use. The elastic card holder puts the two or three cards you actually use daily within immediate reach, and a hidden rear slot takes cash or a backup card. It is the wrong wallet if you regularly carry more than eight cards, coins, or folded documents, because forcing it past its designed capacity defeats the slim profile entirely.',
    howToUse:
      'Before the first use, decide which cards genuinely earn a place, because the wallet will not make that decision comfortably later. Put the two you tap most into the elastic holder and the rest behind, then fold bills once and slide them into the rear slot rather than trying to fit them alongside cards. New full-grain leather is stiff for the first week or two and loosens with body heat and use, so do not judge the fit on day one.',
    care: 'Keep it out of prolonged direct sun, which fades and dries leather faster than anything else in ordinary use. If it gets wet, let it dry naturally at room temperature rather than near a heater, since forced heat makes leather brittle and cracks the finish. Condition it lightly once or twice a year with a leather balm, working it in with a cloth rather than saturating the surface. The hand-stitched waxed thread is more durable than machine stitching and can be re-waxed if it dries out.',
    compare: {
      heading: 'Full-grain leather against bonded leather and metal',
      text: 'Bonded leather is cheaper and looks similar on the shelf, but it is reconstituted fibre with a surface coating, and that coating peels rather than ages. Full-grain keeps the outer layer of the hide intact, which is why it develops a patina and gets better looking with use instead of worse. Metal card holders beat leather on absolute slimness and on card protection, but they carry cash poorly and feel harsh in a front pocket. Full-grain at 7 mm is the middle position, taking cash and cards while staying flat.',
    },
    faqs: [
      { question: 'How many cards does it hold?', answer: 'Six to eight cards plus folded bills in the hidden rear slot. It stays 7 mm thick at full capacity because it is not designed to expand past that.' },
      { question: 'Does RFID blocking affect my cards?', answer: 'No. It blocks external readers at 13.56 MHz from waking your contactless chips. It does not damage the cards and has no effect on magnetic stripe cards.' },
      { question: 'Will the leather wear out?', answer: 'Full-grain cowhide develops a patina rather than deteriorating. Occasional conditioning and keeping it out of direct sun and forced heat are what extend its life.' },
    ],
  },

  'wireless-earbuds-pro': {
    overview:
      'The Wireless Earbuds Pro are true wireless earbuds with active noise cancellation, transparency mode, and 10 mm custom-tuned dynamic drivers. Each bud weighs 5.5 grams and runs 8 hours with ANC on, reaching 32 hours in total with the charging case. They use Bluetooth 5.2 at 60 ms latency, support AAC and SBC codecs, are IPX5 water resistant, and recharge over USB-C fast charging or on any wireless pad, with touch controls on both buds.',
    bestFor:
      'These fit commuters, open-plan office workers, and anyone who wants one pair for calls, music, and video without carrying a second device for any of them. The 60 ms latency is low enough that video stays lip-synced, which is the practical bar most people actually care about. They are not the right pick for wired-quality critical listening or for studio monitoring, and AAC and SBC support means Android users looking for a high-bitrate codec such as aptX or LDAC should look elsewhere.',
    howToUse:
      'Work through the included ear tip sizes before forming any opinion on sound, because seal drives both perceived bass and how well noise cancellation performs, and the pre-fitted tips fit a minority of ears well. Use ANC for constant background noise such as engine hum, air conditioning, or train rumble, and switch to transparency when you are near traffic or need to stay reachable. Running ANC constantly also costs battery, so transparency is the sensible default in an already quiet room.',
    care: 'Wipe the buds after workouts, since IPX5 covers sweat and light rain but not the residue sweat leaves behind on the mesh. Clean the driver mesh gently with a dry soft brush rather than anything wet or pointed, because a punctured mesh is not repairable. Return the buds to the case between uses rather than leaving them loose in a pocket, which both charges them and keeps lint out of the contacts. If one bud stops charging, clean the case contacts before assuming a fault.',
    compare: {
      heading: 'Noise cancellation compared with passive isolation',
      text: 'Active noise cancellation and a good physical seal solve different halves of the same problem. ANC works by generating an inverse waveform, which is highly effective against constant low-frequency sound and much less effective against speech or sudden noise. Passive isolation, which is simply a well-sealed ear tip, handles higher frequencies better. That is why tip selection is not a comfort detail here: the right tip improves the frequencies ANC is weakest at, and the two together get you closer to quiet than either does alone.',
    },
    faqs: [
      { question: 'How long do they last per charge?', answer: 'About 8 hours per bud with ANC on, and 32 hours in total including the charging case. They fast charge over USB-C or charge on a wireless pad.' },
      { question: 'Can I use them in the rain?', answer: 'They are IPX5 rated, which covers sweat and light rain. Wipe them dry afterwards, since the rating handles water but not what water leaves behind.' },
      { question: 'Is there noticeable lag when watching video?', answer: 'Latency is 60 ms over Bluetooth 5.2, which is low enough that video stays lip-synced in normal viewing.' },
    ],
  },

  'portable-blender': {
    overview:
      'The Portable Blender is a cordless 400 ml personal blender with a 150 W motor, six stainless steel blades, and a 2000 mAh USB-C rechargeable battery that delivers roughly 15 to 20 blends per charge. The jar is BPA-free Tritan and doubles as the cup you drink from, so a smoothie made in it does not create a second item to wash. It includes a safety lock, a leak-proof design, and a self-cleaning function, and the whole unit weighs 450 grams.',
    bestFor:
      'This suits a single-serving routine: one smoothie in the morning, a protein shake after training, or blended baby food away from a kitchen. Being cordless is what makes it realistic to keep in a drawer or a gym bag rather than surrendering permanent counter space. It is not a substitute for a full-size blender on tough jobs. A 150 W motor handles soft fruit, leaves, and yogurt well, and struggles with large frozen blocks or hard root vegetables.',
    howToUse:
      'Add liquid first and solids second, which lets the blades start in fluid instead of stalling against a packed load, and this single ordering change resolves most blending complaints. Cut frozen fruit into smaller pieces rather than dropping in whole chunks, and fill to the marked line rather than the rim so the contents have room to circulate. Engage the safety lock fully before pressing start, since the motor will not run without it as a protection against operating an open jar.',
    care: 'Rinse immediately after use, because dried fruit pulp around the blade base is the leading cause of odor and the hardest thing to remove later. Add warm water and a drop of dish soap, run the self-cleaning function, then rinse and leave the jar upside down to dry with the lid off. Do not submerge the motor base and do not put it in a dishwasher. Recharge over USB-C for about two hours when output weakens rather than running the battery flat repeatedly.',
    compare: {
      heading: 'Portable blender against a countertop model',
      text: 'A countertop blender has several times the motor power and will crush ice and frozen blocks that this one cannot. The trade is that a countertop unit occupies permanent space, needs an outlet, and produces a jar to wash separately from the glass you drink from. For one person making one drink, the portable version wins on the whole workflow rather than on raw power: it blends, it is the cup, it cleans itself, and it goes back in a drawer. Keep the countertop model if you blend for several people or work with hard frozen ingredients regularly.',
    },
    faqs: [
      { question: 'How many drinks per charge?', answer: 'Roughly 15 to 20 blends from the 2000 mAh battery, which recharges over USB-C in about two hours.' },
      { question: 'Can it crush ice?', answer: 'It handles small ice pieces and frozen fruit that has been cut down. A 150 W motor is not built for large frozen blocks, so break ingredients up first.' },
      { question: 'Is the jar safe to drink from?', answer: 'Yes, the jar is BPA-free Tritan and is designed to be the drinking vessel, which is why the unit does not create a separate cup to wash.' },
    ],
  },

  'aromatherapy-diffuser': {
    overview:
      'The Aromatherapy Diffuser is a 300 ml ultrasonic diffuser with a wood grain finish that vibrates water and essential oil into a cool mist rather than heating it. It runs 6 to 10 hours per fill at roughly 30 ml per hour, covers up to 30 square metres, and operates below 30 dB, which is quiet enough to leave on overnight. It offers 1, 3, and 6-hour timers, a 7-color LED ambient light, and automatic shut-off when the tank runs dry.',
    bestFor:
      'This is sized for a bedroom, a living room, or a home office rather than an open-plan floor, and the coverage figure of 30 square metres is the number to check against your room before ordering. The heatless method matters if you care about the oil itself, since heat degrades the lighter aromatic compounds that a burner drives off first. The LED light makes it usable as a low night light. It is not a humidifier, and 30 ml per hour will not meaningfully change room humidity.',
    howToUse:
      'Fill to the marked line with room-temperature water, add a few drops of oil rather than pouring, and run the 1-hour timer first so you can judge strength in your actual room. Scent fatigue sets in fast: a level that seems right after ten minutes usually reads as too strong to someone entering an hour later, so start lighter than feels correct. Place it on a hard surface at least a short distance from walls and soft furnishings, since fine mist settles on nearby surfaces over time.',
    care: 'Empty and dry the tank between different oils, because residue from a heavy oil such as patchouli carries into the next fill and muddies it. Every few weeks, wipe the ceramic disc at the base of the tank with a cotton swab and a little white vinegar, then rinse: mineral scale on that disc is the usual reason mist output weakens, not a failing unit. Do not run it dry deliberately even though it shuts off automatically, and never use the tank for anything other than water and essential oil.',
    compare: {
      heading: 'Ultrasonic diffuser, reed diffuser, or candle',
      text: 'A reed diffuser needs no power and no maintenance, but its output is fixed and it cannot be turned off, which is a problem in a bedroom. A scented candle gives warmth and light but consumes itself, cannot be left unattended, and its scent profile changes as it burns. An ultrasonic unit is the controllable option: timers, adjustable strength through how many drops you add, automatic shut-off, and no flame. The trade-off is that it needs water, an outlet, and periodic descaling of the ceramic disc.',
    },
    faqs: [
      { question: 'How long does one tank last?', answer: 'Between 6 and 10 hours from the 300 ml tank at roughly 30 ml per hour output. Timers of 1, 3, and 6 hours let you run it for less.' },
      { question: 'Is it quiet enough for a bedroom?', answer: 'It operates below 30 dB and shuts off automatically when the water runs out, so it can run overnight without waking you or needing supervision.' },
      { question: 'Why has the mist gotten weaker?', answer: 'Almost always mineral scale on the ceramic disc. Clean it with a cotton swab and a little white vinegar, then rinse, before concluding the unit has failed.' },
    ],
  },

  'ceramic-plant-pot-set': {
    overview:
      'The Ceramic Plant Pot Set is three high-fired ceramic pots in small, medium, and large sizes, each with a drainage hole and a matching bamboo saucer. The pots measure 12 x 12 x 10 cm, 15 x 15 x 13 cm, and 18 x 18 x 15 cm, and the set weighs 2.5 kg in a matte white finish. The drainage hole in every pot is the specification that matters most, because it is what separates a planter you can use directly from a decorative cover pot.',
    bestFor:
      'This suits indoor plants that need real drainage, which is most of them, and the three graduated sizes cover a small succulent, a mid-size foliage plant, and something with an established root ball. High-fired ceramic is heavy enough to keep a top-heavy plant upright, which lightweight plastic is not. It is less suited to hanging displays or to a balcony that sees frost, since ceramic is brittle and water trapped in the wall of a pot can crack it when it freezes.',
    howToUse:
      'Put a layer of coarse material over the drainage hole so soil does not wash out, then pot with a mix suited to the plant rather than generic garden soil, which compacts in a container. Match the pot size to the root ball and step up gradually: over-potting is a common mistake because a large volume of wet soil around a small root system stays wet long enough to rot roots. Set the bamboo saucer under the pot before you water and empty it afterwards rather than leaving the pot standing in runoff.',
    care: 'Wipe the matte finish with a damp cloth, and treat white mineral marks with a little white vinegar on a cloth rather than an abrasive pad, which will dull the matte surface permanently. Keep the bamboo saucers dry between waterings, since bamboo left standing in water will stain and eventually warp. Move pots by supporting the base rather than lifting by the rim, especially the 18 cm size with wet soil in it, and never place ceramic directly onto a cold surface after it has been somewhere warm.',
    compare: {
      heading: 'Ceramic against plastic and terracotta',
      text: 'Plastic is light, cheap, and unbreakable, which makes it the sensible choice for a plant that moves often or sits high up. Terracotta is porous, so it wicks moisture out of the soil and suits plants that want to dry between waterings, but it also stains and dries the soil faster than some plants like. Glazed ceramic sits in between: it holds moisture more evenly than terracotta, weighs enough to stabilise a tall plant, and is the only one of the three that looks finished in a living room. Its weakness is that it chips and cracks when dropped or frozen.',
    },
    faqs: [
      { question: 'Do the pots have drainage holes?', answer: 'Yes, all three do, and each comes with a bamboo saucer to catch runoff. That is what allows them to be used as planters rather than only as decorative covers.' },
      { question: 'What sizes are included?', answer: 'Three: 12 x 12 x 10 cm, 15 x 15 x 13 cm, and 18 x 18 x 15 cm, in a matte white finish, with a total set weight of 2.5 kg.' },
      { question: 'Can they be used outdoors?', answer: 'They can in mild conditions, but ceramic is vulnerable to frost, because water absorbed into the wall of a pot expands when it freezes and cracks it. Bring them in before a freeze.' },
    ],
  },

  'multi-tool-pocket-knife': {
    overview:
      'The Multi-Tool Pocket Knife combines 12 functions in a 140 gram body that folds to 9 cm and opens to 16 cm. The main blade is 420HC stainless steel hardened to 57 to 59 HRC, the handle pairs stainless steel with a G10 grip, and a built-in wire stripper sits alongside the usual driver and opener functions. It has a blade lock and one-hand opening, which are the two features that separate a tool you rely on from one that stays in a drawer, and a nylon pouch is included.',
    bestFor:
      'This suits commuters, campers, and renters handling their own small repairs, along with anyone who wants one item covering several jobs while travelling. The value is not the function count, it is that the tool you need is already in your pocket rather than in a toolbox two rooms away. It is not a substitute for a real toolkit on a real project: at 140 grams it is built for portability, not for torque, so use full-size drivers for furniture assembly.',
    howToUse:
      'Confirm the blade lock has engaged before applying any force, and close the blade with your fingers clear of its path rather than by feel. Use the wire stripper on the correct gauge notch instead of forcing a heavier wire through a smaller one, which nicks the conductor. Check local rules before carrying it, since blade length limits and carry restrictions vary by state and by city in the US and by country abroad, and note that it cannot travel in cabin baggage on a flight.',
    care: 'Wipe the blade dry after any contact with moisture, because stainless steel resists corrosion but does not ignore salt water or prolonged damp. A drop of light oil on the pivot once or twice a year keeps the one-hand opening smooth and stops the action becoming gritty. Sharpen on a fine stone or a pull-through sharpener when the edge stops catching on a fingernail under light pressure; 420HC responds quickly, so this is a short job. Store it in the included nylon pouch rather than loose in a bag where the pivot collects grit.',
    compare: {
      heading: 'Why 420HC steel rather than a harder alloy',
      text: 'Harder steels hold an edge for longer, and on a dedicated knife that is a clear advantage. On a multi-tool used for mixed and occasionally abusive tasks, it is not. Harder alloys chip when levered or twisted and they need proper equipment to resharpen, which means a dull blade stays dull. 420HC at 57 to 59 HRC corrodes slowly, takes a working edge from a simple pocket stone in a few minutes, and bends rather than chips under sideways load. For everyday carry, recoverable beats maximum.',
    },
    faqs: [
      { question: 'How many functions does it have?', answer: 'Twelve, including the main 420HC stainless steel blade and a built-in wire stripper. It folds to 9 cm, opens to 16 cm, and weighs 140 grams.' },
      { question: 'Can I fly with it?', answer: 'Only in checked luggage. Folding knives are not permitted in cabin baggage, and local carry rules vary by state, city, and country.' },
      { question: 'Does it lock open?', answer: 'Yes, it has a blade lock mechanism and one-hand opening. Always confirm the lock has engaged before applying force to the blade.' },
    ],
  },

  'foldable-storage-bins': {
    overview:
      'The Foldable Storage Bins are a set of four fabric bins, each 30 x 30 x 30 cm with a 27 litre capacity, built from quality non-woven fabric over a reinforced cardboard structure. Each bin has dual fabric handles and a transparent label holder on the front, weighs 200 grams empty, and folds flat to 3 cm when it is not in use. The 30 cm cube dimension is deliberately universal, so the bins fit the shelving systems most homes already own.',
    bestFor:
      'These suit seasonal storage, closet shelves, under-bed overflow, and any category of items that is currently living in a pile. The label holder is what turns four bins into a system rather than four opaque boxes you have to open one at a time. They are the wrong choice for anything heavy, damp, or sharp: cardboard-reinforced fabric handles bulk and light weight well, and it does not handle tools, liquids, or a garage floor.',
    howToUse:
      'Give each bin a single category and write it on the label card, because a bin holding three categories is a pile with walls. Group by retrieval frequency rather than by type, putting the things you need seasonally on high shelves and the things you reach for monthly at eye level. Fill to the top rather than half way, since a partly filled fabric bin slumps and loses its shape, and use folded rather than rolled storage for clothing so you can see everything from above.',
    care: 'Wipe the exterior with a barely damp cloth and let it air dry fully before refilling, since the cardboard reinforcement inside is what gives the bin its shape and it does not recover from a soaking. Keep them off concrete floors and out of basements or garages where moisture wicks up from below. When storing them empty, fold them flat to 3 cm and lay them down rather than standing them on edge under weight, which creases the panels permanently.',
    compare: {
      heading: 'Fabric bins compared with plastic boxes',
      text: 'Plastic boxes seal against dust and moisture, stack safely under real weight, and survive a garage. Fabric bins do none of those things. What they do instead is fold to 3 cm when the season ends, which plastic never does, and they weigh 200 grams instead of a kilo. On a closet shelf where the load is textiles and light goods and where empty boxes would otherwise occupy space year-round, fabric is the better answer. For anything stored in a basement, garage, or attic, use plastic.',
    },
    faqs: [
      { question: 'How many bins are in the set?', answer: 'Four, each 30 x 30 x 30 cm with a 27 litre capacity, dual fabric handles, and a transparent label holder on the front.' },
      { question: 'Do they fold when not in use?', answer: 'Yes, each folds flat to 3 cm, which is the main advantage over rigid boxes when storage needs are seasonal.' },
      { question: 'Can I use them in a garage?', answer: 'Not recommended. The reinforcement is cardboard, so moisture from a concrete floor or a damp wall will soften the structure. Use sealed plastic for those spaces.' },
    ],
  },

  'electric-wine-opener': {
    overview:
      'The Electric Wine Opener removes a cork in about six seconds at the press of a button, running on a rechargeable lithium-ion battery good for 80 or more bottles per charge. The body is stainless steel with an ABS housing, it measures 5 x 5 x 23 cm and weighs 280 grams, and it includes a built-in LED light for reading the bottle neck. A charging base is included, along with a foil cutter, a bottle stopper, and a pourer, all in gift box packaging.',
    bestFor:
      'This suits anyone who finds a manual corkscrew awkward, which includes people with reduced grip strength or wrist pain, and it suits hosting, where opening several bottles by hand becomes a chore. The included foil cutter matters more than it sounds, since foil is the part of the process most people do badly with a knife. It is unnecessary if you mostly drink screw-cap wine, and it will not help with synthetic corks that are unusually tight, though it handles standard ones without difficulty.',
    howToUse:
      'Cut the foil cleanly with the included cutter first, then seat the opener squarely on the bottle neck rather than at an angle, because an angled start is what causes a cork to break. Hold the bottle steady and let the motor do the work without pushing down. Press the reverse button to eject the cork once it is out. Charge it fully before a gathering, since 80 bottles per charge is generous but a flat battery at the wrong moment is the one failure mode worth avoiding.',
    care: 'Wipe the stainless body with a damp cloth and never submerge any part of the unit, since it contains a motor and a battery. Clear any cork fragments from the spiral after use rather than letting them dry in place, as compacted cork is what makes the mechanism stiff over time. Store it on the charging base so it is always ready and the battery is not left flat for months, which shortens lithium-ion life more than regular use does.',
    compare: {
      heading: 'Electric opener against a waiter\'s corkscrew',
      text: 'A waiter\'s friend is cheaper, needs no charging, fits in a pocket, and in trained hands is genuinely fast. It also requires technique, leverage, and grip strength, and it is where most broken corks come from. The electric version removes all three requirements: seat it, press, wait about six seconds. If you open wine occasionally and enjoy the ritual, the manual tool is the better object. If you open wine while hosting, or if grip or wrist strength is a factor, the electric one removes a friction point that manual technique never fully solves.',
    },
    faqs: [
      { question: 'How many bottles per charge?', answer: 'Eighty or more per full charge of the lithium-ion battery, using the included charging base.' },
      { question: 'What comes in the box?', answer: 'The opener, the charging base, a foil cutter, a bottle stopper, and a pourer, in gift box packaging.' },
      { question: 'How fast does it open a bottle?', answer: 'About six seconds per cork. Cut the foil first and seat the opener squarely on the neck, since an angled start is the usual cause of a broken cork.' },
    ],
  },

  'stainless-steel-2-tier-dish-rack': {
    overview:
      'The Stainless Steel 2-Tier Dish Rack is a 42 x 25 x 38 cm rack in food-grade 304 stainless steel that holds 20 or more plates plus six glasses on hooks, with a dedicated cutlery compartment and a drip tray with a drain spout. It weighs 1.8 kg, carries a maximum load of 15 kg, sits on food-grade silicone anti-slip feet, and assembles without tools in about five minutes. It comes with a 2-year warranty.',
    bestFor:
      'This suits kitchens without a dishwasher or with one that does not cover everything, and the two-tier layout is what makes the 42 cm footprint hold a full sink load. Measure the clear run of counter beside your sink and check 38 cm of clearance under any wall cabinet before ordering. It is oversized for a single-person kitchen where a small drainer would do, and its 15 kg maximum load is generous but not a shelf, so it is not for storing heavy cookware permanently.',
    howToUse:
      'Position it so the drain spout points toward the sink and angle it very slightly that way, and the tray empties itself instead of pooling on the counter. Load plates on the lower tier and lighter items above, keeping the heaviest pieces near the frame rather than at the outer edge. Hang glasses upside down on the hooks so they drain fully, and stand cutlery handles-down in the compartment for hygiene and handles-up only when you want to grab them quickly.',
    care: 'Empty and wipe the drip tray weekly, because standing water is what creates mineral deposits at the spout and eventually a smell. Treat limescale with white vinegar on a cloth rather than an abrasive pad, since scouring scratches the passive layer that gives stainless steel its corrosion resistance. Check the silicone feet occasionally for trapped debris, which is what makes a rack rock on a counter. Dry the frame after deep cleaning rather than leaving it wet under a stack of plates.',
    compare: {
      heading: 'Why 304 stainless steel matters on a dish rack',
      text: 'A dish rack lives permanently wet, which is the harshest ordinary condition a kitchen item faces. Chrome-plated wire racks look identical when new, but the plating chips where plates knock against it and rust starts at those points within months. 304 stainless steel is the grade normally specified for food equipment precisely because it resists corrosion through the whole thickness of the material rather than through a coating. That is the difference between a rack that still looks clean after a year beside a sink and one that stains at every joint.',
    },
    faqs: [
      { question: 'How many plates does it hold?', answer: 'Twenty or more, plus six glasses on the hooks and a separate cutlery compartment. Its maximum load is 15 kg.' },
      { question: 'Does it need assembly?', answer: 'Yes, but no tools are needed and it takes about five minutes.' },
      { question: 'Will it rust?', answer: 'It is food-grade 304 stainless steel, chosen because it resists corrosion in the permanently wet conditions a dish rack lives in. It carries a 2-year warranty.' },
    ],
  },

  'rak-sepatu-minimalis-5-tingkat': {
    overview:
      'The Minimalist 5-Tier Shoe Rack holds up to 15 pairs of shoes on a 60 x 30 cm footprint, standing 90 cm tall on a rust-resistant powder-coated steel frame with breathable fabric shelves. It weighs 2 kg, supports a maximum load of 25 kg, and assembles without special tools. Tier spacing is adjustable, which is the specification that decides whether boots and sneakers can share the same rack or whether tall footwear has to live elsewhere.',
    bestFor:
      'This is an entryway and closet solution for households where shoes accumulate by the door, and the narrow 30 cm depth is what lets it fit a hallway without blocking it. Breathable fabric rather than a solid shelf matters for footwear that comes in damp. It is not a display piece for a shoe collection, and it is the wrong choice for very heavy boots in quantity, since 25 kg spread across five tiers is a modest allowance per shelf.',
    howToUse:
      'Set the tier spacing before you assemble rather than after, and give the bottom tier the most height for boots and the upper tiers less for flats and sneakers. Put the shoes you wear daily at the middle tiers where you can reach them without bending or stretching, which is the difference between a rack that gets used and a rack you step around. Let wet shoes dry before shelving them, since fabric shelves breathe but do not dry footwear on their own.',
    care: 'Wipe the powder-coated frame with a damp cloth and dry it, since powder coating resists rust well but a chipped spot will corrode if left wet. Vacuum or shake out the fabric shelves periodically, because grit from shoe soles is what wears the fabric through at the contact points. Check the frame joints for tightness every few months, particularly if the rack is loaded to its 25 kg limit, and re-tighten rather than waiting for a wobble to become a lean.',
    compare: {
      heading: 'Open fabric shelving against a closed shoe cabinet',
      text: 'A closed cabinet hides shoes completely and keeps dust off them, which suits a formal entryway. It also traps moisture, which is a genuine problem for footwear worn in rain or snow, and it costs considerably more floor depth than 30 cm. Open fabric shelving lets damp shoes dry, costs less, and makes the daily grab-and-go faster because you can see everything. The trade is visual: shoes on an open rack are part of the room. If your entryway is on show, a cabinet wins. If it is a working hallway, open shelving is the more practical choice.',
    },
    faqs: [
      { question: 'How many pairs does it hold?', answer: 'Up to 15 pairs across five tiers, within a 25 kg maximum load, on a 60 x 30 cm footprint.' },
      { question: 'Can it fit boots?', answer: 'Yes, if you set the tier spacing accordingly. Spacing is adjustable, so give the bottom tier extra height for boots and reduce the upper tiers for flats.' },
      { question: 'Will the steel frame rust?', answer: 'The frame is powder coated to resist rust. Dry any chipped spots rather than leaving them wet, since a break in the coating is where corrosion starts.' },
    ],
  },

  'rak-dinding-floating-shelf-set': {
    overview:
      'The Floating Wall Shelf Set is three solid paulownia wood shelves at 40, 50, and 60 cm long, each 15 cm deep and 2 cm thick, rated for 5 kg per shelf. Concealed brackets give the floating appearance, meaning no visible supports beneath the shelf, and the set weighs 1.5 kg with a water-resistant finish over natural grain. Mounting hardware and a mini level are included, so the only additional tool needed is a drill suited to your wall type.',
    bestFor:
      'These suit walls that are currently doing nothing, which is where most homes have their remaining storage capacity. Three different lengths let you stagger the shelves rather than lining them up, which is what makes a floating shelf arrangement look intentional. At 15 cm deep they take books, small plants, and framed items comfortably, and they are not deep enough for large boxes or serving dishes.',
    howToUse:
      'Find the wall structure first, because the 5 kg rating assumes a proper fixing and not a screw driven into plasterboard alone. Use anchors rated for your wall type, and on drywall aim for studs where you can. Mark the bracket positions using the included mini level rather than measuring from the ceiling, since ceilings are rarely level. Load from the centre outward and keep the heaviest items near the bracket rather than at the free end, where leverage works against you.',
    care: 'Dust with a dry cloth and use a barely damp one for marks, since the water-resistant finish handles wiping but not standing moisture. Keep plants on saucers rather than directly on the wood, because a slow leak from a pot is the most common way a wooden shelf gets a permanent ring. Check the wall fixings every few months, especially in the first weeks after mounting when a fixing that was slightly loose will reveal itself, and re-tighten before the shelf tilts.',
    compare: {
      heading: 'Floating shelves against bracket shelves',
      text: 'Visible brackets are stronger, cheaper, and far more forgiving to install, because the load path is obvious and the bracket carries it directly to the wall. Floating shelves hide the hardware inside the shelf body, which looks cleaner and suits a minimal room, but every kilogram is carried by the concealed rod and the wall fixing behind it. That is why the 5 kg rating and the choice of anchor matter more here than on a bracket shelf. Choose floating for visual calm in a living space, and choose brackets for a garage, a pantry, or anywhere the load will be heavy.',
    },
    faqs: [
      { question: 'What lengths are included?', answer: 'Three shelves at 40, 50, and 60 cm, each 15 cm deep and 2 cm thick, in solid paulownia wood.' },
      { question: 'How much weight can each shelf take?', answer: 'Five kilograms per shelf, provided the wall fixing is appropriate for your wall type. The fixing, not the shelf, is usually the limiting factor.' },
      { question: 'Is mounting hardware included?', answer: 'Yes, brackets, screws, and a mini level are in the box. You supply a drill and, where needed, anchors matched to your wall.' },
    ],
  },

  'gantungan-kunci-dinding-magnetik': {
    overview:
      'The Magnetic Wall Key Holder is a 30 x 8 x 5 cm walnut wood and brushed stainless steel wall unit with six N52 neodymium magnet points, each holding up to 500 grams. It adds a top shelf for a wallet, phone, or sunglasses and five hooks along the bottom for lanyards, dog leads, and bags. It weighs 350 grams, installs on two concealed screw points, and carries a 1-year warranty.',
    bestFor:
      'This is aimed squarely at the daily search for keys, and it works because a magnet requires no aim: you touch the keys to the strip and they hold, where a hook requires you to thread a ring. The combination of magnets, a shelf, and hooks means the whole pocket-emptying routine lands in one place by the door. It is not designed for heavy items, so a bag of any real weight belongs on a proper hook and not on the hooks here.',
    howToUse:
      'Mount it at the height where your hand naturally falls when you walk in, roughly chest height for most people, and within a step of the door rather than further inside, because a key holder past the point where you set things down will not be used. Use both concealed screw points and anchors matched to your wall, since the load sits in shear against the wall. Give the magnets the metal part of a keyring rather than a plastic fob, and everything with a home there will be there tomorrow.',
    care: 'Dust the walnut with a dry cloth and treat it like furniture rather than hardware, avoiding wet cleaning and household sprays that will dull the finish. Wipe the brushed stainless with the grain rather than across it so cleaning marks do not show. Neodymium magnets need no maintenance, but they are brittle: do not let keys snap onto them from a distance repeatedly, since impact rather than age is what chips a magnet face. Keep credit cards and older hotel keycards away from the magnet strip.',
    compare: {
      heading: 'Magnets against hooks for keys',
      text: 'Hooks cost less, hold more weight, and never demagnetise anything. They also require a small act of aim and threading every time, which is exactly the friction that makes people drop keys on a counter instead. Magnets remove the aim: contact is enough. Where hooks win outright is on non-magnetic items and on weight, which is why this unit includes five of them underneath rather than relying on magnets alone. The one genuine caution with magnets is proximity to cards with magnetic stripes, so keep a wallet on the shelf rather than against the strip.',
    },
    faqs: [
      { question: 'How much can each magnet hold?', answer: 'Up to 500 grams per point, across six N52 neodymium points, which covers ordinary key sets comfortably.' },
      { question: 'Will it demagnetise my cards?', answer: 'Keep magnetic stripe cards and older hotel keycards away from the strip itself. Contactless chip cards are far less affected, but the shelf is the safer place for a wallet.' },
      { question: 'How does it mount?', answer: 'Two concealed screw points. Use anchors matched to your wall type, since the load sits in shear rather than straight down into the fixing.' },
    ],
  },

  'rak-buku-minimalis-industrial': {
    overview:
      'The Industrial Minimalist Bookshelf is a four-tier open shelving unit measuring 80 x 30 x 120 cm, built from a welded matte black hollow iron frame with kiln-dried solid pine wood shelves. It weighs 8 kg, carries 40 kg total across the four tiers, has rust-resistant powder coating, and includes adjustable feet for floors that are not level. The open sides are a design decision rather than a saving: books and objects read as part of the room instead of being boxed in.',
    bestFor:
      'This suits a living room, a home office, or a bedroom corner where a full-height closed bookcase would dominate. At 30 cm deep it takes standard books, box files, and decorative objects, and at 120 cm tall it sits below eye level so it does not divide the room. It is not built for a reference library: 40 kg total across four tiers is about right for a mixed shelf of books and objects, and a solid run of hardbacks on every tier would exceed it.',
    howToUse:
      'Assemble on a flat surface and leave the fixings slightly loose until the whole frame is together, then tighten in sequence, which is what keeps a welded-frame unit square. Set the adjustable feet last, on the floor where it will actually stand, because levelling on a different surface achieves nothing. Distribute weight low: heavy books on the bottom two tiers and lighter objects above lowers the centre of gravity. In a household with children or in a seismic area, anchor the top of the unit to the wall.',
    care: 'Wipe the powder-coated iron with a damp cloth and dry it, since powder coating resists rust well but chips will corrode if left wet. Dust the pine shelves dry and avoid saturating them, as kiln-dried softwood absorbs moisture readily and can cup. Use coasters under plants and drinks for the same reason. Re-check the frame fixings after the first month and then annually, because a bolt that loosens on a welded frame lets the unit rack sideways under load.',
    compare: {
      heading: 'Open shelving against a closed bookcase',
      text: 'A closed bookcase with a back panel is more rigid, keeps dust off, and hides untidy contents, which matters if the shelf will hold paperwork rather than a curated selection. Open shelving is lighter, less visually heavy in a small room, and reachable from either side, which makes it usable as a low room divider. The structural trade is real: without a back panel the unit relies on frame rigidity and the fixings staying tight, which is why the annual check matters here and does not on a panel-backed unit.',
    },
    faqs: [
      { question: 'How much weight does it hold?', answer: 'Forty kilograms total across the four tiers. Load heavy items on the lower tiers to keep the centre of gravity low.' },
      { question: 'What are its dimensions?', answer: '80 cm wide, 30 cm deep, and 120 cm tall, weighing 8 kg. The 30 cm depth takes standard books and box files.' },
      { question: 'Does it work on an uneven floor?', answer: 'Yes, it has adjustable feet. Level it on the floor where it will actually stand rather than during assembly elsewhere.' },
    ],
  },

  'multi-purpose-storage-pouch': {
    overview:
      'The Multi-Purpose Storage Pouch is a 22 x 14 x 4 cm zippered pouch in water-resistant nylon, weighing 65 grams empty. It has one wide main compartment and an interior elastic mesh pocket, closed by a smooth full-length zipper that opens all the way so you can see the contents rather than fishing in a slot. The point of a pouch this size is portability between bags: the same kit moves from a tote to a backpack to a suitcase without repacking.',
    bestFor:
      'This suits a charger kit, a cosmetics kit, a stationery set, or a small first-aid collection, and it is at its best when it holds exactly one category. Water-resistant nylon means a spilled drink inside a bag gives you time to react before the contents are soaked. It is not sized for a laptop charger with a large brick plus multiple cables, and at 4 cm deep it will not close comfortably over anything bulky.',
    howToUse:
      'Assign it one category and keep that assignment permanent, because the benefit of a pouch system comes from knowing where something is without thinking. Put the small items that get lost, such as SD cards, adapters, and cable ties, in the interior elastic mesh pocket rather than loose in the main compartment. Open the zipper fully when packing, since a partially opened pouch encourages stuffing items in from one end and that is how a pouch that fits becomes a pouch that will not close.',
    care: 'Spot clean with a damp cloth rather than machine washing, because repeated detergent cycles strip the water-resistant coating that is the pouch\'s main protective feature. Let it dry fully open before storing, since a damp pouch closed up is how odor develops in nylon. Run the zipper gently rather than forcing it around the corners when the pouch is overfull, as a strained zipper at a corner is the most common failure point on any pouch of this construction.',
    compare: {
      heading: 'Nylon pouch or a mesh pouch',
      text: 'A mesh pouch shows you its contents without opening, which is genuinely faster at airport security and in a dark hotel room. Solid nylon shows you nothing but protects everything: it shields from a spill, from dust, and from the abrasion of other items in a packed bag. The sensible split is to use mesh for cables, chargers, and anything you identify by shape, and solid water-resistant nylon for cosmetics, liquids, medication, and small electronics. Sesoris sells both, and most people end up using them together rather than choosing one.',
    },
    faqs: [
      { question: 'What size is it?', answer: '22 x 14 x 4 cm, weighing 65 grams empty, with one main compartment and an interior elastic mesh pocket.' },
      { question: 'Is it waterproof?', answer: 'It is water resistant, not waterproof. The nylon exterior sheds a spill or light rain long enough for you to react, but it is not built to be submerged.' },
      { question: 'Can it be machine washed?', answer: 'Spot clean with a damp cloth instead. Detergent cycles strip the water-resistant coating, which is the feature most worth preserving.' },
    ],
  },

  'canvas-tote-organizer-bag': {
    overview:
      'The Canvas Tote Organizer Bag is a 40 x 35 x 15 cm tote in 100% natural cotton canvas with an extra-wide gusset for bulky loads, weighing 280 grams. Inside it has one zip pocket and two slip pockets, so keys and a phone do not sink to the bottom under everything else. The base and corners are reinforced with additional stitching, which is where a loaded tote fails first, and the whole bag is machine washable at 30 degrees Celsius.',
    bestFor:
      'This fits groceries, gym kit, a work-from-a-cafe setup, and the general category of things you carry regularly and want to be able to wash. The 60 cm handles are long enough to clear a shoulder over a winter coat, which is the practical difference between a tote you carry in your hand and one you actually wear. It has no closure at the top, so it is not the bag for a commute where you want your contents secured or covered.',
    howToUse:
      'Put keys and phone in the interior zip pocket first, so the two things you need without looking are the two things you can find. Load heavy and flat items against the back panel rather than in the middle, where they shift and make the bag swing. Use the wide gusset by packing upright rather than laying things flat, which is what turns 15 cm of depth into usable volume. It folds flat when empty, so keep one in a car door or a drawer rather than buying a bag every time you need one.',
    care: 'Machine wash at 30 degrees Celsius, inside out, on a gentle cycle. Skip the tumble dryer, because heat shrinks cotton and stresses the reinforced stitching at the corners, and reshape the bag while damp so the gusset dries square instead of creased. Store it flat and empty rather than stuffed, since permanent folds set into canvas. Treat a stain promptly rather than waiting for the next wash, as natural cotton canvas takes up oil marks quickly.',
    compare: {
      heading: 'Cotton canvas against synthetic tote fabric',
      text: 'Synthetic totes are lighter, dry faster, and shrug off rain, which makes them the better choice for wet-weather carrying. Cotton canvas is stronger in tension for a given weight, machine washable at a proper temperature rather than only wipeable, and it softens with use instead of degrading. Over several years of grocery and gym duty, the washability is what matters most: a bag that carries food and workout clothes needs to be cleaned properly, and synthetics with coatings do not survive that treatment repeatedly.',
    },
    faqs: [
      { question: 'Can I machine wash it?', answer: 'Yes, at 30 degrees Celsius. Wash inside out on a gentle cycle, air dry rather than tumble dry, and reshape while damp.' },
      { question: 'Does it have pockets?', answer: 'One interior zip pocket and two slip pockets, plus reinforced base and corner stitching where a loaded tote normally fails.' },
      { question: 'How long are the handles?', answer: 'Sixty centimetres, which is long enough to carry over a shoulder with a coat on rather than only in the hand.' },
    ],
  },

  'travel-toiletry-bag': {
    overview:
      'The Travel Toiletry Bag is a hanging organizer in nylon Oxford with a waterproof EVA-lined main compartment, measuring 28 x 20 x 10 cm open and rolling down to 20 x 11 x 6 cm for packing. It weighs 180 grams and has three main compartments plus a front quick-access pocket, with clear PVC inner panels so you can see bottles without opening every section. A stainless steel hook rated to 3 kg lets a full bag hang from a hotel door or towel bar.',
    bestFor:
      'This suits hotel stays and any bathroom where counter space is scarce or shared, which describes most travel. Hanging the bag rather than unpacking it is the entire workflow advantage: nothing gets left behind because nothing came out. Elastic loops hold bottles upright instead of letting them roll, which is the ordinary cause of a leak. It is more bag than a one-night trip needs, and for that the mesh pouches are the lighter answer.',
    howToUse:
      'Pack it last and on top of your case, since it is the first thing you want on arrival and the worst thing to have buried. Put anything that can leak into the EVA-lined main compartment rather than the front pocket, and close every cap firmly, because a lining contains a leak rather than preventing one. Hang it before you unpack anything else, and use the front quick-access pocket for the two or three items you reach for repeatedly so you are not opening the main panels each time.',
    care: 'Wipe the EVA lining dry before rolling the bag up, because a damp lining rolled and stored is the standard route to odor in a toiletry bag. Clean the clear PVC panels with a soft damp cloth only, since PVC clouds permanently when scrubbed or cleaned with solvent. Air the bag fully open after each trip rather than putting it straight into a cupboard rolled. Check the stainless hook and the elastic loops occasionally, as stretched loops stop holding bottles upright.',
    compare: {
      heading: 'Hanging bag or a flat toiletry case',
      text: 'A flat case packs more efficiently into a suitcase and is quicker to grab for a single overnight stay. A hanging bag costs a little more packed volume and repays it on arrival: it gets everything off a wet hotel counter, keeps items visible without unpacking, and means nothing is left behind in a bathroom at checkout. If you travel for several nights, or share a bathroom, the hanging design wins. For one night out of a backpack, a flat case or a single mesh pouch is the lighter and simpler answer.',
    },
    faqs: [
      { question: 'How big is it packed?', answer: 'It rolls to 20 x 11 x 6 cm and weighs 180 grams. Opened out it is 28 x 20 x 10 cm across three main compartments plus a front pocket.' },
      { question: 'Is it leak proof?', answer: 'The main compartment is EVA lined and waterproof, so it contains a leak. It does not prevent one, so close bottle caps firmly and use the elastic loops to keep bottles upright.' },
      { question: 'How much weight can the hook take?', answer: 'The stainless steel hook is rated to 3 kg, which covers a fully loaded bag hanging from a door or a towel bar.' },
    ],
  },

  'mesh-zipper-pouches-set': {
    overview:
      'The Mesh Zipper Pouches Set is six pouches in three sizes: two large at 20 x 14 cm, two medium at 16 x 11 cm, and two small at 12 x 8 cm. Each has a transparent mesh front over a solid nylon back, a full-length nylon zipper, reinforced seams and zipper ends, and a loop at the zipper pull for retrieving it from a packed bag. Each pouch weighs between 20 and 40 grams, so a full set adds almost nothing to a bag.',
    bestFor:
      'These suit anyone who packs cables, stationery, cosmetics, and travel accessories into the same bag and then cannot find any of them. The mesh front is the whole point: you identify contents without opening anything, which matters at airport security and in a dark hotel room. They are not for liquids, since mesh offers no containment at all, and not for anything sharp that could catch the mesh from inside.',
    howToUse:
      'Assign each size a fixed job and keep it: small for adapters, SD cards, and medication; medium for cables and chargers; large for stationery, cosmetics, or a first-aid kit. Keeping the assignment stable across trips is what removes the search entirely. Leave one pouch empty for the receipts, tickets, and small objects a trip generates, which otherwise end up loose. Use the zipper pull loop to hook a pouch to a bag\'s interior clip so the one you need most is not at the bottom.',
    care: 'Hand wash in cool water and air dry, since mesh distorts in a machine and hot air shrinks the nylon backing. Do not force the zipper around the corners when a pouch is overfull, because reinforced zipper ends resist strain but do not make it harmless. Store them nested by size rather than flat and separate, so they stay together and take almost no room. A snagged mesh thread should be trimmed rather than pulled, since pulling propagates the run across the panel.',
    compare: {
      heading: 'Mesh pouches against packing cubes',
      text: 'Packing cubes are built for clothing: they compress a folded stack and hold its shape inside a suitcase. Mesh pouches are built for small objects, where the problem is not volume but finding a specific item. Using cubes for cables means opening each one to check, and using mesh pouches for shirts means no compression at all. They complement rather than compete, and most people who travel with a system end up with cubes for garments and a mesh set for everything that plugs in, unscrews, or costs money to replace.',
    },
    faqs: [
      { question: 'How many pouches are in the set?', answer: 'Six: two large at 20 x 14 cm, two medium at 16 x 11 cm, and two small at 12 x 8 cm, weighing 20 to 40 grams each.' },
      { question: 'Can they hold liquids?', answer: 'No. Mesh provides no containment, so liquids belong in the EVA-lined toiletry bag or the water-resistant nylon storage pouch instead.' },
      { question: 'Are they carry-on friendly?', answer: 'Yes, and the mesh front is the reason: security staff and you can see the contents without opening each pouch.' },
    ],
  },

  'hanging-travel-organizer': {
    overview:
      'The Hanging Travel Organizer has 12 compartments across three panels, unfolding to 35 x 120 cm and folding to 35 x 25 x 4 cm for packing. It is made from 600D polyester with a wipe-clean laminated lining, weighs 420 grams, and hangs from a chromed steel hanger rated to 5 kg. Reinforced stress points and stitching carry the load, which matters because this is a product that supports its own contents from a single rail rather than resting on a shelf.',
    bestFor:
      'This suits a hotel stay of several nights where a closet exists but drawers do not, and it also works permanently in a home wardrobe for accessories and folded items. Twelve compartments make it a full unpacking solution rather than a pouch: shirts, underwear, documents, and accessories each get a visible slot. It is more organizer than a two-night trip justifies, and its 4 cm folded thickness does take real space in a carry-on.',
    howToUse:
      'Hang it before unpacking anything else, then load from the bottom compartments upward so the weight settles evenly and the panels hang straight. Keep documents and anything you must not forget in the top compartment at eye level, since the bottom panel is the one people overlook at checkout. When packing to leave, work top to bottom and check every compartment, because a 12-compartment organizer is exactly the kind of item that leaves a sock behind in a hotel closet.',
    care: 'Wipe the laminated lining with a damp cloth and let it dry fully open before folding, since folding a damp laminated lining is the usual cause of a musty organizer. Do not exceed the hanger\'s 5 kg rating, and check the hanger hook and the stitched attachment points periodically, as those carry the entire load. Fold along the existing creases rather than inventing new ones, which keeps the panels flat and stops the laminate cracking along a repeated random fold.',
    compare: {
      heading: 'Hanging organizer or packing cubes',
      text: 'Packing cubes protect your suitcase\'s internal order and are the better choice when you never fully unpack, such as a trip with a new hotel every night. A hanging organizer targets the opposite case: you arrive, hang one item, and your clothes are in a wardrobe rather than in a case on the floor for three days. It also gives you vertical storage where a hotel has provided none. The cost is 4 cm of packed thickness and 420 grams, which is the fair price for turning a suitcase into a chest of drawers on arrival.',
    },
    faqs: [
      { question: 'How many compartments does it have?', answer: 'Twelve, across three panels. Unfolded it measures 35 x 120 cm and it folds down to 35 x 25 x 4 cm.' },
      { question: 'How much weight can it hold?', answer: 'The chromed steel hanger is rated to 5 kg, which covers clothing, documents, and accessories. It is not meant for books or heavy gear.' },
      { question: 'Does it work in a home closet?', answer: 'Yes. Many people keep it permanently on a wardrobe rail for accessories and folded items rather than only using it for travel.' },
    ],
  },

  'gym-drawstring-bag': {
    overview:
      'The Gym Drawstring Bag is a 15 litre bag in 210D ripstop nylon with a tarpaulin-reinforced base, weighing 110 grams and measuring roughly 45 x 35 cm. It has a dual-cord drawstring closure, an interior slip pocket for a phone and valuables, and a reflective strip for low-light visibility. The reinforced base is the specification worth noting, because the base is where a drawstring bag wears through first when it is set down on rough ground.',
    bestFor:
      'This suits the gym, school, a day out, and use as a packable spare inside a larger bag, since at 110 grams it costs nothing to carry unused. Ripstop weave means a small puncture stays small rather than running into a tear. It is not a hiking pack: drawstring cords carry the load on two narrow lines across the shoulders, which is comfortable for a light kit over a short distance and uncomfortable for a heavy load over a long one.',
    howToUse:
      'Put your phone and keys in the interior slip pocket rather than the main compartment, since a drawstring closure is not secure and the main compartment gapes when the cords loosen. Pack soft items against your back and hard items outward for comfort. Pull both cords evenly to close, because pulling one first is what causes a cord to jam at the corner grommet. Keep the reflective strip facing outward if you are walking or cycling near traffic after dark.',
    care: 'Rinse and air dry the bag if it has carried damp gym kit, because nylon holds odor from sweat rather than releasing it. Hand wash rather than machine wash so the cords do not tangle around the drum and stress the grommets. Dry it fully before packing it flat, and if a cord frays at the end, seal the end with a brief touch of heat rather than letting it unravel through the channel, which is the failure that ends most drawstring bags.',
    compare: {
      heading: 'Drawstring bag or a backpack for the gym',
      text: 'A backpack has padded straps, a structured back panel, and a zip closure, all of which matter if you carry a heavy or valuable load daily. A drawstring bag has none of those and weighs 110 grams instead of several hundred grams, packs flat inside another bag, and dries out quickly after carrying damp kit. For a change of clothes, shoes, and a bottle over a short walk, the drawstring bag is the right tool and the backpack is overkill. For a laptop or a long commute, the reverse holds.',
    },
    faqs: [
      { question: 'How much does it hold?', answer: 'Fifteen litres, which covers a change of clothes, shoes, and a bottle. It measures roughly 45 x 35 cm and weighs 110 grams empty.' },
      { question: 'Is there a pocket for a phone?', answer: 'Yes, an interior slip pocket. Use it rather than the main compartment, since a drawstring closure is not secure.' },
      { question: 'Will the base wear through?', answer: 'The base is tarpaulin reinforced for exactly that reason, since it is the first point of wear on a drawstring bag that gets set down on rough ground.' },
    ],
  },
};

export function getProductGuide(slug: string): ProductGuide | undefined {
  return productGuides[slug];
}
