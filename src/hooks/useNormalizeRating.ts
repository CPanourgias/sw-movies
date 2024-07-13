const useNormalizeRating = () => {
  const normalizeRating = (rating: string) => {
    let value;

    if (rating.includes('/100')) {
      // Rating is in the format "xx/100"
      value = parseFloat(rating.replace('/100', '')) / 10;
    } else if (rating.includes('/10')) {
      // Rating is in the format "x.x/10"
      value = parseFloat(rating.split('/')[0]);
    } else if (rating.includes('%')) {
      // Rating is in the format "xx%"
      value = parseFloat(rating.replace('%', '')) / 10;
    } else {
      throw new Error('Unknown rating format');
    }

    return value;
  };

  const calculateAverageRating = (ratings: string[]) => {
    const normalizedRatings = ratings.map(normalizeRating);
    console.log('normalizedRatings', normalizedRatings);
    const total = normalizedRatings.reduce((sum, rating) => {
      return sum + rating;
    }, 0);

    return total / normalizedRatings.length;
  };

  return { normalizeRating, calculateAverageRating };
};

export default useNormalizeRating;
