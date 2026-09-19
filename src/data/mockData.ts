import { Article, Show, Host, Song, VideoItem, SportsMatch, LeagueStanding } from '../types';

/**
 * ====================================================================
 * CONFIGURATION DU FLUX AUDIO DE RADIO SHIMA FM 95.9
 * ====================================================================
 * Serveur direct Icecast 2.4.4 : http://5.189.189.39:8000/shimafm.mp3
 * Pour les pages en HTTPS (navigateurs modernes), le proxy /api/stream
 * permet de relayer le flux sans blocage de contenu mixte (Mixed Content).
 */
export const DIRECT_STREAM_URL: string = "http://5.189.189.39:8000/shimafm.mp3";
export const RADIO_STREAM_URL: string = "/api/stream"; 

export const RADIO_INFO = {
  name: "SHIMA FM",
  frequency: "95.9 FM",
  slogan: "Ijambo kuri bose",
  location: "Rumonge, Burunga, Burundi 🇧🇮",
  currentShow: "Le Grand Matin Shima (06h00 – 10h00)",
  currentHost: "Jean-Pierre Niyonzima & Carine Irakoze",
  phone: "+257 22 25 95 90",
  whatsapp: "+257 79 95 90 00",
  email: "contact@shimafm.org",
  redactionEmail: "redaction@shimafm.org",
  commercialEmail: "commercial@shimafm.org",
  address: "Quartier Burunga, Rumonge, Burundi",
  socials: {
    facebook: "https://facebook.com/shimafm",
    youtube: "https://www.youtube.com/@RadioShimaFM",
    instagram: "https://instagram.com/shimafm",
    tiktok: "https://tiktok.com/@shimafm",
    twitter: "https://twitter.com/shimafm",
    telegram: "https://t.me/shimafm"
  }
};

