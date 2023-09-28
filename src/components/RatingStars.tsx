const RatingStars = ({ rating }: { rating: number }) => {
  const filledStars = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 >= 0.5;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(filledStars)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-500 fill-current mr-1"
          viewBox="0 0 20 20"
        >
          <path d="M10 14.142l-5.858 3.408 1.12-6.547L.472 7.45l6.547-.952L10 .858l2.98 5.641 6.547.952-4.79 4.553 1.12 6.547z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-500 fill-current mr-1"
          viewBox="0 0 20 20"
        >
          <path d="M10 14.142l-5.858 3.408 1.12-6.547L.472 7.45l6.547-.952L10 .858l2.98 5.641 6.547.952-4.79 4.553 1.12 6.547z" />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6  fill-current mr-1 stroke-yellow-500"
          viewBox="0 0 20 20"
        >
          <path d="M10 14.142l-5.858 3.408 1.12-6.547L.472 7.45l6.547-.952L10 .858l2.98 5.641 6.547.952-4.79 4.553 1.12 6.547z" />
        </svg>
      ))}
    </div>
  );
};

export default RatingStars;