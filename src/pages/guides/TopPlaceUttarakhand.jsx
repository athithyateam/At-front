// src/pages/guides/TopPlacesUttarakhand.jsx
import { motion } from "framer-motion";

const GOLD = "#C59D5F";

const PLACES = [
  // ---------- SPIRITUAL ----------
  {
    id: "rishikesh",
    title: "Rishikesh",
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/laxman%20jhula-rishikesh-uttrakhand-hero?qlt=82&ts=1726646312953",
    desc: "The Yoga Capital of the World, Rishikesh blends spirituality with adventure — from sacred Ganga aartis to river rafting.",
    bestFor: "Yoga, spirituality, adventure",
    bestSeason: "Feb – May · Sep – Nov",
    type: "Spiritual Town",
  },
  {
    id: "haridwar",
    title: "Haridwar",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0f/Evening_view_of_Har-ki-Pauri%2C_Haridwar.jpg",
    desc: "One of Hinduism’s holiest cities, where the Ganga descends to the plains. Famous for Ganga Aarti at Har Ki Pauri.",
    bestFor: "Pilgrimage, rituals, culture",
    bestSeason: "Oct – Apr",
    type: "Holy City",
  },
  {
    id: "kedarnath",
    title: "Kedarnath Temple",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/56/Kedarnath_Temple_in_Rainy_season.jpg",
    desc: "One of the Char Dham shrines, Kedarnath is a powerful spiritual destination set against dramatic Himalayan peaks.",
    bestFor: "Pilgrimage, spiritual seekers",
    bestSeason: "May – Jun · Sep",
    type: "Sacred Temple",
  },

  // ---------- HILL STATIONS ----------
  {
    id: "nainital",
    title: "Nainital",
    image:
      "https://www.epicyatra.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-10-at-11.04.54.jpeg",
    desc: "A charming lake town surrounded by hills, ideal for families, honeymooners, and relaxed mountain holidays.",
    bestFor: "Families, couples, leisure",
    bestSeason: "Mar – Jun · Oct",
    type: "Hill Station",
  },
  {
    id: "mussoorie",
    title: "Mussoorie",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/aa/Mussoorie_landscape.jpg",
    desc: "The Queen of Hills offers colonial charm, waterfalls, viewpoints, and a pleasant climate year-round.",
    bestFor: "Sightseeing, couples",
    bestSeason: "Mar – Jun · Sep",
    type: "Hill Station",
  },

  // ---------- ADVENTURE & NATURE ----------
  {
    id: "auli",
    title: "Auli",
    image:
      "https://s3.india.com/wp-content/uploads/2024/08/Skiing-on-Pristine-Slopes.jpg?impolicy=Medium_Widthonly&w=350&h=263",
    desc: "India’s premier skiing destination with stunning Himalayan views, especially magical during winter snowfall.",
    bestFor: "Snow, skiing, views",
    bestSeason: "Dec – Feb · Apr – Jun",
    type: "Snow Destination",
  },
  {
    id: "chopta",
    title: "Chopta",
    image:
      "https://imgcld.yatra.com/ytimages/image/upload/t_yt_blog_c_fill_q_auto:good_f_auto_w_800_h_500/v1481019868/DO_NOT_USE_DISCOVER_INDIA_EDITORIAL/Chopta_Blog1.jpg",
    desc: "Often called Mini Switzerland of India, Chopta is the base for the Tungnath–Chandrashila trek.",
    bestFor: "Trekking, nature",
    bestSeason: "Apr – Jun · Oct – Nov",
    type: "Trekking Base",
  },
  {
    id: "valley-of-flowers",
    title: "Valley of Flowers",
    image:
      "https://www.trekupindia.com/wp-content/uploads/2024/05/uttrakhand-valley-of-flowers-trek-1024x576.webp",
    desc: "A UNESCO World Heritage Site famous for alpine flowers, blooming spectacularly during monsoon.",
    bestFor: "Nature lovers, photographers",
    bestSeason: "Jul – Sep",
    type: "National Park",
  },
  {
    id: "jim-corbett",
    title: "Jim Corbett National Park",
    image: "https://uttarakhandtourism.gov.in/assets/media/UTDB_media_1735984081Jungle_safari.jpg",
    desc: "India’s oldest national park, known for tiger safaris, dense forests, and rich wildlife.",
    bestFor: "Wildlife, safaris",
    bestSeason: "Nov – Jun",
    type: "Wildlife Reserve",
  },
];

export default function TopPlacesUttarakhand() {
  return (
    <div className="bg-[#fff7e6] min-h-screen">
      {/* ================= HERO ================= */}
      <section className="relative h-[420px]">
        <img
          src="https://lp-cms-production.imgix.net/2022-03/GettyRF_956963154.jpg?auto=format,compress&q=72&w=1095&fit=crop&crop=faces,edges"
          alt="Uttarakhand"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative mx-6 px-6 h-full flex items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              Top Places to Visit in Uttarakhand
            </motion.h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Spiritual towns, alpine meadows, ski slopes & timeless hill
              stations — discover Uttarakhand’s best destinations.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className=" mx-6 px-6 py-16 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-14">
        {/* ===== Sticky TOC ===== */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 bg-white rounded-xl p-5 border input-lux">
            <h4 className="text-sm font-semibold mb-3" style={{ color: GOLD }}>
              On this page
            </h4>
            <ul className="space-y-2 text-sm">
              {PLACES.map((p) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className="text-gray-600 hover:text-[#C59D5F] transition"
                  >
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ===== Places ===== */}
        <div className="space-y-24">
          {PLACES.map((p, i) => (
            <PlaceRow key={p.id} {...p} reverse={i % 2 !== 0} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ================= SUB COMPONENT ================= */

function PlaceRow({
  id,
  title,
  image,
  desc,
  bestFor,
  bestSeason,
  type,
  reverse,
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="grid md:grid-cols-2 gap-12 items-center"
    >
      {/* TEXT */}
      <div className={reverse ? "md:order-2" : ""}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs uppercase tracking-wide text-gray-500">
            {type}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <span
            className="text-xs px-3 py-1 rounded-full"
            style={{
              background: "#fffdf8",
              border: `1px solid ${GOLD}`,
              color: GOLD,
            }}
          >
            Best: {bestSeason}
          </span>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">{desc}</p>

        <p className="text-sm text-gray-600">
          <strong>Best for:</strong> {bestFor}
        </p>
      </div>

      {/* IMAGE */}
      <div className={reverse ? "md:order-1" : ""}>
        <div className="relative overflow-hidden rounded-2xl shadow-md">
          <img
            src={image}
            alt={title}
            className="w-full h-80 object-cover transition duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
        </div>
      </div>
    </motion.section>
  );
}