export const BURUNDI_PROVINCES = [
  "Toutes",
  "Bujumbura",
  "Gitega",
  "Rumonge",
  "Bururi",
  "Ngozi",
  "Muyinga",
  "Makamba",
  "Rutana",
  "Ruyigi",
  "Cibitoke",
  "Kayanza",
  "Muramvya",
  "Mwaro",
  "Karuzi",
  "Kirundo",
  "Bubanza",
  "Cankuzo"
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "sommet-economique-bujumbura-agriculture-transformation-locale",
    title: "Sommet économique de Bujumbura : Un plan stratégique pour valoriser les filières café et thé burundaises",
    category: "economie",
    subcategory: "Agriculture & Commerce",
    province: "Bujumbura",
    summary: "Réunis dans la capitale économique, investisseurs, coopératives et décideurs publics ont adopté une feuille de route axée sur la transformation locale et l'accès aux marchés régionaux de l'EAC.",
    content: [
      "Le grand forum économique annuel de Bujumbura a fermé ses portes ce mardi sur une note d'espoir pour les producteurs agricoles burundais. Durant trois journées intenses de concertations, plus de trois cents acteurs économiques nationaux et internationaux se sont penchés sur les mécanismes de financement de l'agro-industrie.",
      "Au centre des débats : la modernisation des chaînes de valeur du café d'excellence et du thé, deux piliers majeurs des exportations du Burundi. Les représentants des coopératives de Kayanza et de Ngozi ont plaidé pour un allègement des démarches d'octroi de crédits aux petites exploitations agricoles familiales.",
      "Le ministre en charge de l'Industrie a annoncé la mise en place d'un fonds de garantie pour les jeunes entrepreneurs désireux de s'orienter vers le conditionnement et la digitalisation des circuits courts. Ce dispositif permettra de créer plus de dix mille emplois directs d'ici l'année prochaine.",
      "« Le Burundi regorge de talents et de terres fertiles. Notre devoir est d'accompagner nos producteurs vers des standards de certification biologique et de conquérir durablement le grand marché de la Communauté d'Afrique de l'Est », a souligné un expert économique présent aux travaux."
    ],
    author: "Jean-Pierre Niyonzima",
    authorRole: "Rédacteur en chef Économie",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    date: "16 Septembre 2026",
    time: "08:45",
    readTime: "4 min",
    views: 8420,
    likes: 312,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80",
    caption: "Vue des débats du forum économique à l'Hôtel Club du Lac Tanganyika.",
    tags: ["Économie", "Café", "Burundi", "Agriculture", "Bujumbura", "Emploi"],
    isHero: true,
    isPopular: true,
    isTrending: true
  },
  {
    id: "art-2",
    slug: "gitega-nouvelle-dynamique-urbaine-capitale-politique",
    title: "Gitega : Les travaux d'aménagement de la capitale politique s'accélèrent avec de nouvelles infrastructures",
    category: "burundi",
    subcategory: "Développement local",
    province: "Gitega",
    summary: "De nouveaux axes routiers bitumés et l'extension du réseau électrique renforcent le statut administratif de Gitega, attirant un nombre croissant de services publics.",
    content: [
      "Au cœur du pays, la ville de Gitega connaît une mutation remarquable. Les chantiers d'élargissement des artères principales reliant le centre administratif aux collines environnantes avancent à un rythme soutenu.",
      "Les autorités municipales ont inauguré une nouvelle station de traitement des eaux et lancé un programme de reboisement urbain pour préserver le paysage vallonné caractéristique de la province.",
      "Pour les commerçants du grand marché central de Gitega, ces aménagements facilitent l'acheminement des vivres en provenance de Ruyigi et de Karuzi, consolidant la place de carrefour commercial de la cité."
    ],
    author: "Aimé Hakizimana",
    authorRole: "Correspondant Régions",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    date: "16 Septembre 2026",
    time: "07:15",
    readTime: "3 min",
    views: 6180,
    likes: 245,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
    caption: "Chantiers de voirie urbaine et bâtiments administratifs à Gitega.",
    tags: ["Burundi", "Gitega", "Urbanisme", "Infrastructures"],
    isHeroSecondary: true,
    isPopular: true
  },
  {
    id: "art-3",
    slug: "primus-ligue-football-choc-sommet-vital-o-aigle-noir",
    title: "Primus Ligue : Vital'O FC s'impose avec panache face à Aigle Noir dans un stade plein à craquer",
    category: "sports",
    subcategory: "Football",
    province: "Bujumbura",
    summary: "Dans une ambiance festive au Stade Intwari de Bujumbura, les Mauve et Blanc ont remporté le derby sur le score serré de 2-1 après un suspense insoutenable.",
    content: [
      "La douzième journée de la Primus Ligue a tenu toutes ses promesses ce dimanche après-midi. Le classique opposant Vital'O FC à Aigle Noir de Makamba a offert un spectacle de haute volée aux vingt mille spectateurs massés dans les tribunes.",
      "Après une première période cadenassée, c'est l'attaquant vedette de Vital'O qui a débloqué la situation d'une reprise fulgurante à la 58e minute, avant que Makamba n'égalise sur un penalty contesté. Le but victorieux est intervenu dans les arrêts de jeu.",
      "Grâce à ce succès précieux, Vital'O conforte sa place sur le podium et prépare son prochain déplacement à Ngozi avec un moral au zénith."
    ],
    author: "David Ndayisenga",
    authorRole: "Chef de rubrique Sports",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    date: "15 Septembre 2026",
    time: "19:20",
    readTime: "4 min",
    views: 7950,
    likes: 490,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80",
    caption: "Explosion de joie des supporters au coup de sifflet final.",
    tags: ["Sports", "Football", "Primus Ligue", "Bujumbura", "Vital'O"],
    isHeroSecondary: true,
    isTrending: true
  },
  {
    id: "art-4",
    slug: "culture-tambourinaires-gishora-patrimoine-mondial-burundi",
    title: "Patrimoine : Les Tambourinaires de Gishora émerveillent le public international lors du Festival d'Été",
    category: "culture",
    subcategory: "Traditions & Arts",
    province: "Gitega",
    summary: "Le sanctuaire des tambours sacrés de Gishora continue d'attirer les regards du monde entier, célébrant l'art ancestral inscrit au patrimoine immatériel de l'UNESCO.",
    content: [
      "Au sommet de la colline de Gishora, le son majestueux de l'Ingoma résonne avec une puissance solennelle qui transcende les générations.",
      "À l'occasion du grand rassemblement culturel national, les maîtres-tambourinaires ont offert une démonstration chorégraphique et athlétique époustouflante, rappelant la symbolique royale et pacifique de cet instrument sacré.",
      "Le ministère de la Jeunesse et de la Culture a annoncé de nouveaux projets éducatifs pour enseigner la facture traditionnelle des tambours aux jeunes écoliers à travers tout le pays."
    ],
    author: "Carine Irakoze",
    authorRole: "Chroniqueuse Culture & Musique",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    date: "15 Septembre 2026",
    time: "14:10",
    readTime: "5 min",
    views: 5410,
    likes: 380,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
    caption: "Spectacle rituel des Tambourinaires royaux à Gishora.",
    tags: ["Culture", "Tambours", "Gishora", "Patrimoine", "UNESCO"],
    isHeroSecondary: true
  },
  {
    id: "art-5",
    slug: "sante-protection-lac-tanganyika-bujumbura-environnement",
    title: "Environnement : Grande mobilisation citoyenne pour la dépollution des berges du lac Tanganyika",
    category: "societe",
    subcategory: "Environnement & Santé",
    province: "Bujumbura",
    summary: "Des centaines de volontaires, d'étudiants et d'associations locales ont nettoyé le littoral du lac Tanganyika, joyau de biodiversité douce mondiale.",
    content: [
      "Deuxième plus grand lac d'Afrique par le volume, le lac Tanganyika abrite une faune aquatique unique au monde. Face aux pressions des déchets plastiques urbains, les habitants de Bujumbura se sont mobilisés ce samedi matin dès 6 heures.",
      "Munis de gants et de sacs de tri, les bénévoles ont ramassé plus de cinq tonnes de résidus plastiques qui seront recyclés par une PME burundaise spécialisée dans les pavés écologiques.",
      "L'initiative a reçu les félicitations des scientifiques de l'Université du Burundi, qui appellent à une vigilance collective permanente."
    ],
    author: "Cynthia Nshimirimana",
    authorRole: "Journaliste Société & Santé",
    date: "14 Septembre 2026",
    time: "11:30",
    readTime: "3 min",
    views: 4200,
    likes: 215,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    tags: ["Environnement", "Société", "Lac Tanganyika", "Bujumbura"],
    isPopular: true
  },
  {
    id: "art-6",
    slug: "politique-parlement-vote-budget-investissements-regions",
    title: "Parlement : Adoption d'un budget renforcé pour l'électrification rurale et les centres de santé en province",
    category: "politique",
    subcategory: "Institutions & Gouvernement",
    province: "Gitega",
    summary: "Les députés réunis à l'hémicycle de Gitega ont voté à une large majorité la loi de finances rectificative, accordant la priorité aux désenclavements énergétiques.",
    content: [
      "Dans un climat constructif, l'Assemblée Nationale a adopté le projet de loi de finances qui consacre une hausse substantielle des crédits alloués aux communes rurales.",
      "Parmi les priorités votées : le renforcement des centrales solaires dans les provinces de Kirundo, Ruyigi et Cankuzo, ainsi que l'approvisionnement régulier des pharmacies provinciales en médicaments essentiels.",
      "Les parlementaires ont insisté sur la mise en place de mécanismes rigoureux de suivi citoyen pour garantir la livraison ponctuelle des ouvrages publics."
    ],
    author: "Jean-Pierre Niyonzima",
    authorRole: "Rédacteur en chef Économie & Politique",
    date: "14 Septembre 2026",
    time: "16:40",
    readTime: "4 min",
    views: 3890,
    likes: 195,
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80",
    tags: ["Politique", "Parlement", "Gitega", "Budget", "Développement"]
  },
  {
    id: "art-7",
    slug: "musique-nouvelle-vague-artistes-burundais-afrobeat-international",
    title: "Musique : La jeunesse burundaise impose son empreinte sur la scène musicale est-africaine",
    category: "musique",
    subcategory: "Tendances & Sorties",
    province: "Bujumbura",
    summary: "Fusionnant rythmes traditionnels burundais et sonorités Afropop modernes, les nouveaux artistes de Bujumbura caracolent en tête des playlists de Nairobi à Kigali.",
    content: [
      "L'industrie musicale burundaise vit un véritable âge d'or. Portée par des studios de production créatifs et l'émergence de plateformes de streaming, la nouvelle vague de musiciens locaux repousse les frontières.",
      "Dans l'émission Hit Music Shima diffusée chaque après-midi sur 95.9 FM, les auditeurs plébiscitent des collaborations inédites mêlant kirundi, swahili et français.",
      "Plusieurs producteurs est-africains annoncent la signature d'accords de distribution avec des collectifs d'artistes issus des quartiers de Buyenzi, Bwiza et Ngagara."
    ],
    author: "Carine Irakoze",
    authorRole: "Chroniqueuse Culture & Musique",
    date: "13 Septembre 2026",
    time: "17:00",
    readTime: "3 min",
    views: 9240,
    likes: 670,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    tags: ["Musique", "Afrobeat", "Burundi", "Shima FM", "Artistes"],
    isPopular: true,
    isTrending: true
  },
  {
    id: "art-8",
    slug: "rumonge-developpement-filiere-huile-palme-pecheurs",
    title: "Rumonge : Récoltes record d'huile de palme et modernisation des débarcadères de pêcheurs",
    category: "burundi",
    subcategory: "Économie littorale",
    province: "Rumonge",
    summary: "Bordée par les eaux poissonneuses et les palmeraies verdoyantes, la province de Rumonge affiche une belle vitalité grâce aux coopératives de transformation.",
    content: [
      "Sur les rives du lac Tanganyika à Rumonge, le ballet des pirogues rentrant à l'aube annonce une saison de pêche prometteuse pour les fameux 'ndagala' et 'mukeke'.",
      "Dans le même temps, les petites huileries artisanales ont bénéficié de nouvelles presses hydrauliques fournies par un programme d'appui à l'artisanat rural.",
      "Les commerçants de la région écoulent désormais leur production jusqu'à Bujumbura par voie terrestre rénovée en moins de deux heures."
    ],
    author: "Aimé Hakizimana",
    authorRole: "Correspondant Régions",
    date: "13 Septembre 2026",
    time: "10:15",
    readTime: "3 min",
    views: 3100,
    likes: 154,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    tags: ["Burundi", "Rumonge", "Pêche", "Huile de palme"]
  },
  {
    id: "art-9",
    slug: "kayanza-cooperatives-cafecoles-medailles-or-qualite",
    title: "Kayanza : Les cafés d'altitude burundais primés lors d'une dégustation internationale",
    category: "economie",
    subcategory: "Commerce équitable",
    province: "Kayanza",
    summary: "Grâce à un microclimat volcanique exceptionnel et au soin apporté au dépulpage, trois stations de lavage de Kayanza décrochent les notes les plus élevées du concours.",
    content: [
      "Les contreforts verdoyants de Kayanza ont encore démontré leur suprématie gustative. Lors du concours de cupping rassemblant des torréfacteurs d'Europe et d'Asie, les échantillons d'Arabica Bourbon ont atteint des scores supérieurs à 88 points.",
      "Ce résultat récompense des années d'efforts de milliers de familles caféicultrices regroupées au sein de coopératives solidaires.",
      "La radio SHIMA FM s'est rendue sur place pour recueillir les témoignages émus des cueilleuses de cerises mûres, fières de voir leur labeur salué sur tous les continents."
    ],
    author: "Jean-Pierre Niyonzima",
    authorRole: "Rédacteur en chef",
    date: "12 Septembre 2026",
    time: "15:20",
    readTime: "4 min",
    views: 4500,
    likes: 280,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
    tags: ["Kayanza", "Café", "Burundi", "Économie", "Exportations"]
  }
];

