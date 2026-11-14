export type Pillar = "prevention" | "detection" | "suppression"

export type FuelPhase = "solid" | "liquid" | "gaseous" | "none"

export type Environment =
  | "spacecraft"
  | "space_station"
  | "lunar_base"
  | "mars_base"
  | "pressurized_rover"
  | "spacesuit"
  | "earth_spinoff"

export interface Investigation {
  id: string
  title: string
  pillars: Pillar[]
  fuel: { phase: FuelPhase; material?: string; shape?: string; sizeMm?: string }
  conditions: { oxygenPct?: number; pressurePsi?: number; airflowCmS?: number }
  hardware: { facility?: string; module?: string }
  sensors: string[]
  variablesTested: string[]
  objectives: string
  keyFindings: string[]
  fireSafetyRelevance: { environments: Environment[]; why: string }
  sourceUrl: string
}

export const investigations: Investigation[] = [
  {
    id: "bass",
    title: "Burning and Suppression of Solids (BASS)",
    pillars: ["prevention", "suppression"],
    fuel: {
      phase: "solid",
      material:
        "SIBAL cotton-fiberglass fabric, Nomex, Ultem, PMMA, wax-saturated fiberglass, paraffin and Japan wax candles",
      shape:
        "Thin and thick flat samples, solid spheres, and candles inside thin ceramic tubes",
      sizeMm:
        "Thin flats 120 x 10-20 mm; thick flats 50 x 10 x 1-2 mm; PMMA spheres 10-20 mm diameter; candles 6 mm diameter x 25 mm",
    },
    conditions: { oxygenPct: 21, pressurePsi: 14.7, airflowCmS: 50 },
    hardware: {
      facility: "Microgravity Science Glovebox (MSG) with the SPICE flow duct",
      module: "International Space Station",
    },
    sensors: [
      "Video and still cameras with telemetry overlay",
      "Radiometer for flame output",
      "Anemometer for duct airflow",
      "Nitrogen mass flow controller",
    ],
    variablesTested: [
      "Fuel material, geometry and thickness across 41 samples",
      "Duct airflow from 5 to 50 cm/s",
      "Nitrogen suppressant flow from 0 to 500 cc/min ramp to extinction",
      "Front versus back ignition on PMMA spheres",
    ],
    objectives:
      "Test whether solid materials burn as well in microgravity as in normal gravity when ventilation is adequate, and identify how suppressant application and fuel geometry change extinction behavior in a crewed spacecraft.",
    keyFindings: [
      "Burned 41 fuel samples across 89 test points inside the sealed MSG work volume.",
      "Nitrogen suppressant was ramped from 0 to 500 cc/min until extinction, linking the experiment directly to spacecraft extinguisher practice.",
      "Flame shape, spread rate, pulsation and time to extinction were recorded against airflow, fuel geometry and suppressant flow.",
      "The data feed flame-spread and suppression models used to design spacecraft fire detection and suppression systems.",
    ],
    fireSafetyRelevance: {
      environments: [
        "spacecraft",
        "space_station",
        "lunar_base",
        "mars_base",
        "pressurized_rover",
      ],
      why: "Provides low-gravity flammability and nitrogen-extinguishment data for solid materials in pressurized crew cabins, where the suppressant cannot simply be aimed at the base of a buoyant flame.",
    },
    sourceUrl: "https://psi.nasa.gov/physci/repo/search?q=BASS",
  },
  {
    id: "bass-ii",
    title: "Burning and Suppression of Solids - II (BASS-II)",
    pillars: ["prevention", "suppression"],
    fuel: {
      phase: "solid",
      material:
        "Acrylic films and sheets, black and clear acrylic rods, SIBAL cotton-fiberglass fabric, and a large acrylic spherical section",
      shape:
        "Thin flats, rods, and a section of a large solid sphere",
      sizeMm:
        "Thin flats 100 x 10-20 mm; rods and sphere section in acrylic; 100 fuel samples total",
    },
    conditions: { pressurePsi: 14.7 },
    hardware: {
      facility: "Microgravity Science Glovebox (MSG) with the SPICE flow duct",
      module: "International Space Station",
    },
    sensors: [
      "Video and still cameras",
      "Radiometer for flame output",
      "Anemometer for duct airflow",
      "Nitrogen vitiation flow controller",
    ],
    variablesTested: [
      "Ambient oxygen concentration",
      "Ventilation flow velocity from 5 to 50 cm/s",
      "Fuel type, thickness and geometry",
      "Opposed versus concurrent flame spread",
      "Nitrogen vitiation of the working volume",
    ],
    objectives:
      "Identify the worst-case material flammability geometry for spacecraft, compare it with the terrestrial upward-burning screening test, and map minimum oxygen and flow conditions for sustained burning.",
    keyFindings: [
      "Produced spread-rate data for thin and thick fuels and a formula for the transition between them.",
      "Existing models predicted higher spread rates than observed, pointing to needed model improvements.",
      "Enabled calculation of combustion completeness, heat release rates and fuel-to-oxygen global equivalence ratios.",
      "Supported theoretical models for quenching boundaries, guiding material selection and firefighting methods for future missions.",
    ],
    fireSafetyRelevance: {
      environments: [
        "spacecraft",
        "space_station",
        "lunar_base",
        "mars_base",
        "pressurized_rover",
      ],
      why: "Directly tests whether NASA-STD-6001 style upward-burning ground screening is conservative for low-gravity material selection, including oxygen and ventilation limits.",
    },
    sourceUrl: "https://psi.nasa.gov/physci/repo/search?q=BASS-II",
  },
  {
    id: "saffire-i",
    title: "Saffire-I",
    pillars: ["prevention"],
    fuel: {
      phase: "solid",
      material: "SIBAL cotton-fiberglass blend fabric",
      shape: "Large flat fabric sample inside a purpose-built flow duct",
      sizeMm: "Burn sample 0.4 m wide x 1 m long; enclosure about 0.5 x 1 x 1.3 m",
    },
    conditions: {},
    hardware: {
      facility: "Spacecraft Fire Safety Demonstration payload in a Cygnus cargo vehicle",
      module: "Free-flying Cygnus after ISS departure",
    },
    sensors: [
      "Video and still imaging",
      "Thermocouples",
      "Pressure and oxygen sensors",
      "Flow duct instrumentation",
    ],
    variablesTested: [
      "Large-scale flame growth over a meter-class fabric sample",
      "Material flammability limits at practical spacecraft scale",
      "Flow-duct conditions during flame spread",
    ],
    objectives:
      "Investigate large-scale flame growth and material flammability limits in space using a cargo vehicle after it departs the station, avoiding risk to the crewed ISS.",
    keyFindings: [
      "Conducted the largest fire experiment in space to date; previous tests were roughly the size of an index card.",
      "Ignited a 0.4 m by 1 m SIBAL sample inside a dedicated flow duct while the vehicle flew free.",
      "Provided practical-scale data on flame growth that small glovebox samples could not reproduce.",
    ],
    fireSafetyRelevance: {
      environments: ["spacecraft", "space_station", "mars_base"],
      why: "Extends material flammability findings from small samples to meter-scale fires relevant to crew spacecraft and long-duration habitats.",
    },
    sourceUrl: "https://psi.nasa.gov/physci/repo/search?q=Saffire-I",
  },
  {
    id: "saffire-ii",
    title: "Saffire-II",
    pillars: ["prevention"],
    fuel: {
      phase: "solid",
      material:
        "SIBAL cotton-fiberglass blend, Nomex, and the acrylic glass used for spacecraft windows",
      shape: "Nine flat material samples in a flow duct",
      sizeMm: "Nine samples in the experiment kit",
    },
    conditions: {},
    hardware: {
      facility: "Spacecraft Fire Safety Demonstration payload in a Cygnus cargo vehicle",
      module: "Free-flying Cygnus after ISS departure",
    },
    sensors: [
      "Video and still imaging",
      "Thermocouples",
      "Pressure and oxygen sensors",
      "Flow duct instrumentation",
    ],
    variablesTested: [
      "Material type across nine samples",
      "Flame spread over fabric, Nomex and acrylic window material",
    ],
    objectives:
      "Build on Saffire-I by expanding the material test portfolio to include Nomex and spacecraft window acrylic at large scale.",
    keyFindings: [
      "Expanded large-scale flammability testing beyond the single SIBAL fabric used in Saffire-I.",
      "Tested Nomex and the same acrylic glass used for spacecraft windows.",
      "Samples were ignited remotely after Cygnus departed the station, before destructive reentry.",
    ],
    fireSafetyRelevance: {
      environments: ["spacecraft", "space_station", "mars_base"],
      why: "Tests candidate cabin materials at a scale and geometry closer to real spacecraft installations than glovebox samples.",
    },
    sourceUrl: "https://psi.nasa.gov/physci/repo/search?q=Saffire-II",
  },
  {
    id: "saffire-iii",
    title: "Saffire-III",
    pillars: ["prevention"],
    fuel: {
      phase: "solid",
      material: "SIBAL cotton-fiberglass blend fabric",
      shape: "Large flat fabric sample inside a flow duct",
      sizeMm: "Meter-class fabric sample",
    },
    conditions: {},
    hardware: {
      facility: "Spacecraft Fire Safety Demonstration payload in a Cygnus cargo vehicle",
      module: "Free-flying Cygnus after ISS departure",
    },
    sensors: [
      "Video and still imaging",
      "Thermocouples",
      "Pressure and oxygen sensors",
      "Flow duct instrumentation",
    ],
    variablesTested: [
      "Higher flow velocity over the same SIBAL fabric used in Saffire-I",
      "Flame growth response to increased ventilation",
    ],
    objectives:
      "Repeat the Saffire-I material test at a higher flow velocity to isolate the effect of ventilation on large-scale flame growth.",
    keyFindings: [
      "Burned the same SIBAL cotton-fiberglass blend as Saffire-I at a higher flow velocity.",
      "Isolated ventilation as a variable in large-scale microgravity flame spread.",
    ],
    fireSafetyRelevance: {
      environments: ["spacecraft", "space_station", "mars_base"],
      why: "Ventilation is a first-order control on low-gravity flame spread; this test shows how much large-scale spread changes when airflow increases.",
    },
    sourceUrl: "https://psi.nasa.gov/physci/repo/search?q=Saffire-III",
  },
  {
    id: "same",
    title: "Smoke Aerosol Measurement Experiment (SAME)",
    pillars: ["detection"],
    fuel: {
      phase: "none",
      material:
        "Teflon, Kapton, silicone rubber, cellulose, and dibutyl-phthalate on a porous wick",
      shape: "Pyrolysis samples on a heated porous wick",
      sizeMm: "30 samples, six per material",
    },
    conditions: {},
    hardware: {
      facility: "Microgravity Science Glovebox (MSG) smoke-generation hardware",
      module: "International Space Station",
    },
    sensors: [
      "P-Trak condensation particle counter",
      "Ionization smoke detector (Space Shuttle type)",
      "Photoelectric light-scattering smoke detector (ISS type)",
      "Thermal precipitator for transmission electron microscopy",
    ],
    variablesTested: [
      "Sample material and pyrolysis temperature",
      "Airflow rate",
      "Smoke aging or residence time",
      "Detector response across particle sizes",
    ],
    objectives:
      "Measure the size distribution of smoke produced by overheated spacecraft materials in microgravity and evaluate the ionization and photoelectric detector technologies used on the Shuttle and ISS.",
    keyFindings: [
      "A substantial portion of aerosol mass was in particles larger than 1 micron, while Teflon smoke was primarily sub-micron.",
      "All samples produced significant sub-micron particulate, but light-scattering detectors performed well for most cases.",
      "Smoke aging reduced particle number counts substantially while mass concentration stayed relatively steady, consistent with coagulation.",
      "Broader particle size distributions can come from pre-fire overheat events, favoring detectors that measure a wider size spectrum.",
    ],
    fireSafetyRelevance: {
      environments: [
        "spacecraft",
        "space_station",
        "lunar_base",
        "mars_base",
        "pressurized_rover",
      ],
      why: "Sets the low-gravity baseline for early-warning smoke detection, where the target is pyrolysis products from overheated materials rather than established flaming fires.",
    },
    sourceUrl: "https://psi.nasa.gov/physci/repo/search?q=SAME",
  },
  {
    id: "same-r",
    title: "Smoke Aerosol Measurement Experiment - Reflight (SAME-R)",
    pillars: ["detection"],
    fuel: {
      phase: "none",
      material: "Teflon, Kapton, cotton, silicone rubber, and Pyrell",
      shape: "Pyrolysis samples on a heated porous wick",
      sizeMm: "Five material types with repeatable surface temperatures",
    },
    conditions: {},
    hardware: {
      facility: "Microgravity Science Glovebox (MSG) smoke-generation hardware",
      module: "International Space Station",
    },
    sensors: [
      "Aerosol instruments measuring particle number, diameter and mass moments",
      "Thermal precipitator with transmission electron microscopy",
      "Commercial smoke detector",
      "ISS and Space Shuttle smoke detectors",
    ],
    variablesTested: [
      "Smoke material type",
      "Aged versus un-aged smoke",
      "Particle size distribution moments",
      "Flight detector response",
    ],
    objectives:
      "Repeat SAME with improved diagnostics, compare flight and ground smoke measurements, and evaluate the ISS and Shuttle smoke detectors against known particle size distributions.",
    keyFindings: [
      "Flight and ground measurements were compared for Teflon, Kapton, cotton, silicone rubber and Pyrell smoke.",
      "Moment measurements gave particle number, diameter and mass concentrations; geometric statistics followed under a lognormal assumption.",
      "Transmission electron microscopy and ground SMPS data validated the particle statistics.",
      "The reflight strengthened the low-gravity smoke baseline used to design more reliable spacecraft detectors.",
    ],
    fireSafetyRelevance: {
      environments: [
        "spacecraft",
        "space_station",
        "lunar_base",
        "mars_base",
        "pressurized_rover",
      ],
      why: "Improves confidence in detector sensitivity and false-alarm behavior for long-duration missions beyond low Earth orbit.",
    },
    sourceUrl: "https://psi.nasa.gov/physci/repo/search?q=SAME-R",
  },
  {
    id: "daft",
    title: "Dust and Aerosol Measurement Feasibility Test (DAFT)",
    pillars: ["detection"],
    fuel: {
      phase: "none",
      material: "Ambient ISS airborne particulate and released test particles",
      shape: "Airborne aerosol sampling",
    },
    conditions: {},
    hardware: {
      facility: "Hand-held P-Trak particle counter operated inside the ISS cabin",
      module: "International Space Station",
    },
    sensors: [
      "P-Trak ultrafine particle counter",
      "Isopropyl-alcohol condensation chamber",
      "Light-beam particle detector",
    ],
    variablesTested: [
      "Ultrafine particle counts in microgravity",
      "Particle counter operation without gravity-driven alcohol return",
      "Ambient ISS particulate levels",
    ],
    objectives:
      "Verify that a modified P-Trak ultrafine particle counter, a key SAME component, works in microgravity and can characterize ISS airborne particulate before SAME flew.",
    keyFindings: [
      "Demonstrated a hand-held commercial particle counter in the ISS atmosphere.",
      "Data indicated low particulate levels relative to the Shuttle, consistent with the smaller ISS crew and its filtration system.",
      "Average particle sizes on orbit were larger than on Earth, possibly due to spacecraft filtration efficiency.",
      "Established the median particulate baseline needed to distinguish ordinary dust from dangerous smoke.",
    ],
    fireSafetyRelevance: {
      environments: ["spacecraft", "space_station"],
      why: "A smoke detector must reject ordinary dust; DAFT characterized the background aerosol environment and qualified the counter later used by SAME.",
    },
    sourceUrl: "https://psi.nasa.gov/physci/repo/search?q=DAFT",
  },
  {
    id: "daft-2",
    title: "Dust and Aerosol Measurement Feasibility Test - 2 (DAFT-2)",
    pillars: ["detection"],
    fuel: {
      phase: "none",
      material: "Ambient ISS airborne particulate and released test particles",
      shape: "Airborne aerosol sampling",
    },
    conditions: {},
    hardware: {
      facility: "Hand-held P-Trak particle counter operated inside the ISS cabin",
      module: "International Space Station",
    },
    sensors: [
      "P-Trak ultrafine particle counter",
      "Isopropyl-alcohol condensation chamber",
      "Light-beam particle detector",
    ],
    variablesTested: [
      "Repeatability of microgravity particle counts",
      "Ambient particulate variability across ISS locations",
      "Detector discrimination between dust and smoke-sized aerosol",
    ],
    objectives:
      "Continue the DAFT particle-counting campaign on ISS to build a more representative particulate baseline for spacecraft smoke-detector design.",
    keyFindings: [
      "Extended the DAFT aerosol measurements with additional ISS test points.",
      "Reinforced the finding that on-orbit particulate sizes can exceed typical ground values.",
      "Provided background data needed for detectors that must distinguish dust from smoke.",
    ],
    fireSafetyRelevance: {
      environments: ["spacecraft", "space_station"],
      why: "A larger dust baseline reduces nuisance alarms and supports detection thresholds tuned to spacecraft rather than terrestrial air.",
    },
    sourceUrl: "https://psi.nasa.gov/physci/repo/search?q=DAFT-2",
  },
  {
    id: "flex",
    title: "Flame Extinguishment Experiment (FLEX)",
    pillars: ["suppression", "prevention"],
    fuel: {
      phase: "liquid",
      material: "Methanol and heptane droplets",
      shape: "Single spherical droplet on a support fiber",
      sizeMm: "Initial droplet diameter 2 to 5 mm",
    },
    conditions: { oxygenPct: 50, pressurePsi: 14.7 },
    hardware: {
      facility: "Multi-user Droplet Combustion Apparatus (MDCA) in the Combustion Integrated Rack (CIR)",
      module: "International Space Station",
    },
    sensors: [
      "High-speed cameras for droplet and flame imaging",
      "Radiometers for flame radiation",
      "Soot concentration and soot temperature diagnostics",
      "Droplet deployment and ignition instrumentation",
    ],
    variablesTested: [
      "Oxygen mole fraction from 0.10 to 0.50",
      "Suppressant type: carbon dioxide or helium",
      "Diluent gas, primarily nitrogen with some helium tests",
      "Pressure from 0.5 to 1.0 atm",
      "Fuel type: methanol versus heptane",
      "Initial droplet diameter from 2 to 5 mm",
    ],
    objectives:
      "Quantify the suppressant effectiveness of inert gases in microgravity, find the most conservative limiting oxygen index for steady combustion, and validate droplet combustion and extinction models.",
    keyFindings: [
      "Mapped flammability boundaries for liquid fuel combustion across oxygen, pressure and suppressant conditions.",
      "Tested carbon dioxide and helium as suppressants from zero concentration up to the no-flame limit.",
      "Observed droplets either burning to completion or extinguishing at a finite droplet radius.",
      "Provided spatially and temporally resolved measurements of burning rate, extinction, radiation and soot for model validation.",
    ],
    fireSafetyRelevance: {
      environments: ["spacecraft", "space_station", "spacesuit"],
      why: "Informs inert-gas suppression and the limiting oxygen index for habitable volumes, including oxygen-enriched pre-breathe and suit-adjacent environments.",
    },
    sourceUrl: "https://psi.nasa.gov/physci/repo/search?q=FLEX",
  },
  {
    id: "flex-2",
    title: "Flame Extinguishment Experiment - 2 (FLEX-2)",
    pillars: ["suppression"],
    fuel: {
      phase: "liquid",
      material:
        "Single and paired fuel droplets, including bi-component and surrogate fuels",
      shape: "Single droplets, binary droplet arrays, and tethered droplets in convection",
      sizeMm: "Droplets 2 to 4 mm in diameter",
    },
    conditions: {},
    hardware: {
      facility: "Multi-user Droplet Combustion Apparatus (MDCA) in the Combustion Integrated Rack (CIR)",
      module: "International Space Station",
    },
    sensors: [
      "High-speed color and video imaging",
      "Radiometers",
      "Soot volume fraction diagnostics",
      "Droplet position and fiber-support instrumentation",
    ],
    variablesTested: [
      "Pure fuels versus fuel mixtures and surrogates",
      "Sub-buoyant convective flow around a tethered droplet",
      "Droplet-droplet interactions in a binary array",
      "Inter-droplet spacing and ambient composition",
    ],
    objectives:
      "Extend droplet combustion research to flowing environments, interacting droplets and practical multicomponent fuels, producing validated models of real-fuel combustion.",
    keyFindings: [
      "Studied single droplets, binary droplet arrays and tethered droplets under controlled sub-buoyant flow.",
      "Examined liquid-phase mixing in bi-component and surrogate fuels as they vaporize and burn.",
      "Quantified soot formation and droplet-droplet interactions in a spherically symmetric geometry.",
      "Four experiment groupings each involved roughly 30 to 60 tests.",
    ],
    fireSafetyRelevance: {
      environments: ["spacecraft", "space_station"],
      why: "Improves sub-models for soot, radiation and droplet extinction that feed simulations of larger realistic fires in crewed vehicles.",
    },
    sourceUrl: "https://psi.nasa.gov/physci/repo/search?q=FLEX-2",
  },
  {
    id: "cfi",
    title: "Cool Flames Investigation (CFI)",
    pillars: ["prevention"],
    fuel: {
      phase: "liquid",
      material: "Heptane droplets",
      shape: "Spherical droplets burned in a quiescent microgravity environment",
      sizeMm: "Millimeter-scale droplets",
    },
    conditions: {},
    hardware: {
      facility: "Multi-user Droplet Combustion Apparatus (MDCA) in the Combustion Integrated Rack (CIR)",
      module: "International Space Station",
    },
    sensors: [
      "High-speed droplet and flame imaging",
      "Radiometers for low-level flame emission",
      "Droplet diameter tracking",
      "Combustion product and temperature diagnostics",
    ],
    variablesTested: [
      "Low-temperature cool flame chemistry in heptane droplets",
      "Radiative extinction and near-limit burning",
      "Droplet burning history after the visible flame extinguishes",
    ],
    objectives:
      "Investigate the cool diffusion flames first observed during ISS droplet experiments in 2012, characterizing low-temperature burning and its role in near-limit extinction.",
    keyFindings: [
      "Cool diffusion flames were discovered during ISS droplet combustion experiments in 2012.",
      "CFI examined heptane droplet cool flames, which can burn at low temperature with little or no visible light.",
      "The data test low-temperature chemical kinetic models and help explain extinction near flammability limits.",
    ],
    fireSafetyRelevance: {
      environments: ["spacecraft", "space_station", "spacesuit"],
      why: "Low-temperature chemistry can sustain reacting fuel even when a visible flame is gone, changing how near-limit fire risk is assessed in low gravity.",
    },
    sourceUrl: "https://psi.nasa.gov/physci/repo/search?q=CFI",
  },
  {
    id: "cfi-g",
    title: "Cool Flames Investigation with Gases (CFI-G)",
    pillars: ["prevention"],
    fuel: {
      phase: "gaseous",
      material: "Propane fuel with an oxygen-nitrogen oxidizer stream",
      shape: "Porous spherical burner producing a steady spherical diffusion flame",
      sizeMm: "Spherical porous burner",
    },
    conditions: { oxygenPct: 85 },
    hardware: {
      facility: "Modular ACME hardware in the Combustion Integrated Rack (CIR)",
      module: "International Space Station",
    },
    sensors: [
      "Color, CH* and OH* imaging",
      "Thin-filament pyrometry",
      "Radiometer array",
      "Photomultiplier tubes for OH* and CH* emission",
      "Gas chromatograph for chamber atmosphere analysis",
    ],
    variablesTested: [
      "Oxygen concentration up to 85% in the oxidizer stream",
      "Fuel and oxidizer dilution",
      "Steady spherical cool diffusion flame behavior",
    ],
    objectives:
      "Observe steady spherical cool diffusion flames for the first time by feeding a gaseous fuel and an oxygen-rich stream from a porous spherical burner into the ACME chamber.",
    keyFindings: [
      "Studied cool diffusion flames as steady spherical flames rather than unsteady droplet flames.",
      "Reached oxygen concentrations up to 85%, the highest-O2 microgravity combustion tests in the catalog.",
      "The burner arrangement creates an inside-out flame, with oxygen supplied from the sphere and a flammable gas in the chamber atmosphere.",
    ],
    fireSafetyRelevance: {
      environments: ["spacesuit", "lunar_base", "spacecraft"],
      why: "Probes combustion at oxygen levels far above Earth air, directly relevant to suit pre-breathe and lunar or rover habitats that may run at 30% O2 or more.",
    },
    sourceUrl: "https://psi.nasa.gov/physci/repo/search?q=CFI-G",
  },
  {
    id: "acme",
    title: "Advanced Combustion via Microgravity Experiments (ACME)",
    pillars: ["prevention"],
    fuel: {
      phase: "gaseous",
      material:
        "Methane, ethylene, hydrogen and propane; BRE uses gaseous fuel to simulate solid and liquid fuels",
      shape:
        "Flat porous burner, coflow burner, gas-jet burner and spherical porous burner",
      sizeMm: "Modular burner set mounted on the CIR chamber axis",
    },
    conditions: {},
    hardware: {
      facility: "Modular ACME hardware in the Combustion Integrated Rack (CIR)",
      module: "International Space Station",
    },
    sensors: [
      "Color, CH* and OH* imaging",
      "Thin-filament pyrometry and color-ratio pyrometry",
      "Radiometer arrays",
      "Photomultiplier tubes for OH* and CH* emission",
      "Gas chromatograph",
      "Heat flux transducers and surface thermocouples on BRE burners",
    ],
    variablesTested: [
      "Six sub-experiments: BRE, CLD Flame, E-FIELD Flames, Flame Design, s-Flame and CFI-G",
      "Fuel dilution and oxygen-enriched atmospheres",
      "Soot inception and extinction limits",
      "Electric field strength up to 10 kV",
      "Burner type, flow rate and chamber pressure",
    ],
    objectives:
      "Improve efficiency and reduce pollutant emissions through fundamental microgravity research on laminar gaseous non-premixed flames, with spacecraft fire prevention as a secondary objective.",
    keyFindings: [
      "Microgravity sooty flames were taller, wider, cooler and far sootier than normal-gravity flames, with five to eight times more soot.",
      "Highly diluted microgravity flames were more stable than normal-gravity flames, extending dilution limits and allowing lifted flames at lower fuel concentrations.",
      "BRE uses a flat porous burner fed with gaseous fuel to simulate the burning of solids and liquids and assess flammability test methods for low and partial gravity.",
      "E-FIELD Flames applied up to 10 kV to study ion-driven flame control and stability.",
    ],
    fireSafetyRelevance: {
      environments: ["spacecraft", "space_station", "lunar_base"],
      why: "Provides the gaseous-flame fundamentals behind soot, radiation, extinction and material flammability screening, including BRE's emulation of condensed-fuel burning.",
    },
    sourceUrl: "https://psi.nasa.gov/physci/repo/search?q=ACME",
  },
  {
    id: "spice",
    title: "Smoke Point in Co-flow Experiment (SPICE)",
    pillars: ["prevention"],
    fuel: {
      phase: "gaseous",
      material: "Propylene, propane, ethylene and selected fuel mixtures",
      shape: "Laminar gas jet in a co-flowing oxidizer",
      sizeMm: "Three nozzle sizes",
    },
    conditions: { oxygenPct: 21 },
    hardware: {
      facility: "Microgravity Science Glovebox (MSG) with the SPICE flow duct",
      module: "International Space Station",
    },
    sensors: [
      "Video and still cameras for luminous flame shape",
      "Thermocouple rake for temperature field",
      "Anemometer for co-flow velocity",
      "Gas delivery and mass flow controllers",
    ],
    variablesTested: [
      "Fuel type and fuel mixture",
      "Nozzle diameter",
      "Co-flow air velocity",
      "Fuel flow rate up to the smoke point",
    ],
    objectives:
      "Determine the laminar smoke point of non-buoyant jet diffusion flames, measure flame shape and stabilization height, and verify temperature-field predictions.",
    keyFindings: [
      "Completed 250 combustion tests with propylene, propane, ethylene and other mixtures.",
      "Identified more than 70 smoke points, yielding estimates of soot-forming conditions and flame dimensions.",
      "Showed how co-flowing air speed affects smoke points and soot production in microgravity.",
      "Soot controls radiative heat emission, which is central to predicting fire spread and heat release in spacecraft fires.",
    ],
    fireSafetyRelevance: {
      environments: ["spacecraft", "space_station", "lunar_base"],
      why: "Soot-driven radiation dominates heat transfer from microgravity fires; smoke-point data improve flammability criteria and heat-release models for material selection.",
    },
    sourceUrl: "https://psi.nasa.gov/physci/repo/search?q=SPICE",
  },
  {
    id: "slice",
    title: "Structure & Liftoff in Combustion Experiment (SLICE)",
    pillars: ["prevention"],
    fuel: {
      phase: "gaseous",
      material: "Methane, ethylene and nitrogen-diluted variants",
      shape: "Laminar jet diffusion flame in a co-flow of air",
      sizeMm: "SPICE nozzle set with additional nozzle sizes",
    },
    conditions: { oxygenPct: 21 },
    hardware: {
      facility: "Microgravity Science Glovebox (MSG) with the SPICE flow duct",
      module: "International Space Station",
    },
    sensors: [
      "Still and video imaging of the flame base",
      "Temperature field measurements",
      "Flow and fuel mass flow controllers",
      "Anemometer for co-flow velocity",
    ],
    variablesTested: [
      "Fuel type and nitrogen dilution",
      "Burner diameter",
      "Liftoff velocity limits",
      "Attached through lifted flame conditions",
    ],
    objectives:
      "Characterize diffusion flame structure at the stabilizing region from attached to lifted conditions and identify liftoff limits as a function of fuel, burner diameter and flow.",
    keyFindings: [
      "Characterized flame structure at the base from attached through lifted conditions.",
      "Identified liftoff velocity limits for methane, ethylene and diluted fuels.",
      "Served as a precursor to the ACME CLD Flame experiment, de-risking the later investigation.",
      "Provided photographic observations of transient liftoff behavior that is extremely difficult to capture in normal gravity.",
    ],
    fireSafetyRelevance: {
      environments: ["spacecraft", "space_station"],
      why: "Flame attachment controls the stability of the trailing diffusion flame, which is directly relevant to whether a fire near a surface or burner will persist.",
    },
    sourceUrl: "https://psi.nasa.gov/physci/repo/search?q=SLICE",
  },
]

