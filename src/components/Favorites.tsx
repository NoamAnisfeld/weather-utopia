export default function Favorites({
    favoriteCities,
    addFavoriteCity,
    removeFavoriteCity,
}: {
    favoriteCities: string[],
    addFavoriteCity: (cityKey: string) => void,
    removeFavoriteCity: (cityKey: string) => void,
}) {
    return <>
      Favorite cities
    </>
}