export const SHOWS_DATA: Show[] = [
  {
    id: "show-1",
    title: "Le Grand Matin Shima",
    host: "Jean-Pierre Niyonzima & Carine Irakoze",
    hostRole: "Journalistes Matinale",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    time: "06h00 – 10h00",
    days: "Lundi au Vendredi",
    description: "Le rendez-vous d'information incontournable pour bien démarrer votre journée au Burundi : revue de presse, météo, point circulation, actualités nationales et internationales.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80",
    category: "Information & Débats",
    isOnAirNow: true
  },
  {
    id: "show-2",
    title: "Hit Music Shima (Top 95.9)",
    host: "DJ Bryan & Cynthia Nshimirimana",
    hostRole: "Animateurs Musicaux",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    time: "14h00 – 17h00",
    days: "Lundi au Samedi",
    description: "Le meilleur de la musique burundaise, afrobeat, amapiano et hits internationaux avec dédicaces en direct et classement des charts.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    category: "Musique & Divertissement",
    isOnAirNow: false
  },
  {
    id: "show-3",
    title: "Le Débat Citoyen",
    host: "Aimé Hakizimana",
    hostRole: "Grand Reporter",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    time: "10h00 – 12h00",
    days: "Mercredi & Vendredi",
    description: "Une tribune ouverte aux auditeurs et aux spécialistes pour décrypter les questions de société, l'éducation, l'économie et le vivre-ensemble au Burundi.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&auto=format&fit=crop&q=80",
    category: "Société & Citoyenneté",
    isOnAirNow: false
  },
  {
    id: "show-4",
    title: "Shima Sport Express",
    host: "David Ndayisenga",
    hostRole: "Journaliste Sport",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    time: "18h00 – 19h30",
    days: "Tous les jours",
    description: "Toute l'actualité de la Primus Ligue, du basketball, des sélections nationales Intamba et des grands championnats européens avec analyses tactiques.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80",
    category: "Sports",
    isOnAirNow: false
  },
  {
    id: "show-5",
    title: "Rythmes & Traditions d'Afrique",
    host: "Pascal Nkurunziza",
    hostRole: "Chroniqueur Patrimoine",
    hostAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    time: "20h00 – 22h30",
    days: "Samedi & Dimanche",
    description: "Immersion dans les contes, les tambours sacrés, la poésie kirundi et les trésors musicaux des différentes contrées du Burundi.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
    category: "Culture & Histoire",
    isOnAirNow: false
  }
];

