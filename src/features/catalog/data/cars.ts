export type LocaleCode = "ru" | "en" | "kz";

type LocalizedText = Record<LocaleCode, string>;
type LocalizedList = Record<LocaleCode, string[]>;

export interface CarBase {
  slug: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  fuel: "petrol" | "diesel" | "hybrid";
  seats: number;
  power: string;
  engine: string;
  color: string;
  category: LocalizedText;
  transmission: LocalizedText;
  description: LocalizedText;
  features: LocalizedList;
  image: string;
  featured: boolean;
}

const automatic: LocalizedText = {
  ru: "Автомат",
  en: "Automatic",
  kz: "Автомат",
};

const business: LocalizedText = {
  ru: "Бизнес",
  en: "Business",
  kz: "Бизнес",
};

const premiumSuv: LocalizedText = {
  ru: "Премиум SUV",
  en: "Premium SUV",
  kz: "Премиум SUV",
};

const luxury: LocalizedText = {
  ru: "Люкс",
  en: "Luxury",
  kz: "Люкс",
};

const minivan: LocalizedText = {
  ru: "Минивэн",
  en: "Minivan",
  kz: "Минивэн",
};

const executive: LocalizedText = {
  ru: "Представительский",
  en: "Executive",
  kz: "Өкілдік",
};

