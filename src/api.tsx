const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const fetchAsteroids = (startDate: string, endDate: string) => {
    const asteroids: any[] = [];

    const dateRange = new Date(startDate);
    const dateEnd = new Date(endDate);

    const fetchNextDateRange = (): Promise<any[]> => {
        if (dateRange <= dateEnd) {
            const nextDate = new Date(dateRange);
            nextDate.setDate(dateRange.getDate() + 7);

            const rangeEnd = nextDate > dateEnd ? dateEnd : nextDate;

            return fetch(
                `https://api.nasa.gov/neo/rest/v1/feed?start_date=${
                    dateRange.toISOString().split("T")[0]
                }&end_date=${
                    rangeEnd.toISOString().split("T")[0]
                }&api_key=${API_KEY}`
            )
                .then((response) => {
                    if (!response.ok)
                        throw new Error("Network response was not ok");
                    return response.json();
                })
                .then((data) => {
                    const earthOrbitingAsteroids = Object.values(
                        data.near_earth_objects
                    )
                        .flat()
                        .filter((asteroid: any) =>
                            asteroid.close_approach_data.some(
                                (approach: any) =>
                                    approach.orbiting_body === "Earth"
                            )
                        );

                    asteroids.push(...earthOrbitingAsteroids);

                    dateRange.setDate(dateRange.getDate() + 7);

                    return fetchNextDateRange();
                });
        } else {
            return Promise.resolve(asteroids);
        }
    };

    return fetchNextDateRange();
};

export default fetchAsteroids;