export const HOSTS_DATA: Host[] = [
  {
    id: "host-1",
    name: "Jean-Pierre Niyonzima",
    role: "Rédacteur en chef & Animateur Matinale",
    show: "Le Grand Matin Shima (06h - 10h)",
    bio: "Journaliste chevronné fort de 15 années d'expérience dans les médias audiovisuels burundais. Spécialiste des questions économiques et géopolitiques régionales.",
    schedule: "Lundi au Vendredi, 06h00 – 10h00",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    social: {
      twitter: "https://twitter.com/shimafm",
      facebook: "https://facebook.com/shimafm",
      email: "jp.niyonzima@shimafm.org"
    }
  },
  {
    id: "host-2",
    name: "Carine Irakoze",
    role: "Journaliste Culture, Musique & Société",
    show: "Le Grand Matin Shima & Culture Mag",
    bio: "Passionnée par la promotion des artistes du Burundi et l'autonomisation des femmes. Elle anime la matinale avec dynamisme et bienveillance.",
    schedule: "Lundi au Vendredi, 06h00 – 10h00",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    social: {
      instagram: "https://instagram.com/shimafm",
      twitter: "https://twitter.com/shimafm",
      email: "carine.irakoze@shimafm.org"
    }
  },
  {
    id: "host-3",
    name: "David Ndayisenga",
    role: "Chef de la rédaction Sport",
    show: "Shima Sport Express",
    bio: "La voix incontournable des stades au Burundi. Il commente avec ferveur les matchs de la Primus Ligue et suit les athlètes burundais à travers le monde.",
    schedule: "Tous les jours, 18h00 – 19h30",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    social: {
      facebook: "https://facebook.com/shimafm",
      twitter: "https://twitter.com/shimafm",
      email: "sport@shimafm.org"
    }
  },
  {
    id: "host-4",
    name: "Aimé Hakizimana",
    role: "Grand Reporter & Modérateur Débats",
    show: "Le Débat Citoyen",
    bio: "Parcourt les 18 provinces du Burundi à l'écoute des préoccupations des populations locales. Modérateur rigoureux et impartial de la grande tribune hebdomadaire.",
    schedule: "Mercredi & Vendredi, 10h00 – 12h00",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    social: {
      twitter: "https://twitter.com/shimafm",
      email: "aime.h@shimafm.org"
    }
  }
];

