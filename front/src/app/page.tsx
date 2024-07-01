"use client";

import React, { useState, useEffect } from "react";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import { Title } from "components/Title";
import { Pagenation } from "components/Pagenation";
import { useSearchParams } from "next/navigation";
import { fetchNews } from "services/News";
import { NewsList } from "components/NewsList";
import { NewsItem, PagenationData } from "types";

export default function IndexPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [PagenationData, setPagenationData] = useState<PagenationData[]>([]);
    const searchParams = useSearchParams();
    const page = searchParams.get("page");

    const loadNews = async () => {
        const response = await fetchNews(page);
        setPagenationData((prevState) => ({
            ...prevState,
            current_page: response.current_page,
            last_page: response.last_page,
        }));

        setNews(response.data);
    };

    useEffect(() => {
        loadNews();
    }, [page]);

    return (
        <>
            <Header />
            <main className="container px-4 mx-auto">
                <Title title="記事一覧" />
                <Pagenation PagenationData={PagenationData} />
                <NewsList news={news} />
                <Pagenation PagenationData={PagenationData} />
            </main>
            <Footer />
        </>
    );
}
