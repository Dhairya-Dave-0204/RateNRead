import { assets } from "../../assets/assets"

export const BOOKS_DATA = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: assets.Midnight,
    rating: 4.5,
    genres: ["Fiction", "Fantasy", "Philosophy"],
    published: "2020",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    popularity: 95,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    cover: assets.Atomic,
    rating: 4.8,
    genres: ["Self-Help", "Psychology", "Personal Development"],
    published: "2018",
    description:
      "Tiny Changes, Remarkable Results: An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
    popularity: 98,
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: assets.Mary,
    rating: 4.7,
    genres: ["Science Fiction", "Adventure", "Space"],
    published: "2021",
    description:
      "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish.",
    popularity: 92,
  },
  {
    id: 4,
    title: "Dune",
    author: "Frank Herbert",
    cover: assets.Dune,
    rating: 4.6,
    genres: ["Science Fiction", "Fantasy", "Classic"],
    published: "1965",
    description:
      "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.",
    popularity: 94,
  },
  {
    id: 5,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: assets.Money,
    rating: 4.7,
    genres: ["Finance", "Psychology", "Economics"],
    published: "2020",
    description:
      "Timeless lessons on wealth, greed, and happiness doing well with money isn't necessarily about what you know.",
    popularity: 91,
  },
  {
    id: 6,
    title: "Educated",
    author: "Tara Westover",
    cover: assets.Educated,
    rating: 4.7,
    genres: ["Memoir", "Biography", "Education"],
    published: "2018",
    description:
      "An account of the struggle for self-invention. It is a tale of fierce family loyalty and of the grief that comes with severing the closest of ties.",
    popularity: 90,
  },
  {
    id: 7,
    title: "The Song of Achilles",
    author: "Madeline Miller",
    cover: assets.Song,
    rating: 4.4,
    genres: ["Historical Fiction", "Romance", "Fantasy", "Mythology"],
    published: "2011",
    description:
      "A tale of gods, kings, immortal fame, and the human heart, this is a profoundly moving reimagining of the Iliad and the Trojan War.",
    popularity: 88,
  },
  {
    id: 8,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    cover: assets.Sapiens,
    rating: 4.6,
    genres: ["History", "Anthropology", "Science"],
    published: "2014",
    description:
      "How did our species succeed in the battle for dominance? Why did our foraging ancestors come together to create cities and kingdoms?",
    popularity: 96,
  },
];

export const FEATURED_BOOKS = [
  {
    id: 101,
    title: "The Atlas Paradox",
    author: "Olivie Blake",
    cover: assets.Atlas,
    rating: 4.3,
    description:
      "The long-anticipated sequel to dark academic sensation The Atlas Six—the novel you've seen everywhere—is finally here.  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur placeat ullam nesciunt quas, ad nam assumenda non sed reprehenderit quia.",
    featured: true,
  },
  {
    id: 102,
    title: "The Idiot",
    author: "Fyodor Dostoevsky",
    cover: assets.Idiot,
    rating: 4.2,
    description:
      "The twenty-six-year-old Prince Myshkin, following a stay of several years in a Swiss sanatorium, returns to Russia to collect an inheritance.  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur placeat ullam nesciunt quas, ad nam assumenda non sed reprehenderit quia.",
    featured: true,
  },
  {
    id: 103,
    title: "The Anthropocene Reviewed",
    author: "John Green",
    cover: assets.Reviewed,
    rating: 4.7,
    description:
      "A deeply moving collection of personal essays that reviews different facets of the human-centered planet on a five-star scale.  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur placeat ullam nesciunt quas, ad nam assumenda non sed reprehenderit quia.",
    featured: true,
  },
];