export const SONGS_DATA: Song[] = [
  {
    id: "song-1",
    title: "Uburundi Bwanje (Mon Burundi)",
    artist: "Ensemble Intwari & Chorale Gitega",
    genre: "Burundi",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
    duration: "3:45",
    likes: 1240,
    plays: 18450,
    isTopBurundi: true,
    isTrending: true
  },
  {
    id: "song-2",
    title: "Ntaco Mbaye (Harmonie)",
    artist: "Sat-B feat. Magic Stars",
    genre: "Afrobeat",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80",
    duration: "3:18",
    likes: 2150,
    plays: 28900,
    isTopBurundi: true,
    isTrending: true
  },
  {
    id: "song-3",
    title: "Sawa Sawa Bujumbura",
    artist: "Vichou Love",
    genre: "Afro-Fusion",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
    duration: "3:30",
    likes: 980,
    plays: 14200,
    isTopBurundi: true
  },
  {
    id: "song-4",
    title: "Igitangaza (Grâce)",
    artist: "Chant d'Espérance Burundi",
    genre: "Gospel",
    cover: "https://images.unsplash.com/photo-1447069387593-a5de0764497e?w=300&auto=format&fit=crop&q=80",
    duration: "4:12",
    likes: 1650,
    plays: 19800,
    isTrending: true
  },
  {
    id: "song-5",
    title: "Amapiano Vibes Tanganyka",
    artist: "DJ Master Shima",
    genre: "Amapiano",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&auto=format&fit=crop&q=80",
    duration: "4:05",
    likes: 870,
    plays: 12600,
    isTrending: true
  },
  {
    id: "song-6",
    title: "Ngagara Freestyle",
    artist: "Young Legend Buja",
    genre: "Hip-Hop",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80",
    duration: "2:55",
    likes: 720,
    plays: 11100
  }
];

