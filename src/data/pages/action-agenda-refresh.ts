// action-agenda-refresh.ts — REAL content for the 2026–2030 Action Agenda
// Explorer (https://actionagenda.pugetsoundinfo.wa.gov/2026-2030), scraped
// 2026-07-17. Replaces the invented STRATEGIES/AA_TOPICS in psinfo-domain.ts
// for this page. Every string below is verbatim or a verbatim excerpt (see
// field-level comments) from the live ASP.NET site — nothing paraphrased or
// invented.
//
// STRUCTURE FOUND ON THE REAL SITE (differs from the old invented model):
//   Topic (26, in 5 categories) → Strategy (110, coded e.g. "01.01") → Action
//   (722, coded e.g. "01.01.01" — title text not captured here, counts only).
//   Commitments (455) are a SEPARATE flat list per Topic — {organization,
//   description, status}, NOT tied to an individual Strategy. Only two real
//   statuses appear across all 455 rows: "Not reported" (433) and "Data
//   Pending" (22) — there is no on-track/declining scale like the invented
//   IndicatorStatus, and no per-Strategy "owner"/lead (only commitments carry
//   an organization).
export interface ActionAgendaStrategy {
  code: string;
  name: string;
}

export interface ActionAgendaVitalSign {
  id: string;
  name: string;
}

export interface ActionAgendaTopic {
  id: string;
  number: string;
  title: string;
  category: string;
  /** public/ path of the topic cover photo */
  image: string;
  /** real Action Agenda Explorer URL for this topic's Overview tab */
  href: string;
  strategiesCount: number;
  actionsCount: number;
  commitmentsCount: number;
  /** first sentence of the topic's real Overview paragraph */
  blurb: string;
  /** full first paragraph of the topic's real Overview tab, verbatim */
  overview: string;
  /** real Strategy codes + titles (Action-level text not captured) */
  strategies: ActionAgendaStrategy[];
  /** Vital Signs this topic links to (empty for Foundations-of-Recovery topics) */
  vitalSigns: ActionAgendaVitalSign[];
}

export interface ActionAgendaCategory {
  name: string;
  topicIds: string[];
}

export interface ProgressMeasure {
  label: string;
  detail: string;
  href?: string;
  internalRoute?: string;
}

// ── Page framing (2026–2030 Action Agenda Explorer) ────────────────────────
export const PAGE_EYEBROW = "Action Agenda 2026–2030";
export const PAGE_TITLE = "Topics in the Action Agenda";
export const PAGE_LEDE = "The Action Agenda is the Puget Sound region’s shared plan for restoring and protecting Puget Sound.";

export const INTRO_PARAGRAPHS: string[] = [
  "The Action Agenda Topics are the building blocks of Puget Sound recovery, highlighting priority areas where partners across the region are already making progress—bringing expertise, innovation, and community leadership to the work. But much more remains to be done.",
  "Each Topic outlines the essential Strategies and Actions needed to restore the health of Puget Sound, from long‑range approaches that guide regional direction (Strategies) to near‑term steps that drive immediate impact (Actions). The Actions help steer implementation, inspire new solutions, and focus public and private investment on the work that matters most right now.",
  "Together, the Topics in the Action Agenda chart a clear path where sustained commitment and coordinated action turn our work into a legacy of lasting Puget Sound recovery.",
];

// ── How the Action Agenda is organized (from the real /2026-2030/About page) ─
export const ORGANIZATION_INTRO = "The Action Agenda is structured so that its Topics work together to guide Puget Sound recovery.";

export const FOUNDATIONS_OF_RECOVERY = {
  label: "Foundations of Puget Sound Recovery",
  body: "The Foundations of Puget Sound Recovery Topics focus on the essential work that makes recovery possible. They include securing funding, conducting research and monitoring, strengthening leadership, supporting local partnerships, and growing a skilled green workforce. These foundational strategies apply across all Topics in the Recovery Plan—they are the backbone of the entire effort.",
};

export const RECOVERY_PLAN = {
  label: "The Recovery Plan",
  body: "The Topics in the Recovery Plan outline the specific Actions partners can take to advance Puget Sound recovery on-the-ground. Actions are organized in Topics within four themes: Healthy Communities, Sustainable Land Use, Resilient Habitat, and Clean Water and Harvestable Shellfish. Within each Topic, Strategies and Actions describe work that can be carried out across the landscape—from rivers and forests to cities and shorelines. Together, these Actions support progress toward the region’s statutory recovery goals.",
  // NOTE: the About page spells this theme singular ("Resilient Habitat"); the
  // site's own category badges/nav use the plural "Resilient Habitats". Both
  // are reproduced verbatim from their real sources — not harmonized here.
  themes: ["Healthy Communities", "Sustainable Land Use", "Resilient Habitat", "Clean Water and Harvestable Shellfish"],
};

// ── How progress is measured (from the real /2026-2030/About page) ─────────
export const PROGRESS_MEASURES_INTRO = "Progress implementing the Action Agenda is assessed for each Topic using:";
export const PROGRESS_MEASURES: ProgressMeasure[] = [
  { label: "Puget Sound Vital Signs", detail: "Indicators of ecosystem health and human wellbeing that show how the Sound is doing over time. Each statutory recovery goal is represented by one or more Vital Signs, such as marine water quality or economic vitality.", href: "https://vitalsigns.pugetsoundinfo.wa.gov/", internalRoute: "/prototypes/vital-signs" },
  { label: "Puget Sound Progress Indicators", detail: "Indicators that track human activities that influence ecosystem conditions, helping us understand whether our actions are moving recovery efforts in the right direction.", href: "https://progressindicators.pugetsoundinfo.wa.gov/" },
  { label: "Commitments", detail: "Specific, measurable activities that partners pledge to complete using the SMART framework. Commitments highlight leadership and demonstrate concrete steps being taken to implement the 2026–2030 Action Agenda and related salmon recovery plans." },
];

// ── The Action Agenda Explorer, described (from the real landing page) ─────
export const EXPLORER_DESCRIPTION = "The Action Agenda Explorer is the companion digital tool that keeps the Action Agenda dynamic and our reporting up to date. It profiles each of the 26 Topics in the 2026–2030 Action Agenda, offering a digital plan overview in the Overview tab, locally developed priorities in Local Action Plans (when available), current implementation activities in the Implementation tab, and results from our efforts in the Progress tab. The Explorer makes it easy and interactive to see how work is unfolding across the region and how partners are advancing Puget Sound recovery.";
export const EXPLORER_CTA = {
  label: "Read more about the Action Agenda Explorer",
  href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/About",
};

