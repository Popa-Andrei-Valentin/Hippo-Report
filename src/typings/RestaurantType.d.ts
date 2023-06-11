export interface RestaurantType {
    Cantitate: number,
    Categorie: string,
    Grupare: string,
    "Pret unitar": number,
    Produs: string,
    Promotie: string,
    Sectie: string,
    Total: string,
    children?: Array<RestaurantType>,
    customId?: number,
    expanded?: boolean,
    duplicate?: boolean,
}