export const VIDEOS_DATA: VideoItem[] = [
  {
    id: "m5rExuXNP4A",
    youtubeId: "m5rExuXNP4A",
    title: "Waruziko Intahe yo ku mugina ishobora gutorera inyishu amatati avuye ku caha",
    category: "Société",
    duration: "14:22",
    views: 1840,
    date: "Il y a 3 mois",
    thumbnail: "https://i.ytimg.com/vi/m5rExuXNP4A/hqdefault.jpg",
    description: "Ikiganiro n'ubusobanuro ku bijanye n'uko Intahe yo ku mugina ishobora gutorera inyishu amatati avuye ku caha mu gushinga indishi n'ubutungane bw'abanyagihugu mu ntara ya Rumonge na Burundi hose."
  },
  {
    id: "w6V2-3DRoQo",
    youtubeId: "w6V2-3DRoQo",
    title: "Umuvyeyi asaba ubutungane inyuma yaho umwana wiwe ajanywe mugihugu ca Tanzaniya",
    category: "Actualités",
    duration: "11:05",
    views: 2450,
    date: "Il y a 3 mois",
    thumbnail: "https://i.ytimg.com/vi/w6V2-3DRoQo/hqdefault.jpg",
    description: "Raporo idasanzwe: Umuvyeyi asaba ubutungane n'ubutabazi bw'amategeko inyuma y'aho umwana wiwe ajanywe mu gihugu ca Tanzaniya. Inkuru yakurikiranywe n'abamenyeshamakuru ba Radio Shima FM 95.9."
  },
  {
    id: "YlSduvJz2sI",
    youtubeId: "YlSduvJz2sI",
    title: "Abenegihugu bidoga ko umuyagankuba bafise wubatswe na ABR ataco ubafasha",
    category: "Économie",
    duration: "08:47",
    views: 3120,
    date: "Il y a 4 mois",
    thumbnail: "https://i.ytimg.com/vi/YlSduvJz2sI/hqdefault.jpg",
    description: "Abenegihugu bo mu ntara ya Rumonge baridoga ko umuyagankuba wubatswe na ABR ataco ubafasha mu buzima bwabo bwa minsi yose n'iterambere ry'ubutunzi. Ijwi ry'abanyagihugu kuri Radio Shima FM 95.9."
  },
  {
    id: "mG2C69uuy9I",
    youtubeId: "mG2C69uuy9I",
    title: "#Rumonge: Abanyagihugu bo kumu tumba #Mwange Zone #Kizuka",
    category: "Burundi",
    duration: "06:18",
    views: 1980,
    date: "Il y a 4 mois",
    thumbnail: "https://i.ytimg.com/vi/mG2C69uuy9I/hqdefault.jpg",
    description: "Amakuru yo mu ntara ya Rumonge: Abanyagihugu bo ku mutumba Mwange muri Zone Kizuka baganira n'abamenyeshamakuru ba Radio Shima FM ku bibazo by'iterambere n'imibereho yabo."
  }
];

