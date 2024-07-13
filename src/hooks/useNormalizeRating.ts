export function useNormalizeRating() {
  const normalizeRating = (rating: string) => {
    let value;

    if (rating.includes('/100')) {
      value = parseFloat(rating.replace('/100', '')) / 10;
    } else if (rating.includes('/10')) {
      value = parseFloat(rating.split('/')[0]);
    } else if (rating.includes('%')) {
      value = parseFloat(rating.replace('%', '')) / 10;
    } else {
      throw new Error('Unknown rating format');
    }

    return value;
  };

  const calculateAverageRating = (ratings: string[]) => {
    const normalizedRatings = ratings.map(normalizeRating);

    const total = normalizedRatings.reduce((sum, rating) => {
      return sum + rating;
    }, 0);

    return total / normalizedRatings.length;
  };

  return { normalizeRating, calculateAverageRating };
}
