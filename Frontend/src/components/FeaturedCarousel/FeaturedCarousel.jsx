import { Carousel, BookCard } from "../component_index";

const FeaturedCarousel = ({ books }) => {
  return (
    <Carousel
      items={books}
      renderItem={(book) => (
        <div key={book.id} className="w-full">
          <BookCard book={book} isFeatured />
        </div>
      )}
    />
  );
};

export default FeaturedCarousel;