export const hardwareGroups = [
  {
    id: "ACME" as const,
    label: "ACME group",
    facility: "Combustion Integrated Rack (CIR)",
    description:
      "Modular ACME hardware for laminar gaseous non-premixed flames. Six sub-experiments share one chamber insert, burner set and imaging suite.",
    members: ["acme", "cfi-g"],
    subExperiments: [
      "BRE",
      "CLD Flame",
      "E-FIELD Flames",
      "Flame Design",
      "s-Flame",
      "CFI-G",
    ],
  },
  {
    id: "MDCA" as const,
    label: "MDCA group",
    facility: "Combustion Integrated Rack (CIR)",
    description:
      "Multi-user Droplet Combustion Apparatus for liquid fuel droplets. FLEX, FLEX-2 and CFI use the same droplet deployment, ignition and imaging capability.",
    members: ["flex", "flex-2", "cfi"],
    subExperiments: [],
  },
  {
    id: "SPICE" as const,
    label: "SPICE duct group",
    facility: "Microgravity Science Glovebox (MSG)",
    description:
      "The modular fan-driven flow duct built for SPICE. BASS, BASS-II, SPICE and SLICE all use the same MSG duct hardware.",
    members: ["bass", "bass-ii", "spice", "slice"],
    subExperiments: [],
  },
] as const

export type HardwareGroupId = (typeof hardwareGroups)[number]["id"]

export const groupMemberIds: Record<HardwareGroupId, string[]> = {
  ACME: ["acme", "cfi-g"],
  MDCA: ["flex", "flex-2", "cfi"],
  SPICE: ["bass", "bass-ii", "spice", "slice"],
}

export function getHardwareGroup(id: string): HardwareGroupId | undefined {
  for (const group of hardwareGroups) {
    if ((group.members as readonly string[]).includes(id)) return group.id
  }
  return undefined
}

export const ungroupedIds = [
  "saffire-i",
  "saffire-ii",
  "saffire-iii",
  "same",
  "same-r",
  "daft",
  "daft-2",
]