// ── Footer credit (verbatim from the real site footer) ──────────────────────
export const FOOTER = {
  managedBy: { label: "Puget Sound Partnership", href: "https://www.psp.wa.gov/" },
  contactEmail: "action.agenda@psp.wa.gov",
  accessibilityHref: "https://www.psp.wa.gov/accessibility.php",
  hosting: { label: "Environmental Science Associates", href: "https://esassoc.com/services/technology/" },
  legalHref: "https://www.pugetsoundinfo.wa.gov/Legal",
};
export const TOPICS: ActionAgendaTopic[] = [
  {
    id: "01",
    number: "Topic 01",
    title: "Abundant and Harvestable Salmon",
    category: "Healthy Communities",
    image: "/photos/action-agenda-refresh/topic-01.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/01/Overview",
    strategiesCount: 5,
    actionsCount: 22,
    commitmentsCount: 12,
    blurb: "Thriving salmon are essential to Puget Sound residents’ sense of place and cultural wellbeing.",
    overview: "Thriving salmon are essential to Puget Sound residents’ sense of place and cultural wellbeing. This is especially true for Tribal members and their treaty and sovereign rights. Washingtonians across Puget Sound enjoy fishing for and eating Pacific salmon. Many communities and individuals also have deep cultural or recreational ties to salmon fishing, which fosters connection to their community and home. Recreational, commercial, and Tribal salmon fisheries also significantly contribute to the state and local economies. These fisheries are particularly important in many rural communities in Western Washington.",
    strategies: [
      { code: "01.01", name: "Account for changes in the environment and emerging data when adaptively co-managing salmon hatcheries and fisheries." },
      { code: "01.02", name: "Reduce displacement, competition, and predation of salmon and their prey caused by native or invasive species." },
      { code: "01.03", name: "Ensure abundant, harvestable salmon and steelhead populations through an ecosystem-based approach to hatchery management." },
      { code: "01.04", name: "Sustainably harvest natural- and hatchery-origin salmon while supporting treaty-reserved fishing rights, Tribal fisheries, and recreational and commercial fishing opportunities." },
      { code: "01.05", name: "Promote accurate and timely data for salmon harvest monitoring and reporting to improve in-season management of fisheries." },
    ],
    vitalSigns: [
      { id: "21", name: "Cultural Wellbeing" },
      { id: "4", name: "Local Foods" },
      { id: "19", name: "Orcas" },
      { id: "6", name: "Outdoor Activity" },
      { id: "32", name: "Salmon" },
    ],
  },
  {
    id: "02",
    number: "Topic 02",
    title: "Human Health",
    category: "Healthy Communities",
    image: "/photos/action-agenda-refresh/topic-02.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/02/Overview",
    strategiesCount: 5,
    actionsCount: 28,
    commitmentsCount: 4,
    blurb: "Spending time in nature can offer significant physical, mental, and emotional health benefits.",
    overview: "Spending time in nature can offer significant physical, mental, and emotional health benefits. However, when Puget Sound’s water and air are polluted, people can get sick. We can be exposed to harmful substances by drinking or swimming in contaminated water, eating local foods such as fish and shellfish, and breathing polluted air from vehicles, industry, and wildfire smoke. These exposures can cause serious health problems and often disproportionately affect low-income communities and people already vulnerable to health problems.",
    strategies: [
      { code: "02.01", name: "Protect and prevent people from consuming locally harvested contaminated fish and shellfish." },
      { code: "02.02", name: "Limit people’s recreation exposures to harmful air pathogens and biotoxins in fresh and marine waters." },
      { code: "02.03", name: "Limit people’s exposures to harmful air pollution." },
      { code: "02.04", name: "Protect drinking water from contamination." },
      { code: "02.05", name: "Conduct integrated, co-produced community-based planning to address needs and inform solutions for future ecological conditions, pollution, and human health." },
    ],
    vitalSigns: [
      { id: "2", name: "Air Quality" },
      { id: "21", name: "Cultural Wellbeing" },
      { id: "3", name: "Drinking Water" },
      { id: "4", name: "Local Foods" },
      { id: "6", name: "Outdoor Activity" },
      { id: "7", name: "Shellfish Beds" },
      { id: "28", name: "Toxics in Aquatic Life" },
    ],
  },
  {
    id: "03",
    number: "Topic 03",
    title: "Toxic Chemical Prevention",
    category: "Healthy Communities",
    image: "/photos/action-agenda-refresh/topic-03.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/03/Overview",
    strategiesCount: 8,
    actionsCount: 36,
    commitmentsCount: 18,
    blurb: "Every day, people and wildlife in the Puget Sound region are exposed to thousands of toxic chemicals.",
    overview: "Every day, people and wildlife in the Puget Sound region are exposed to thousands of toxic chemicals. These can come from a wide range of human activities, both past and present, and raise serious public health concerns. Toxic chemicals are found in many everyday products, such as:",
    strategies: [
      { code: "03.01", name: "Expand our knowledge on the range and magnitude of CECs to identify new human and ecosystem health hazards." },
      { code: "03.02", name: "Inventory and prioritize areas, sources, and risks of suspected or emerging toxic contamination from stormwater or wastewater pathways with significant impacts to the environment, aquatic species, or human health and improve access to that information." },
      { code: "03.03", name: "Reduce and replace priority toxic chemicals in products with safer alternatives." },
      { code: "03.04", name: "Support effectiveness research and stormwater and wastewater treatment actions in priority areas to reduce or eliminate toxic loads to fresh and marine waters." },
      { code: "03.05", name: "Implement regulatory requirements and non-regulatory tools to reduce or eliminate sources of priority toxic chemicals." },
      { code: "03.06", name: "Increase compliance with consumer and environmental regulations for priority toxic chemicals." },
      { code: "03.07", name: "Engage with and assist upland landowners, Tribes, and impacted communities to holistically address toxic contamination in priority areas." },
      { code: "03.08", name: "Inform, support, and engage communities to lower the risk of human exposure and health impacts from toxic chemicals." },
    ],
    vitalSigns: [
      { id: "2", name: "Air Quality" },
      { id: "33", name: "Forage Fish" },
      { id: "34", name: "Groundfish and Benthic Invertebrates" },
      { id: "4", name: "Local Foods" },
      { id: "27", name: "Marine Water" },
      { id: "6", name: "Outdoor Activity" },
      { id: "32", name: "Salmon" },
      { id: "28", name: "Toxics in Aquatic Life" },
    ],
  },
  {
    id: "04",
    number: "Topic 04",
    title: "Shared Landscapes",
    category: "Healthy Communities",
    image: "/photos/action-agenda-refresh/topic-04.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/04/Overview",
    strategiesCount: 5,
    actionsCount: 32,
    commitmentsCount: 2,
    blurb: "Spending time outdoors, for both recreational and cultural purposes, benefits people in many ways.",
    overview: "Spending time outdoors, for both recreational and cultural purposes, benefits people in many ways. Activities like hiking, harvesting shellfish, fishing, or gathering in parks support physical health, mental wellbeing, and cultural expression. These experiences also help people build a deeper attachment to nature and the Puget Sound ecosystem.",
    strategies: [
      { code: "04.01", name: "Expand equitable, safe, and inclusive access to parks, green spaces, and natural areas across Puget Sound. Address transportation, safety, and other barriers to accessing these areas, especially for low-income communities and those with limited access and resources." },
      { code: "04.02", name: "Create more accessible green spaces and multi-use outdoor areas, particularly in communities with limited access to outdoor recreation." },
      { code: "04.03", name: "Develop co-management plans and regulations that reduce or limit the impact of recreation on ecologically sensitive, culturally important, or Treaty-protected resources." },
      { code: "04.04", name: "Engage with communities to identify, enhance, and expand opportunities for local, non-commercial access to and cultivation of food." },
      { code: "04.05", name: "Engage with outdoor recreation communities and tourists to promote responsible and safe recreation practices and provide education on the impact recreation can have on the ecosystem and Tribes’ treaty and sovereign rights." },
    ],
    vitalSigns: [
      { id: "21", name: "Cultural Wellbeing" },
      { id: "4", name: "Local Foods" },
      { id: "6", name: "Outdoor Activity" },
      { id: "24", name: "Sense of Place" },
      { id: "25", name: "Sound Stewardship" },
    ],
  },
  {
    id: "05",
    number: "Topic 05",
    title: "Smart Growth",
    category: "Sustainable Land Use",
    image: "/photos/action-agenda-refresh/topic-05.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Overview",
    strategiesCount: 4,
    actionsCount: 36,
    commitmentsCount: 73,
    blurb: "Forested lands and agricultural areas, along with natural areas, play a significant role in keeping Puget Sound healthy.",
    overview: "Forested lands and agricultural areas, along with natural areas, play a significant role in keeping Puget Sound healthy. These lands absorb water, support wildlife, and provide food, jobs, and places for people to connect with nature. They also serve as scenic backdrops and shape our communities’ sense of place and identity.",
    strategies: [
      { code: "05.01", name: "Improve the Growth Management Act (GMA) and local land use planning to effectively channel growth and prevent conversion of ecologically important lands." },
      { code: "05.02", name: "Build Puget Sound-wide support to prevent conversion of forests, farms, shorelines, and natural areas and increase funding for protection incentives." },
      { code: "05.03", name: "Increase demand for and reduce barriers to infill and redevelopment in high-growth areas." },
      { code: "05.04", name: "Conduct watershed-scale and land use planning to protect and restore water quality and habitat." },
    ],
    vitalSigns: [
      { id: "31", name: "Beaches and Marine Vegetation" },
      { id: "13", name: "Estuaries" },
      { id: "30", name: "Forests and Wetlands" },
      { id: "24", name: "Sense of Place" },
      { id: "29", name: "Streams and Floodplains" },
    ],
  },
  {
    id: "06",
    number: "Topic 06",
    title: "Agricultural Land Protection",
    category: "Sustainable Land Use",
    image: "/photos/action-agenda-refresh/topic-06.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/06/Overview",
    strategiesCount: 3,
    actionsCount: 20,
    commitmentsCount: 4,
    blurb: "Agricultural lands provide habitats that support animals like deer, elk, birds, and salmon.",
    overview: "Agricultural lands provide habitats that support animals like deer, elk, birds, and salmon. These lands also contribute to the region’s economy, local foods, community identity, and our sense of place.",
    strategies: [
      { code: "06.01", name: "Support landowners for the long-term viability and sustainability of agricultural lands to prevent loss of farmland to development." },
      { code: "06.02", name: "Support the expansion of market mechanisms to increase long-term viability and reduce conversion pressure for agricultural lands." },
      { code: "06.03", name: "Reduce regulatory and economic barriers to viable agriculture in Puget Sound." },
    ],
    vitalSigns: [
      { id: "22", name: "Economic Vitality" },
      { id: "4", name: "Local Foods" },
      { id: "24", name: "Sense of Place" },
    ],
  },
  {
    id: "07",
    number: "Topic 07",
    title: "Working Forest Land Protection",
    category: "Sustainable Land Use",
    image: "/photos/action-agenda-refresh/topic-07.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/07/Overview",
    strategiesCount: 3,
    actionsCount: 19,
    commitmentsCount: 13,
    blurb: "Working forests provide habitat for animals like deer, elk, birds, and salmon.",
    overview: "Working forests provide habitat for animals like deer, elk, birds, and salmon. Working forests are also key to filtering and storing water and connecting lowland wildlife habitat to the Olympic and Cascade mountains.",
    strategies: [
      { code: "07.01", name: "Support the long-term viability and sustainability of working forests to reduce pressure for conversion to a more developed use." },
      { code: "07.02", name: "Increase the overall acreage and resilience of working forestland in the puget sound basin to respond to warmer summers, warmer winters, warmer stream temperatures, and increasing drought." },
      { code: "07.03", name: "Expand market mechanisms to increase long-term viability and reduce conversion pressure for working forests." },
    ],
    vitalSigns: [
      { id: "17", name: "Birds" },
      { id: "3", name: "Drinking Water" },
      { id: "22", name: "Economic Vitality" },
      { id: "30", name: "Forests and Wetlands" },
      { id: "26", name: "Freshwater" },
      { id: "6", name: "Outdoor Activity" },
    ],
  },
  {
    id: "08",
    number: "Topic 08",
    title: "Marine Vegetation",
    category: "Resilient Habitats",
    image: "/photos/action-agenda-refresh/topic-08.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/08/Overview",
    strategiesCount: 5,
    actionsCount: 27,
    commitmentsCount: 3,
    blurb: "Marine vegetation, including kelp forests and seagrass meadows, is vital to the health of Puget Sound and the Salish Sea.",
    overview: "Marine vegetation, including kelp forests and seagrass meadows, is vital to the health of Puget Sound and the Salish Sea. Across Puget Sound, numerous species of kelp and seagrass provide complex habitat for marine invertebrates, forage fish, rockfish, salmon, Southern Resident orcas, and other species that are part of the food web.",
    strategies: [
      { code: "08.01", name: "Implement targeted research and monitoring initiatives to understand changes in marine vegetation, with consideration of ecological and community benefits." },
      { code: "08.02", name: "Evaluate and improve implementation of existing shoreline, nearshore, water quality, and land use regulations, programs, and policies to enhance protections for marine vegetation." },
      { code: "08.03", name: "Protect marine vegetation in existing and new reserves, refuges, and protected areas that respect Tribal treaty and sovereign rights." },
      { code: "08.04", name: "Use effective restoration methods to accelerate recolonization and expansion of marine vegetation at sites shown to possess suitable ecological and sociocultural conditions." },
      { code: "08.05", name: "Expand and promote responsible stewardship, local food harvest, and outdoor recreation to strengthen community connections with marine vegetationand support human health and quality of life while upholding and honoring tribal treaty and sovereign rights." },
    ],
    vitalSigns: [
      { id: "31", name: "Beaches and Marine Vegetation" },
      { id: "21", name: "Cultural Wellbeing" },
      { id: "33", name: "Forage Fish" },
      { id: "34", name: "Groundfish and Benthic Invertebrates" },
      { id: "4", name: "Local Foods" },
      { id: "6", name: "Outdoor Activity" },
      { id: "32", name: "Salmon" },
      { id: "25", name: "Sound Stewardship" },
    ],
  },
  {
    id: "09",
    number: "Topic 09",
    title: "Healthy Shorelines",
    category: "Resilient Habitats",
    image: "/photos/action-agenda-refresh/topic-09.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/09/Overview",
    strategiesCount: 5,
    actionsCount: 51,
    commitmentsCount: 48,
    blurb: "Shorelines are a vital part of life in the Puget Sound region.",
    overview: "Shorelines are a vital part of life in the Puget Sound region. They provide important habitat for fish and wildlife, and support local food harvest, outdoor recreation, cultural practices, and floodplain protection. They are where people live, recreate, and connect with nature.",
    strategies: [
      { code: "09.01", name: "Increase and improve shoreline regulation implementation, compliance, enforcement, and communication to protect existing intact nearshore habitat and reduce hard armor." },
      { code: "09.02", name: "Expand and improve incentives and education for residential property owners to motivate voluntary actions for healthy shorelines." },
      { code: "09.03", name: "Improve long-term strategic planning to reduce shoreline armoring, increase coastal resilience, and improve appropriate public access to restored shorelines." },
      { code: "09.04", name: "Increase and improve coastal process-based design and technical training to improve the region’s capacity to implement restoration projects." },
      { code: "09.05", name: "Implement restoration and protection to improve beach processes, structure, and function identified through strategic planning at multiple geographic scales." },
    ],
    vitalSigns: [
      { id: "31", name: "Beaches and Marine Vegetation" },
      { id: "13", name: "Estuaries" },
      { id: "33", name: "Forage Fish" },
      { id: "32", name: "Salmon" },
      { id: "25", name: "Sound Stewardship" },
    ],
  },
  {
    id: "10",
    number: "Topic 10",
    title: "Floodplains and Estuaries",
    category: "Resilient Habitats",
    image: "/photos/action-agenda-refresh/topic-10.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/10/Overview",
    strategiesCount: 5,
    actionsCount: 42,
    commitmentsCount: 44,
    blurb: "Floodplains and estuaries are where rivers meet the land and sea.",
    overview: "Floodplains and estuaries are where rivers meet the land and sea. They connect freshwater, marine, and terrestrial ecosystems, creating a diverse landscape that provides critical habitat for the health, growth, and survival of Pacific salmon and steelhead.",
    strategies: [
      { code: "10.01", name: "Increase and accelerate implementation of habitat acquisition and restoration projects as prioritized in watershed salmon recovery plans." },
      { code: "10.02", name: "Incorporate the economic risks and costs of development into land use planning in floodplain and estuary habitats." },
      { code: "10.03", name: "Maintain and expand a regional framework to build public and political support, develop partnerships, secure funding, simplify permits, and monitor progress to improve outcomes for fish populations, reduce flood risk, and support agricultural viability (fish, flood, farm)." },
      { code: "10.04", name: "Prioritize, design, and implement reach-scale restoration and protection projects within a river basin, watershed, and/or estuary." },
      { code: "10.05", name: "Expand floodplain and estuary habitat protection through regulations and incentives." },
    ],
    vitalSigns: [
      { id: "17", name: "Birds" },
      { id: "13", name: "Estuaries" },
      { id: "26", name: "Freshwater" },
      { id: "34", name: "Groundfish and Benthic Invertebrates" },
      { id: "32", name: "Salmon" },
      { id: "29", name: "Streams and Floodplains" },
    ],
  },
  {
    id: "11",
    number: "Topic 11",
    title: "Riparian Areas",
    category: "Resilient Habitats",
    image: "/photos/action-agenda-refresh/topic-11.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/11/Overview",
    strategiesCount: 4,
    actionsCount: 26,
    commitmentsCount: 29,
    blurb: "Over the decades, land development and tree clearing have significantly damaged riparian vegetation along rivers and streams in Puget Sound.",
    overview: "Over the decades, land development and tree clearing have significantly damaged riparian vegetation along rivers and streams in Puget Sound. These areas, known as riparian corridors, are critical for keeping water clean and cool, controlling erosion, preventing flooding, and offering key habitats for wildlife, including salmon.",
    strategies: [
      { code: "11.01", name: "Increase coordination and capacity to improve effectiveness of integrated riparian programs across Puget Sound." },
      { code: "11.02", name: "Increase local community engagement with riparian restoration through programs that support voluntary conservation." },
      { code: "11.03", name: "Build long-term community stewardship mechanisms, increase resilience, and improve adaptive management of riparian areas." },
      { code: "11.04", name: "Establish and implement science-based regulatory programs." },
    ],
    vitalSigns: [
      { id: "31", name: "Beaches and Marine Vegetation" },
      { id: "30", name: "Forests and Wetlands" },
      { id: "26", name: "Freshwater" },
      { id: "32", name: "Salmon" },
      { id: "29", name: "Streams and Floodplains" },
    ],
  },
  {
    id: "12",
    number: "Topic 12",
    title: "Freshwater Availability",
    category: "Resilient Habitats",
    image: "/photos/action-agenda-refresh/topic-12.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/12/Overview",
    strategiesCount: 4,
    actionsCount: 23,
    commitmentsCount: 26,
    blurb: "Freshwater is essential to life in Puget Sound for people, fish, and wildlife.",
    overview: "Freshwater is essential to life in Puget Sound for people, fish, and wildlife. Rivers and streams carry water, wood, sediment, organic matter, and nutrients that support freshwater and estuary ecosystems. Healthy river systems also provide drinking water and outdoor recreation and support local food harvest and agriculture.",
    strategies: [
      { code: "12.01", name: "Develop and expand water education and voluntary conservation programs." },
      { code: "12.02", name: "Increase local government actions and regulatory compliance to address water quantity." },
      { code: "12.03", name: "Understand and plan for all future water needs in the context of population growth and potential future ecological or environmental conditions." },
      { code: "12.04", name: "Ensure human communities have access to sufficient water resources, including drinking water that meets required standards." },
    ],
    vitalSigns: [
      { id: "3", name: "Drinking Water" },
      { id: "26", name: "Freshwater" },
      { id: "32", name: "Salmon" },
      { id: "29", name: "Streams and Floodplains" },
    ],
  },
  {
    id: "13",
    number: "Topic 13",
    title: "Fish Passage Barriers",
    category: "Resilient Habitats",
    image: "/photos/action-agenda-refresh/topic-13.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/13/Overview",
    strategiesCount: 2,
    actionsCount: 18,
    commitmentsCount: 5,
    blurb: "Salmon and steelhead need connected habitat to survive.",
    overview: "Salmon and steelhead need connected habitat to survive. Across Washington, thousands of miles of fish habitat, such as rivers and streams have been cut off by roads, culverts, dams, tide gates, bridges, and other human infrastructure. These barriers block adult salmon from reaching spawning grounds and stop juvenile salmon from swimming to sea.",
    strategies: [
      { code: "13.01", name: "Inventory, assess, and prioritize fish passage barriers (culverts, dams, bridges, causeways) for removal and mitigation." },
      { code: "13.02", name: "Fund, implement, and monitor fish passage barrier correction or removal in watersheds." },
    ],
    vitalSigns: [
      { id: "31", name: "Beaches and Marine Vegetation" },
      { id: "13", name: "Estuaries" },
      { id: "32", name: "Salmon" },
      { id: "29", name: "Streams and Floodplains" },
    ],
  },
  {
    id: "14",
    number: "Topic 14",
    title: "Invasive Species",
    category: "Resilient Habitats",
    image: "/photos/action-agenda-refresh/topic-14.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/14/Overview",
    strategiesCount: 2,
    actionsCount: 15,
    commitmentsCount: 16,
    blurb: "Invasive species threaten biodiversity and have the potential to harm native wildlife and habitats, disrupt food webs, directly impact human health, and damage ecosystems that support local culture, traditions, economies, and recreation.",
    overview: "Invasive species threaten biodiversity and have the potential to harm native wildlife and habitats, disrupt food webs, directly impact human health, and damage ecosystems that support local culture, traditions, economies, and recreation. They are introduced to Puget Sound in various ways, sometimes accidentally through shipping, and travel, and other times by more intentional actions, such as planting contaminated non-native species that can spread.",
    strategies: [
      { code: "14.01", name: "Continue to refine integrated planning and removal approaches to prevent, manage, and mitigate the introduction and spread of terrestrial and aquatic invasive species, including (but not limited to) European green crab, invasive fish, and invasive plants." },
      { code: "14.02", name: "Develop, sustain, and fund coordinated outreach and education programs that raise awareness, encourage behavior change, and motivate action for Puget Sound residents to reduce the spread of invasive species." },
    ],
    vitalSigns: [
      { id: "31", name: "Beaches and Marine Vegetation" },
      { id: "22", name: "Economic Vitality" },
      { id: "30", name: "Forests and Wetlands" },
      { id: "34", name: "Groundfish and Benthic Invertebrates" },
      { id: "4", name: "Local Foods" },
      { id: "25", name: "Sound Stewardship" },
      { id: "29", name: "Streams and Floodplains" },
    ],
  },
  {
    id: "15",
    number: "Topic 15",
    title: "Stormwater Runoff",
    category: "Clean Water and Harvestable Shellfish",
    image: "/photos/action-agenda-refresh/topic-15.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/15/Overview",
    strategiesCount: 5,
    actionsCount: 20,
    commitmentsCount: 26,
    blurb: "Urban stormwater is the biggest source of pollution in the Puget Sound’s urban creeks, streams, and rivers.",
    overview: "Urban stormwater is the biggest source of pollution in the Puget Sound’s urban creeks, streams, and rivers. As stormwater flows over roads, rooftops, and other hard surfaces, it picks up harmful pollutants and carries them into nearby waterways. In 2020, researchers at the University of Washington (UW) and Washington State University (WSU) identified 6PPD-quinone, a toxic chemical from vehicle tires that washes into streams through stormwater, as one of the most serious emergent threats. It is extremely harmful to coho salmon and poses risks to other species, including ESA-listed Chinook salmon and steelhead. Stormwater also carries excess nutrients and other contaminants that pollute marine sediment.",
    strategies: [
      { code: "15.01", name: "Encourage stormwater retrofits and restoration." },
      { code: "15.02", name: "Increase local stormwater management capacity (including funding, staffing resources, and management tools and information)." },
      { code: "15.03", name: "Incentivize redevelopment in residential and mixed-use areas lacking effective stormwater management." },
      { code: "15.04", name: "Reduce impacts from residential and built environment stormwater." },
      { code: "15.05", name: "Adjust stormwater permitting requirements or other local government programs." },
    ],
    vitalSigns: [
      { id: "3", name: "Drinking Water" },
      { id: "26", name: "Freshwater" },
      { id: "27", name: "Marine Water" },
      { id: "6", name: "Outdoor Activity" },
      { id: "32", name: "Salmon" },
      { id: "28", name: "Toxics in Aquatic Life" },
    ],
  },
  {
    id: "16",
    number: "Topic 16",
    title: "Agricultural Lands Runoff",
    category: "Clean Water and Harvestable Shellfish",
    image: "/photos/action-agenda-refresh/topic-16.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/16/Overview",
    strategiesCount: 3,
    actionsCount: 13,
    commitmentsCount: 6,
    blurb: "The Puget Sound is home to a rich landscape that supports a variety of rural, residential, and commercial uses.",
    overview: "The Puget Sound is home to a rich landscape that supports a variety of rural, residential, and commercial uses. Agriculture operations play a vital role in supporting our local economy, including berry farms, dairies, cattle ranches, and horse facilities. Agricultural land users work to provide healthy and productive lands and waters to benefit Puget Sound communities now and in the future.",
    strategies: [
      { code: "16.01", name: "Increase voluntary BMP implementation among agricultural producers and landowners." },
      { code: "16.02", name: "Support pathways for agricultural producers and landowners to achieve regulatory compliance." },
      { code: "16.03", name: "Increase monitoring and evaluation efforts to assess the effectiveness of programs and BMPs at providing affordable and effective solutions to protect the environment and agricultural viability." },
    ],
    vitalSigns: [
      { id: "3", name: "Drinking Water" },
      { id: "26", name: "Freshwater" },
      { id: "27", name: "Marine Water" },
      { id: "7", name: "Shellfish Beds" },
      { id: "28", name: "Toxics in Aquatic Life" },
    ],
  },
  {
    id: "17",
    number: "Topic 17",
    title: "Forest Roads Runoff",
    category: "Clean Water and Harvestable Shellfish",
    image: "/photos/action-agenda-refresh/topic-17.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/17/Overview",
    strategiesCount: 4,
    actionsCount: 13,
    commitmentsCount: 9,
    blurb: "Forestry has a long history in the Puget Sound region, and there are well-established rules and regulations in place to protect water quality and habitat, especially through the Forest Practices Rules and the science-backed Adaptive Management Program.",
    overview: "Forestry has a long history in the Puget Sound region, and there are well-established rules and regulations in place to protect water quality and habitat, especially through the Forest Practices Rules and the science-backed Adaptive Management Program. These rules help address the impacts of poorly managed runoff from forest lands, which can carry pollutants into groundwater and surface waters, negatively impacting the health of both aquatic ecosystems and human communities.",
    strategies: [
      { code: "17.01", name: "Develop a Puget Sound forest runoff strategy." },
      { code: "17.02", name: "Address runoff from forest roads." },
      { code: "17.03", name: "Increase research on forest runoff." },
      { code: "17.04", name: "Support current and develop new programs that provide voluntary incentives." },
    ],
    vitalSigns: [
      { id: "3", name: "Drinking Water" },
      { id: "30", name: "Forests and Wetlands" },
      { id: "26", name: "Freshwater" },
    ],
  },
  {
    id: "18",
    number: "Topic 18",
    title: "Fecal Pollution",
    category: "Clean Water and Harvestable Shellfish",
    image: "/photos/action-agenda-refresh/topic-18.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview",
    strategiesCount: 3,
    actionsCount: 23,
    commitmentsCount: 5,
    blurb: "Fecal pollution puts people, wildlife, and the environment at risk, and can come from multiple sources, including combined sewer overflows (CSO), surface water runoff contaminated by failing onsite sewage systems (OSS), livestock manure, and pet waste.",
    overview: "Fecal pollution puts people, wildlife, and the environment at risk, and can come from multiple sources, including combined sewer overflows (CSO), surface water runoff contaminated by failing onsite sewage systems (OSS), livestock manure, and pet waste. It can carry harmful bacteria, viruses, and other contaminants into marine waters, making seafood unsafe to eat and increasing the risk of illness from swimming in or coming into contact with polluted water. Beach closures due to fecal pollution limit shellfish harvesting and harm local economies. They can also impact access for swimming and other types of recreation. These closures especially impact Tribal communities who rely on clean waters for food, their livelihood, and cultural practices.",
    strategies: [
      { code: "18.01", name: "Fund, develop, and implement effective local and Tribal nations PIC programs." },
      { code: "18.02", name: "Support watershed cleanup plan implementation and development to limit fecal pollution, such as TMDLs and other strategies." },
      { code: "18.03", name: "Effectively manage OSS and LOSS." },
    ],
    vitalSigns: [
      { id: "3", name: "Drinking Water" },
      { id: "26", name: "Freshwater" },
      { id: "4", name: "Local Foods" },
      { id: "27", name: "Marine Water" },
      { id: "6", name: "Outdoor Activity" },
      { id: "7", name: "Shellfish Beds" },
      { id: "28", name: "Toxics in Aquatic Life" },
    ],
  },
  {
    id: "19",
    number: "Topic 19",
    title: "Wastewater Treatment Plants",
    category: "Clean Water and Harvestable Shellfish",
    image: "/photos/action-agenda-refresh/topic-19.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/19/Overview",
    strategiesCount: 5,
    actionsCount: 30,
    commitmentsCount: 5,
    blurb: "Wastewater treatment plants (WWTPs), along with other human and industrial sources, continue to harm Puget Sound’s water quality by releasing excess nutrients and contaminants of emerging concern (CECs) into our waterways.",
    overview: "Wastewater treatment plants (WWTPs), along with other human and industrial sources, continue to harm Puget Sound’s water quality by releasing excess nutrients and contaminants of emerging concern (CECs) into our waterways.",
    strategies: [
      { code: "19.01", name: "Reduce nutrient discharge and other pollutants from wastewater treatment facilities." },
      { code: "19.02", name: "Prevent and reduce impacts from combined sewer overflows (CSO)." },
      { code: "19.03", name: "Integrate wastewater and land use planning." },
      { code: "19.04", name: "Improve end-product management." },
      { code: "19.05", name: "Address contaminants of emerging concern/toxics and microplastics in wastewater." },
    ],
    vitalSigns: [
      { id: "4", name: "Local Foods" },
      { id: "27", name: "Marine Water" },
      { id: "6", name: "Outdoor Activity" },
      { id: "7", name: "Shellfish Beds" },
      { id: "28", name: "Toxics in Aquatic Life" },
    ],
  },
  {
    id: "20",
    number: "Topic 20",
    title: "Vessel Impacts",
    category: "Clean Water and Harvestable Shellfish",
    image: "/photos/action-agenda-refresh/topic-20.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview",
    strategiesCount: 7,
    actionsCount: 53,
    commitmentsCount: 17,
    blurb: "Thousands of vessels cross the Puget Sound and Salish Sea ecosystem every day.",
    overview: "Thousands of vessels cross the Puget Sound and Salish Sea ecosystem every day. People living throughout the region have paddled and sailed on Puget Sound for generations. Today, vessel traffic in the region fuels our economy but also presents challenges to manage, including oil spills, ship strikes, and entanglements, especially as growth in Canadian shipping continues to rise.",
    strategies: [
      { code: "20.01", name: "Reduce the abandonment of vessels and expand and accelerate derelict vessel removal programs." },
      { code: "20.02", name: "Improve our understanding of risk and consequences of oil spills and toxic pollution discharge, assess the effectiveness and feasibility of mitigation measures, and support additional prevention efforts." },
      { code: "20.03", name: "Strengthen the Natural Resource Damage Assessment and spill preparedness of all partners, including federal, Tribal, state, and local governments, oil spill response organizations, and transboundary partners." },
      { code: "20.04", name: "Improve early local response to spills by increasing capacity for local engagement and training programs." },
      { code: "20.05", name: "Educate the public about the risks and impacts of marine oil spills in Puget Sound and encourage participation in forums that influence policy and decision making for regional oil spill prevention, preparedness, and response." },
      { code: "20.06", name: "Promote implementation of and compliance with laws and guidelines for boaters, ship operators, ports, and others to protect southern resident orcas from underwater noise and vessel disturbance." },
      { code: "20.07", name: "Promote responsible boating by increasing enforcement and educating boaters about regulations, programs, and resources to reduce the impact of recreational boating on water quality, marine debris, and sensitive wildlife and habitat." },
    ],
    vitalSigns: [
      { id: "31", name: "Beaches and Marine Vegetation" },
      { id: "17", name: "Birds" },
      { id: "33", name: "Forage Fish" },
      { id: "27", name: "Marine Water" },
      { id: "19", name: "Orcas" },
      { id: "32", name: "Salmon" },
      { id: "7", name: "Shellfish Beds" },
      { id: "25", name: "Sound Stewardship" },
    ],
  },
  {
    id: "A",
    number: "Topic A",
    title: "Funding",
    category: "Foundations of Recovery",
    image: "/photos/action-agenda-refresh/topic-a.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/A/Overview",
    strategiesCount: 4,
    actionsCount: 26,
    commitmentsCount: 17,
    blurb: "To achieve our recovery goals for Puget Sound, we need funding for large capital projects, ongoing programs, and essential activities such as research, monitoring, project maintenance, hiring staff, outreach, and communications.",
    overview: "To achieve our recovery goals for Puget Sound, we need funding for large capital projects, ongoing programs, and essential activities such as research, monitoring, project maintenance, hiring staff, outreach, and communications. As described in the State of the Sound, priority Puget Sound recovery programs are consistently—and significantly—underfunded which is one of the biggest barriers to recovering Puget Sound.",
    strategies: [
      { code: "A.01", name: "Increase understanding of local funding needs, bolster coordination among local, regional, and Tribal programs and partners, and expand capacity to acquire funding." },
      { code: "A.02", name: "Address barriers Tribes and local partners have in acquiring funding to create a more efficient, equitable funding system that increases funding and accelerates Puget Sound recovery." },
      { code: "A.03", name: "Increase and diversify sustainable, equitable, and dedicated funding sources to fully fund Puget Sound recovery." },
      { code: "A.04", name: "Expand the use of diverse private funding sources (such as private foundations, businesses, individuals, and market-based mechanisms) to fund and expedite Puget Sound recovery." },
    ],
    vitalSigns: [
    ],
  },
  {
    id: "B",
    number: "Topic B",
    title: "Research and Monitoring",
    category: "Foundations of Recovery",
    image: "/photos/action-agenda-refresh/topic-b.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/B/Overview",
    strategiesCount: 7,
    actionsCount: 62,
    commitmentsCount: 11,
    blurb: "Focused, relevant research and systematic, ongoing monitoring are important foundations for Puget Sound recovery.",
    overview: "Focused, relevant research and systematic, ongoing monitoring are important foundations for Puget Sound recovery. Social and natural science research and monitoring projects can improve policy decisions, support adaptive management, and strengthen the use of multiple ways of knowing. These efforts help us understand how human and non-human elements of the Puget Sound ecosystem impact each other and how their relationships change over time. Science programs provide insight into the impacts of current and past recovery efforts, describe possible futures for the Puget Sound ecosystem, and identify opportunities to build a healthier and more resilient Puget Sound that supports human health and quality of life, other species, and food webs. Effective monitoring efforts provide information to identify and measure the magnitude and patterns of threats to the health of Puget Sound, track trends over time, develop and test theories about the causes of the threats, and evaluate the effectiveness of recovery interventions.",
    strategies: [
      { code: "B.01", name: "Fund science, monitoring, and adaptive management to support Puget Sound recovery." },
      { code: "B.02", name: "Coordinate efforts to assess and report on ecosystem conditions and the effectiveness of ecosystem recovery strategies and actions." },
      { code: "B.03", name: "Continue improving integration of ecological health, human health, and human quality of life." },
      { code: "B.04", name: "Improve understanding of local climate impacts, management, and interactions." },
      { code: "B.05", name: "Collaborate with Tribal nations and Indigenous communities to support Puget Sound ecosystem recovery." },
      { code: "B.06", name: "Integrate community priorities and participation in scientific efforts focused on Puget Sound recovery." },
      { code: "B.07", name: "Ensure decision makers have access to decision-critical science and ensure scientists understand the information needs of decision-makers by supporting strengthened, sustained science-policy interactions." },
    ],
    vitalSigns: [
    ],
  },
  {
    id: "C",
    number: "Topic C",
    title: "Good Governance",
    category: "Foundations of Recovery",
    image: "/photos/action-agenda-refresh/topic-c.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/C/Overview",
    strategiesCount: 4,
    actionsCount: 26,
    commitmentsCount: 5,
    blurb: "Good governance is essential for Puget Sound recovery.",
    overview: "Good governance is essential for Puget Sound recovery. It helps people to understand how decisions are made and provides community members with opportunities to participate in shaping those decisions. It also ensures government agencies are working together efficiently and respectfully across all levels.",
    strategies: [
      { code: "C.01", name: "Engage community groups, educational institutions, practitioners, and communication specialists to co-create and share information about decision-making opportunities." },
      { code: "C.02", name: "Improve capacity, opportunities, and resources for communities impacted by environmental degradation and under-engaged communities to meaningfully engage with and participate in environmental decision-making." },
      { code: "C.03", name: "Improve understanding and upholding of tribal nations' treaty rights, inherent rights, sovereignty, and co-manager status when implementing puget sound recovery projects and programs." },
      { code: "C.04", name: "Strengthen the capacity, coordination, and accountability across government agencies in the recovery system to ensure effective and efficient implementation of the Action Agenda." },
    ],
    vitalSigns: [
    ],
  },
  {
    id: "D",
    number: "Topic D",
    title: "Strategic Leadership and Collaboration",
    category: "Foundations of Recovery",
    image: "/photos/action-agenda-refresh/topic-d.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/D/Overview",
    strategiesCount: 3,
    actionsCount: 24,
    commitmentsCount: 46,
    blurb: "Recovering and protecting Puget Sound is a complex, long-term effort that depends on strong leadership, clear strategy, and effective coordination across many different people, places, and organizations.",
    overview: "Recovering and protecting Puget Sound is a complex, long-term effort that depends on strong leadership, clear strategy, and effective coordination across many different people, places, and organizations.",
    strategies: [
      { code: "D.01", name: "Elevate Puget Sound recovery as a consistent top priority for leaders at all levels of government." },
      { code: "D.02", name: "Diversify and deepen the coalition demanding a healthy Puget Sound." },
      { code: "D.03", name: "Strengthen relationships and understanding to enhance collaboration." },
    ],
    vitalSigns: [
    ],
  },
  {
    id: "E",
    number: "Topic E",
    title: "Workforce Development",
    category: "Foundations of Recovery",
    image: "/photos/action-agenda-refresh/topic-e.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/E/Overview",
    strategiesCount: 3,
    actionsCount: 19,
    commitmentsCount: 1,
    blurb: "Strong partnerships between schools, agencies, and the natural resource industry are essential for building a skilled workforce for Puget Sound recovery.",
    overview: "Strong partnerships between schools, agencies, and the natural resource industry are essential for building a skilled workforce for Puget Sound recovery. A strong workforce is not only needed to implement the Action Agenda and recover Puget Sound, but it also supports individuals’ quality of life, community health and identity, and local economies, particularly rural ones. In Washington, the “green economy” is defined by the legislature’s report, The Green Economy Jobs Initiative Definitions, as an economy that develops and uses products or services that promote environmental protection, energy security, or both. “Green jobs” are roles within the economy that promote those goals. These careers include many fields, from water conservation and habitat restoration to green buildings, public transportation, and cultural resource management.",
    strategies: [
      { code: "E.01", name: "Increase coordination and planning efforts between educators and employers to reduce barriers and prepare students for a natural resources career." },
      { code: "E.02", name: "Increase funding to support programs and collaborations between ecosystem recovery partners, natural resource managers, and educators." },
      { code: "E.03", name: "Expand educational programs, leadership experiences, internships, and mentorships to prepare students for jobs in the natural resource sector." },
    ],
    vitalSigns: [
    ],
  },
  {
    id: "F",
    number: "Topic F",
    title: "Outreach and Behavior Change",
    category: "Foundations of Recovery",
    image: "/photos/action-agenda-refresh/topic-f.jpg",
    href: "https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/F/Overview",
    strategiesCount: 2,
    actionsCount: 18,
    commitmentsCount: 10,
    blurb: "The long-term health of Puget Sound depends on our everyday choices.",
    overview: "The long-term health of Puget Sound depends on our everyday choices. From how we care for our homes and yards, to how we volunteer, organize, and connect with our communities, individual and collective action plays a vital role in protecting the region’s lands, waters, and wildlife. To encourage behavior change and increase opportunity for engagement, we can build and strengthen incentive programs and community-based social marketing. These strategies can help make it easier for people to act by reducing barriers, building skills, and offering meaningful benefits to support recovery efforts.",
    strategies: [
      { code: "F.01", name: "Invest in social and institutional infrastructure that supports behavior change efforts through 1) capacity building, 2) policy and institutional support, and 3) research and effectiveness monitoring." },
      { code: "F.02", name: "Cultivate behavior change through education and awareness campaigns, incentives, and culturally relevant programming and outreach." },
    ],
    vitalSigns: [
    ],
  },
];

export const CATEGORIES: ActionAgendaCategory[] = [
  { name: "Healthy Communities", topicIds: ["01", "02", "03", "04"] },
  { name: "Sustainable Land Use", topicIds: ["05", "06", "07"] },
  { name: "Resilient Habitats", topicIds: ["08", "09", "10", "11", "12", "13", "14"] },
  { name: "Clean Water and Harvestable Shellfish", topicIds: ["15", "16", "17", "18", "19", "20"] },
  { name: "Foundations of Recovery", topicIds: ["A", "B", "C", "D", "E", "F"] },
];

export const TOTAL_TOPICS = TOPICS.length;
export const TOTAL_CATEGORIES = CATEGORIES.length;
export const TOTAL_STRATEGIES = TOPICS.reduce((n, t) => n + t.strategiesCount, 0);
export const TOTAL_ACTIONS = TOPICS.reduce((n, t) => n + t.actionsCount, 0);
export const TOTAL_COMMITMENTS = TOPICS.reduce((n, t) => n + t.commitmentsCount, 0);
