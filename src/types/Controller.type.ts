export interface ListAPIResponse<T> {
    data: T[]
    total: number
    limit: number
    offset: number
}