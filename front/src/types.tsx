export type Category = {
    id: number;
    class_id: number;
    category_id: string;
    title: string;
};

export type CategoryState = {
    datas: Category[];
    state: string;
    category_title: string;
};

export type NewsData = {
    id: number;
    title: string;
    text: string;
};

export type NewsItem = {
    id: number;
    title: string;
    text: string;
    add_category: { id: number; title: string }[];
    created_at: string;
    updated_at: string;
};

export type PagenationData = {
    current_page: number;
    last_page: number;
};

export type PaginatedNews = {
    data: NewsItem[];
    current_page: number;
    last_page: number;
    total: number;
};
