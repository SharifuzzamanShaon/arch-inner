export const CATEGORIES = [
  { id: "architecture", name: "Architecture" },
  { id: "interior-architecture", name: "Interior Architecture" },
  { id: "master-plan-landscape", name: "Master Plan & Landscape" },
  { id: "product-design", name: "Product Design" },
  { id: "project-management", name: "Project Management" },
];

const BAT =
  "/images/BAT%20KUSHTIA_BD-FARMER%20WAITING%20STATION%20AND%20TRAINING%20CENTER%20AT%20MLD.";
const DIU = "/images/DIU";
const FERVENT =
  "/images/FERVENT%20CHAIRMAN%20FLOOR%20INTERIOR%20DESIGN%20PRESENTATION";
const DBPLC = "/images/DBPlc%20Kalatia%20Branch%20Presentation";
const IELTS = "/images/IELTS";

export const PROJECTS = [
  {
    id: 1,
    slug: "bat-farmer-waiting-station-training-center",
    title: "BAT BD Farmer Waiting Station & Training Center",
    category: "Architecture",
    categoryId: "architecture",
    location: "MLD, Kushtia",
    thumbnail: `${BAT}/VIEW%20FROM%20ENTRY%20GATE.png`,
    description:
      "A community facility rooted in the Bangladeshi courtyard tradition, with tobacco-leaf-inspired facade screens and warm material honesty.",
    longDescription:
      "Designed for British American Tobacco Bangladesh at their leaf district in Kushtia, this facility serves as a waiting and training hub for tobacco farmers. The design draws from the traditional Bangladeshi courtyard (uthan) — a shared outdoor heart that organises the programme around a central green court. The facade is articulated with metal screens abstracting the form of tobacco leaves, lending the building a site-specific identity rooted in its agricultural context. Brick, timber, and steel are used in their honest expression, giving the project warmth and permanence.",
    client: "BAT Bangladesh",
    architect: "Archeground Ltd",
    type: "Institutional",
    concept: "Courtyard + Tobacco Leaf Facade",
    year: "2024",
    galleryLabels: [
      "View from Entry Gate",
      "Farmers Lounge Courtyard",
      "Lounge Interior",
      "Master Plan",
      "Plan in Scale",
    ],
    gallery: [
      `${BAT}/VIEW%20FROM%20ENTRY%20GATE.png`,
      `${BAT}/FARMERS%20LOUNGE%20COURTYARD%20ARCHEGROUND%20LTD.png`,
      `${BAT}/LOUNGE%20INTERIOR.png`,
      `${BAT}/MASTER%20PLAN.png`,
      `${BAT}/PALN%20IN%20SCALE.png`,
    ],
  },
  {
    id: 2,
    slug: "faculty-earth-sciences-engineering-university-of-dhaka",
    title: "Faculty of Earth Sciences & Engineering, University of Dhaka",
    category: "Interior Architecture",
    categoryId: "interior-architecture",
    location: "University of Dhaka",
    thumbnail: `${DIU}/DEAN%20ROOM.png`,
    description:
      "A comprehensive interior design for the Faculty of Earth & Environmental Science and Engineering & Technology Building — warm timber tones and refined detailing for academic excellence.",
    longDescription:
      "Commissioned by the University of Dhaka, this project covers 15,650 SFT across multiple faculty spaces including the Dean's Office, Waiting Area, Officer's Rooms, Conference Room, and Meeting Room. The design draws on a restrained material palette of warm oak veneer, off-white plaster, and dark metal accents — creating an atmosphere of scholarly authority balanced with contemporary clarity. Slatted ceiling elements and layered lighting give each room a distinct spatial identity while maintaining cohesion across the floor.",
    client: "University of Dhaka",
    architect: "arch INNER",
    type: "Institutional Interior",
    concept: "Academic Space — Earth Sciences Faculty",
    year: "2024",
    galleryAspectRatio: "4/3",
    galleryLabels: [
      "Dean's Room",
      "Dean's Room — View 2",
      "Officer's Room",
      "Conference Room",
      "Meeting Room",
      "Hall Room Plan",
    ],
    gallery: [
      `${DIU}/DEAN%20ROOM.png`,
      `${DIU}/DEAN%20ROOM%201.png`,
      `${DIU}/OFFICER%E2%80%99S%20FOR%20DEAN.png`,
      `${DIU}/CONFERENCE%20ROOM.png`,
      `${DIU}/MEETING%20ROOM.png`,
      `${DIU}/HALL%20ROOM%20PLAN.png`,
    ],
  },
  {
    id: 3,
    slug: "fervent-multiboard-chairman-floor",
    title: "Fervent Multiboard Industries — Chairman Floor",
    category: "Interior Architecture",
    categoryId: "interior-architecture",
    location: "Mohakhali C/A, Dhaka",
    thumbnail: `${FERVENT}/RECEPTION.png`,
    description:
      "An executive interior for a prominent industrial conglomerate — structured opulence expressed through bespoke millwork, curated stone finishes, and precision lighting.",
    longDescription:
      "The Chairman Floor of Fervent Multiboard Industries Ltd. spans a full executive level in Mohakhali, Dhaka. The brief called for a workplace that projects authority and refinement — a setting worthy of boardroom-level decision-making. The reception greets visitors with the company identity embedded in a dramatic slatted wood backdrop and warm chandelier. The Chairman's Room features a circular feature ceiling with ambient coffers, full-height joinery, and a panoramic city outlook. Supporting spaces — the lounge, director's room, and private dining — carry the same language: rich veneers, muted stone, and measured luxury.",
    client: "Fervent Multiboard Industries Ltd.",
    architect: "arch INNER",
    type: "Commercial Interior",
    concept: "Executive Chairman Floor",
    year: "2025",
    galleryAspectRatio: "4/3",
    galleryLabels: [
      "Reception",
      "Interior View — Chairman Room",
      "Reception Area — View 1",
      "Reception Area — View 2",
      "Reception Area — View 3",
      "Floor Plan",
    ],
    gallery: [
      `${FERVENT}/RECEPTION.png`,
      `${FERVENT}/INTERIOR%20VIEW%20CHAIRMAN%20ROOM.png`,
      `${FERVENT}/INTERIOR%20VIEW%20RECEPTION%20AREA.png`,
      `${FERVENT}/INTERIOR%20VIEW%20RECEPTION%20AREA_2.png`,
      `${FERVENT}/INTERIOR%20VIEW%20RECEPTION%20AREA_3.png`,
      `${FERVENT}/FLOOR%20PLAN.png`,
    ],
  },
  {
    id: 5,
    slug: "dhaka-bank-plc-kalatia-branch",
    title: "Dhaka Bank PLC — Kalatia Branch",
    category: "Interior Architecture",
    categoryId: "interior-architecture",
    location: "Kalatia, Keraniganj, Dhaka",
    thumbnail: `${DBPLC}/image.png`,
    description:
      "A full-branch interior for Dhaka Bank PLC at Kalatia — a calm, trust-inspiring banking environment built around warm wood tones, acoustic comfort, and clear spatial zoning for customers and staff.",
    longDescription:
      "Commissioned by Dhaka Bank PLC for their Kalatia Branch, this interior project covers the complete fit-out of a modern retail bank. The design is guided by the bank's brand ethos — 'Your Trust. Our Commitment.' — translated into a material palette of warm oak veneer, grey stone-finish tiles, and cream texture walls that communicate reliability without formality. The open banking floor is organised around a central teller counter with perforated timber cladding and under-counter lighting, flanked by a customer waiting lounge featuring blue upholstered seating beneath circular ring pendant lights. Glass-partitioned officer rooms and a dedicated meeting room maintain visual openness while providing acoustic separation. Wall graphics carrying the bank's vision, mission, and brand identity are integrated as spatial elements rather than afterthoughts. Floor finishes include Flotex carpet in the waiting zone and vinyl and ceramic tiles in the transactional areas — each zone coded by material.",
    client: "Dhaka Bank PLC",
    architect: "arch INNER",
    type: "Commercial Interior",
    concept: "Banking Excellence — Trust · Clarity · Warmth",
    year: "2026",
    galleryAspectRatio: "4/3",
    galleryLabels: ["View 1", "View 2", "View 3", "View 4", "View 5"],
    gallery: [
      `${DBPLC}/image.png`,
      `${DBPLC}/image%20copy.png`,
      `${DBPLC}/image%20copy%202.png`,
      `${DBPLC}/image%20copy%203.png`,
      `${DBPLC}/image%20copy%204.png`,
    ],
  },
  {
    id: 4,
    slug: "servisol-ites-office-interior",
    title: "Servisol ITES — Office Interior",
    category: "Interior Architecture",
    categoryId: "interior-architecture",
    location: "Bhai Bhai Plaza, Khilkhet, Dhaka-1229",
    thumbnail: `${IELTS}/WAITING%20AREA%20OP-1.png`,
    description:
      "A vibrant IT-enabled services office where bold colour zoning, acoustic panels, and open workstation planning create an energising environment for a growing tech workforce.",
    longDescription:
      "Covering 4,752 SFT across the second floor of Bhai Bhai Plaza, this office interior for Servisol ITES rejects corporate monotony in favour of dynamic energy. The reception makes an immediate brand statement — the SERVISOL ITES logo is set against a bold colour-block wall beneath a signature circular coved ceiling, framed by colourful modular seating. Director suites behind glass partitions feature geometric timber feature walls in warm oak, offering acoustic separation without visual heaviness. The sprawling workstation floor is planned for high-density IT operations: low-partition bays, integrated cable management, and an ever-present tech-themed mural that reinforces company identity. Material palette — flotex carpet, acoustic timber slats, fabric panels, and texture paint — is tuned to absorb noise and sustain long work hours.",
    client: "Servisol ITES",
    architect: "arch INNER",
    type: "Commercial Interior",
    concept: "Tech Office — Vibrant Collaborative Workspace",
    year: "2025",
    galleryAspectRatio: "4/3",
    galleryLabels: [
      "Waiting Area",
      "Director's Waiting",
      "Director's Room — Front",
      "Working Zone",
      "Working Zone — View 2",
      "Waiting",
      "2D Plan",
    ],
    gallery: [
      `${IELTS}/WAITING%20AREA%20OP-1.png`,
      `${IELTS}/DIRECTORS%20WAITING.png`,
      `${IELTS}/DIRECTORS%20RM%20FRONT.png`,
      `${IELTS}/WORKING%20ZONE.png`,
      `${IELTS}/WORKING%20ZONE%202.png`,
      `${IELTS}/WAITING.png`,
      `${IELTS}/2D%20PLAN.png`,
    ],
  },
];
