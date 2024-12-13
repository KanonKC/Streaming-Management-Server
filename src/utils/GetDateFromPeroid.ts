export type Peroid = "daily" | "weekly" | "monthly" | "alltime" | number

export function getDateFromPeroid(peroid: Peroid): Date {
    if (peroid === "daily") {
        return new Date(new Date().getTime() - 1000 * 60 * 60 * 24);
    } else if (peroid === "weekly") {
        return new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7);
    } else if (peroid === "monthly") {
        return new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30);
    } else if (peroid === "alltime") {
        return new Date(0)
    }
    return new Date(peroid);
}