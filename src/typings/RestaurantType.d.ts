export interface RestaurantType {
    Cantitate: number,
    Categorie: string,
    Grupare: string,
    "Pret unitar": number,
    Produs: string,
    Promotie: string,
    Sectie: string,
    Total: number,
    children?: Array<RestaurantType>
}