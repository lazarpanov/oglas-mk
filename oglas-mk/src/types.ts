
export interface Item {
    title: string;
    price: number;
    category: string,
    status: string,
    description: string;
    createdAt: string;
    createdBy: string;
    imageUrls: { name: string, url: string }[];
    id:string
    //Izbrisi posle koga ke se stavi database
}