export const SPORTS_MATCHES: SportsMatch[] = [
  {
    id: "m-1",
    homeTeam: "Vital'O FC",
    awayTeam: "Aigle Noir Makamba",
    homeScore: 2,
    awayScore: 1,
    league: "Primus Ligue (J12)",
    status: "Terminé",
    date: "15 Sep 2026",
    time: "15:00"
  },
  {
    id: "m-2",
    homeTeam: "Messager Ngozi",
    awayTeam: "Musongati FC",
    homeScore: 1,
    awayScore: 1,
    league: "Primus Ligue (J12)",
    status: "Terminé",
    date: "15 Sep 2026",
    time: "15:00"
  },
  {
    id: "m-3",
    homeTeam: "Rukinzo FC",
    awayTeam: "Flambeau du Centre",
    homeScore: 0,
    awayScore: 2,
    league: "Primus Ligue (J12)",
    status: "Terminé",
    date: "14 Sep 2026",
    time: "15:00"
  },
  {
    id: "m-4",
    homeTeam: "Bumamuru FC",
    awayTeam: "Kayanza United",
    homeScore: 0,
    awayScore: 0,
    league: "Primus Ligue (J13)",
    status: "À venir",
    date: "20 Sep 2026",
    time: "15:30"
  }
];

export const SPORTS_STANDINGS: LeagueStanding[] = [
  { rank: 1, team: "Flambeau du Centre", played: 12, won: 8, draw: 3, lost: 1, points: 27 },
  { rank: 2, team: "Vital'O FC", played: 12, won: 8, draw: 2, lost: 2, points: 26 },
  { rank: 3, team: "Messager Ngozi", played: 12, won: 7, draw: 4, lost: 1, points: 25 },
  { rank: 4, team: "Aigle Noir Makamba", played: 12, won: 6, draw: 3, lost: 3, points: 21 },
  { rank: 5, team: "Musongati FC", played: 12, won: 5, draw: 5, lost: 2, points: 20 },
  { rank: 6, team: "Rukinzo FC", played: 12, won: 5, draw: 2, lost: 5, points: 17 }
];

export const INITIAL_SONGS: Song[] = SONGS_DATA;
export const INITIAL_VIDEOS: VideoItem[] = VIDEOS_DATA;
