import { Carousel, BookCard } from "../component_index";

const MobileBooksCarousel = ({ books }) => {
  return (
    <Carousel
      items={books}
      renderItem={(book) => (
        <div key={book.id} className="w-full max-w-xs">
          <BookCard book={book} />
        </div>
      )}
      itemsToShow={1}
    />
  );
};

export default MobileBooksCarousel;