export const carsBase: CarBase[] = [
  {
    slug: "toyota-land-cruiser-200",
    brand: "Toyota",
    model: "Land Cruiser 200",
    year: 2010,
    pricePerDay: 55000,
    fuel: "petrol",
    seats: 7,
    power: "249",
    engine: "4.0 л",
    color: "Черный",
    category: premiumSuv,
    transmission: automatic,
    image: "/cars/crusier200.png",
    featured: false,
    description: {
      ru: "Черный Land Cruiser 200 в рестайлинговом кузове: крупный, комфортный и уверенный внедорожник для города, трассы и поездок за город.",
      en: "Black Toyota Land Cruiser 200 facelift: a large, comfortable and confident SUV for city, highway and out-of-town trips.",
      kz: "Қара Toyota Land Cruiser 200 рестайлинг: қалаға, трассаға және қала сыртындағы сапарларға ыңғайлы үлкен SUV.",
    },
    features: {
      ru: ["4.0 бензин", "Полный привод", "7 мест", "Кожаный салон"],
      en: ["4.0 petrol", "All-wheel drive", "7 seats", "Leather interior"],
      kz: ["4.0 бензин", "Толық жетек", "7 орын", "Былғары салон"],
    },
  },
  {
    slug: "toyota-camry-55",
    brand: "Toyota",
    model: "Camry 55",
    year: 2016,
    pricePerDay: 28000,
    fuel: "petrol",
    seats: 5,
    power: "181",
    engine: "2.5 л",
    color: "Черный",
    category: business,
    transmission: automatic,
    image: "/cars/camry55.png",
    featured: false,
    description: {
      ru: "Черная Camry 55 европейской сборки с мотором 2.5 л. Практичный бизнес-седан для встреч, поездок по городу и трассы.",
      en: "Black European-spec Camry 55 with a 2.5L engine. A practical business sedan for meetings, city use and highway trips.",
      kz: "2.5 л қозғалтқышы бар қара Camry 55. Қалаға, кездесулерге және трассаға ыңғайлы бизнес-седан.",
    },
    features: {
      ru: ["2.5 бензин", "Европеец", "Климат-контроль", "Комфортный салон"],
      en: ["2.5 petrol", "European spec", "Climate control", "Comfort interior"],
      kz: ["2.5 бензин", "Еуропалық нұсқа", "Климат-бақылау", "Жайлы салон"],
    },
  },
  {
    slug: "lexus-lx-470",
    brand: "Lexus",
    model: "LX 470",
    year: 2003,
    pricePerDay: 42000,
    fuel: "petrol",
    seats: 7,
    power: "235",
    engine: "4.7 л",
    color: "Черный",
    category: premiumSuv,
    transmission: automatic,
    image: "/cars/lx470.png",
    featured: false,
    description: {
      ru: "Черный Lexus LX 470 2003 года с V8 4.7 л. Надежный рамный внедорожник с мягким ходом и статусным видом.",
      en: "Black 2003 Lexus LX 470 with a 4.7L V8. A reliable body-on-frame SUV with a soft ride and premium presence.",
      kz: "4.7 л V8 қозғалтқышы бар қара Lexus LX 470. Жұмсақ жүрісі бар сенімді рамалық SUV.",
    },
    features: {
      ru: ["4.7 бензин", "V8", "Полный привод", "7 мест"],
      en: ["4.7 petrol", "V8", "All-wheel drive", "7 seats"],
      kz: ["4.7 бензин", "V8", "Толық жетек", "7 орын"],
    },
  },
  {
    slug: "lexus-lx-570",
    brand: "Lexus",
    model: "LX 570",
    year: 2016,
    pricePerDay: 75000,
    fuel: "petrol",
    seats: 7,
    power: "367",
    engine: "5.7 л",
    color: "Черный",
    category: premiumSuv,
    transmission: automatic,
    image: "/cars/lx570.png",
    featured: true,
    description: {
      ru: "Lexus LX 570 для тех, кому нужен большой премиальный внедорожник: мощный V8, высокий комфорт и солидная посадка.",
      en: "Lexus LX 570 for clients who need a large premium SUV: powerful V8, high comfort and a commanding presence.",
      kz: "Үлкен премиум SUV керек клиенттерге арналған Lexus LX 570: қуатты V8, жоғары жайлылық және салмақты көрініс.",
    },
    features: {
      ru: ["5.7 бензин", "V8", "Премиум салон", "Полный привод"],
      en: ["5.7 petrol", "V8", "Premium interior", "All-wheel drive"],
      kz: ["5.7 бензин", "V8", "Премиум салон", "Толық жетек"],
    },
  },
  {
    slug: "lexus-lx-600",
    brand: "Lexus",
    model: "LX 600",
    year: 2022,
    pricePerDay: 120000,
    fuel: "petrol",
    seats: 7,
    power: "409",
    engine: "3.5 л twin-turbo",
    color: "Черный",
    category: premiumSuv,
    transmission: automatic,
    image: "/cars/lx600.png",
    featured: true,
    description: {
      ru: "Новый флагман Lexus LX 600: современный салон, турбомотор и максимальный комфорт для представительских поездок.",
      en: "The modern Lexus LX 600 flagship: refined cabin, turbo engine and maximum comfort for executive trips.",
      kz: "Жаңа Lexus LX 600: заманауи салон, турбо қозғалтқыш және өкілдік сапарларға жоғары жайлылық.",
    },
    features: {
      ru: ["Twin-turbo", "7 мест", "Премиум салон", "Современная оптика"],
      en: ["Twin-turbo", "7 seats", "Premium interior", "Modern lighting"],
      kz: ["Twin-turbo", "7 орын", "Премиум салон", "Заманауи оптика"],
    },
  },
  {
    slug: "maserati-ghibli-2018",
    brand: "Maserati",
    model: "Ghibli",
    year: 2018,
    pricePerDay: 95000,
    fuel: "petrol",
    seats: 5,
    power: "350",
    engine: "3.0 л twin-turbo",
    color: "Темно-серый",
    category: luxury,
    transmission: automatic,
    image: "/cars/ghibli.png",
    featured: true,
    description: {
      ru: "Темно-серый Maserati Ghibli 2018 года с 3.0 twin-turbo. Авто для яркого выезда, съемок и особых событий.",
      en: "Dark grey 2018 Maserati Ghibli with a 3.0 twin-turbo engine. A car for special events, shoots and standout arrivals.",
      kz: "3.0 twin-turbo қозғалтқышы бар қою сұр Maserati Ghibli 2018. Ерекше іс-шаралар мен түсірілімдерге арналған көлік.",
    },
    features: {
      ru: ["3.0 twin-turbo", "Спортивный характер", "Премиум салон", "Итальянский стиль"],
      en: ["3.0 twin-turbo", "Sport character", "Premium interior", "Italian style"],
      kz: ["3.0 twin-turbo", "Спорт мінез", "Премиум салон", "Итальян стилі"],
    },
  },
  {
    slug: "toyota-camry-70",
    brand: "Toyota",
    model: "Camry 70",
    year: 2020,
    pricePerDay: 35000,
    fuel: "petrol",
    seats: 5,
    power: "181",
    engine: "2.5 л",
    color: "Белый / черный",
    category: business,
    transmission: automatic,
    image: "/cars/camry70.png",
    featured: true,
    description: {
      ru: "Camry 70 - свежий бизнес-седан с аккуратным внешним видом, удобным салоном и понятной надежностью Toyota.",
      en: "Camry 70 is a clean business sedan with a comfortable cabin and Toyota reliability.",
      kz: "Camry 70 - ыңғайлы салоны және Toyota сенімділігі бар бизнес-седан.",
    },
    features: {
      ru: ["2.5 бензин", "Бизнес-класс", "Камера заднего вида", "Климат-контроль"],
      en: ["2.5 petrol", "Business class", "Rear camera", "Climate control"],
      kz: ["2.5 бензин", "Бизнес класс", "Артқы камера", "Климат-бақылау"],
    },
  },
  {
    slug: "toyota-camry-80",
    brand: "Toyota",
    model: "Camry 80",
    year: 2024,
    pricePerDay: 50000,
    fuel: "petrol",
    seats: 5,
    power: "203",
    engine: "2.5 л",
    color: "Белый / черный",
    category: business,
    transmission: automatic,
    image: "/cars/camry80.png",
    featured: true,
    description: {
      ru: "Camry 80 нового поколения для клиентов, которым нужен свежий вид, комфорт и уверенный бизнес-класс.",
      en: "New-generation Camry 80 for clients who want a fresh look, comfort and business-class feel.",
      kz: "Жаңа буын Camry 80: жаңа көрініс, жайлылық және бизнес-класс деңгейі.",
    },
    features: {
      ru: ["Новый кузов", "2.5 бензин", "Современный салон", "Комфортная подвеска"],
      en: ["New body", "2.5 petrol", "Modern interior", "Comfort suspension"],
      kz: ["Жаңа кузов", "2.5 бензин", "Заманауи салон", "Жайлы аспа"],
    },
  },
  {
    slug: "hyundai-sonata",
    brand: "Hyundai",
    model: "Sonata",
    year: 2023,
    pricePerDay: 32000,
    fuel: "petrol",
    seats: 5,
    power: "180",
    engine: "2.5 л",
    color: "Белый / черный",
    category: business,
    transmission: automatic,
    image: "/cars/sonata2023.png",
    featured: false,
    description: {
      ru: "Свежая Hyundai Sonata как альтернатива Camry: просторный салон, современный дизайн и комфорт на каждый день.",
      en: "A fresh Hyundai Sonata as a Camry alternative: spacious cabin, modern design and everyday comfort.",
      kz: "Camry-ге балама жаңа Hyundai Sonata: кең салон, заманауи дизайн және күнделікті жайлылық.",
    },
    features: {
      ru: ["2.5 бензин", "Просторный салон", "Современный дизайн", "Экономичный расход"],
      en: ["2.5 petrol", "Spacious cabin", "Modern design", "Efficient fuel use"],
      kz: ["2.5 бензин", "Кең салон", "Заманауи дизайн", "Үнемді шығын"],
    },
  },
  {
    slug: "mercedes-v-class",
    brand: "Mercedes-Benz",
    model: "V-Class",
    year: 2018,
    pricePerDay: 85000,
    fuel: "diesel",
    seats: 7,
    power: "190",
    engine: "2.2 л",
    color: "Черный / белый",
    category: minivan,
    transmission: automatic,
    image: "/cars/v-class.png",
    featured: true,
    description: {
      ru: "Mercedes-Benz V-Class для трансферов, семьи и гостей: много места, премиальный салон и удобная посадка.",
      en: "Mercedes-Benz V-Class for transfers, families and guests: generous space, premium cabin and easy access.",
      kz: "Трансферге, отбасына және қонақтарға арналған Mercedes-Benz V-Class: кең орын және премиум салон.",
    },
    features: {
      ru: ["7 мест", "Трансфер", "Премиум салон", "Большой багажник"],
      en: ["7 seats", "Transfer", "Premium interior", "Large luggage area"],
      kz: ["7 орын", "Трансфер", "Премиум салон", "Үлкен жүк орны"],
    },
  },
  {
    slug: "toyota-sienna",
    brand: "Toyota",
    model: "Sienna",
    year: 2021,
    pricePerDay: 65000,
    fuel: "hybrid",
    seats: 7,
    power: "245",
    engine: "2.5 л hybrid",
    color: "Белый",
    category: minivan,
    transmission: automatic,
    image: "/cars/sienna.png",
    featured: false,
    description: {
      ru: "Toyota Sienna - просторный гибридный минивэн для семьи, трансфера и дальних поездок с комфортом.",
      en: "Toyota Sienna is a spacious hybrid minivan for family use, transfers and comfortable long trips.",
      kz: "Toyota Sienna - отбасыға, трансферге және ұзақ сапарға арналған кең гибрид минивэн.",
    },
    features: {
      ru: ["7 мест", "Гибрид", "Сдвижные двери", "Комфорт на трассе"],
      en: ["7 seats", "Hybrid", "Sliding doors", "Highway comfort"],
      kz: ["7 орын", "Гибрид", "Жылжымалы есіктер", "Трассадағы жайлылық"],
    },
  },
  {
    slug: "mercedes-s-class-w222",
    brand: "Mercedes-Benz",
    model: "S-Class W222",
    year: 2015,
    pricePerDay: 85000,
    fuel: "petrol",
    seats: 5,
    power: "333",
    engine: "3.0 л",
    color: "Черный",
    category: executive,
    transmission: automatic,
    image: "/cars/s-class.png",
    featured: true,
    description: {
      ru: "Mercedes-Benz S-Class W222 - представительский седан для деловых встреч, мероприятий и комфортных поездок.",
      en: "Mercedes-Benz S-Class W222 is an executive sedan for business meetings, events and comfortable trips.",
      kz: "Mercedes-Benz S-Class W222 - іскерлік кездесулерге, іс-шараларға және жайлы сапарларға арналған седан.",
    },
    features: {
      ru: ["S-класс", "Мягкая подвеска", "Премиум салон", "Представительский вид"],
      en: ["S-Class", "Soft suspension", "Premium interior", "Executive look"],
      kz: ["S-Class", "Жұмсақ аспа", "Премиум салон", "Өкілдік көрініс"],
    },
  },
  {
    slug: "mercedes-gl-450",
    brand: "Mercedes-Benz",
    model: "GL 450",
    year: 2006,
    pricePerDay: 45000,
    fuel: "petrol",
    seats: 7,
    power: "340",
    engine: "4.7 л",
    color: "Черный",
    category: premiumSuv,
    transmission: automatic,
    image: "/cars/gl-450.png",
    featured: false,
    description: {
      ru: "Mercedes-Benz GL первого поколения: большой 7-местный SUV с мощным мотором и комфортной посадкой.",
      en: "First-generation Mercedes-Benz GL: a large 7-seat SUV with a powerful engine and comfortable seating.",
      kz: "Бірінші буын Mercedes-Benz GL: қуатты қозғалтқышы және 7 орны бар үлкен SUV.",
    },
    features: {
      ru: ["7 мест", "4.7 бензин", "Полный привод", "Большой кузов"],
      en: ["7 seats", "4.7 petrol", "All-wheel drive", "Large body"],
      kz: ["7 орын", "4.7 бензин", "Толық жетек", "Үлкен кузов"],
    },
  },
];

export function getCarBaseBySlug(slug: string): CarBase | undefined {
  return carsBase.find((c) => c.slug === slug);
}

export function resolveLocale(locale: string): LocaleCode {
  if (locale === "en" || locale === "kz") return locale;
  return "ru";
}

export function formatPrice(price: number, locale: string): string {
  return new Intl.NumberFormat(locale === "kz" ? "kk-KZ" : locale === "en" ? "en-US" : "ru-RU").format(price);
}
