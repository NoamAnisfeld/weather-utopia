export default function FavoritesControlButton({
    cityKey,
    favoriteCities,
    addFavoriteCity,
    removeFavoriteCity,
}: {
    cityKey: string,
    favoriteCities: string[],
    addFavoriteCity: (cityKey: string) => void,
    removeFavoriteCity: (cityKey: string) => void,
}) {
    return favoriteCities.includes(cityKey) ?
        <button
            type="button"
            onClick={() => removeFavoriteCity(cityKey)}
        >
            Remove from favorites
        </button> :
        <button
            type="button"
            onClick={() => addFavoriteCity(cityKey)}
        >
            Add to favorites
        </button>
}