export const services = [
  { title: "Commercial fabrication", copy: "Powder coating for suitable steel, aluminium and mixed commercial fabrications.", href: "/services#commercial" },
  { title: "Production batches", copy: "Repeat and scheduled work assessed around quantity, finish, handling and timing.", href: "/services#production" },
  { title: "Architectural metalwork", copy: "Architectural aluminium, gates, fencing, balustrades and related components.", href: "/services#architectural" },
  { title: "Custom metal parts", copy: "Individual parts and smaller batches quoted according to condition and preparation.", href: "/services#custom" },
  { title: "Long and awkward parts", copy: "Contact us to discuss dimensions, weight, hanging and current line suitability.", href: "/capabilities#large" },
  { title: "Wheels and selected parts", copy: "Wheels and selected automotive components are assessed before acceptance.", href: "/services#automotive" },
];

export const processSteps = [
  ["01", "Job review", "We review material, condition, dimensions, quantity, colour, finish and timing."],
  ["02", "Preparation plan", "The preparation and pretreatment approach is selected for the substrate and job."],
  ["03", "Mask and hang", "Critical surfaces are identified and parts are arranged for safe, consistent application."],
  ["04", "Apply and cure", "Powder is applied electrostatically, then cured for the powder and metal mass."],
  ["05", "Inspect and protect", "Parts cool before inspection, handling and protection for collection or dispatch."],
] as const;

export const faqs = [
  ["What information do you need for a quote?", "Send photos or drawings, overall dimensions, material, quantity, current surface condition, colour or finish, required date and any critical surfaces."],
  ["Do you handle production batches?", "Yes. Flowcoat can assess repeat orders, scheduled work, regular colour requirements, handling and packaging needs. Share expected quantities and frequency in your enquiry."],
  ["Can you coat a one-off item?", "Flowcoat considers one-off and small-batch work. Suitability and price depend on the part, its condition, preparation, dimensions, weight, masking and finish."],
  ["What materials can be powder coated?", "Many steel and aluminium components may be suitable, but substrate, assembly, existing finish and heat-sensitive items need assessment before acceptance."],
  ["How large can a part be?", "Current limits depend on the production arrangement, part weight and geometry. Please send dimensions and photos so long or oversized items can be assessed."],
  ["Can you match a colour?", "Send a colour reference or physical sample. Availability depends on the manufacturer, coating system, quantity and stock; an exact match cannot be assumed before review."],
  ["Do parts need to be disassembled?", "Bearings, seals, plastics, electronics and other heat-sensitive components may need removal. Tell us about assemblies, enclosed spaces and critical mating surfaces."],
  ["What happens after I submit a quote request?", "Flowcoat reviews the parts, preparation, finish, quantity and timing, then contacts you with questions or a quotation. A submission is not an accepted order."],
] as const;
