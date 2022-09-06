import CityInfoWidget from "./CityInfoWidget";

export default function Favorites({
    favoriteCities,
    addFavoriteCity,
    removeFavoriteCity,
}: {
    favoriteCities: string[],
    addFavoriteCity: (cityKey: string) => void,
    removeFavoriteCity: (cityKey: string) => void,
}) {
    return <div className="outlined">
        {favoriteCities.map(cityKey => <CityInfoWidget {...{
                cityKey,
                cityName: "Placeholder for city name",
                favoriteCities,
                addFavoriteCity,
                removeFavoriteCity,
            }} />
        )}
    </div>
}