export type PageServerLoad<T> = (params: T) => Promise<{ item: any }> // Adjust the type of `params` as per your requirement

export interface Item {
    title: string;
    price: number;
    description: string;
    createdAt: string;
    createdBy: string;
    imageUrls: { name: string, url: string }[];
    id:string
    //Izbrisi posle koga ke se stavi database
}

