"use client";

import { Header } from "components/Header";
import { Footer } from "components/Footer";
import { Title } from "components/Title";
import { Form } from "components/Form";
import { getNewsById } from "services/News";
import React, { useState, useEffect } from "react";
import { fetchCategory } from "services/Category";
import { Loading } from "components/Loading";
import { Category, NewsItem } from "types";

export default function NewsEditPage({ params }: { params: { slug: number } }) {
    const [newsItem, setNewsItem] = useState<NewsItem>();
    const [categorys, setCategorys] = useState<Category[]>([]);

    const getNews = async (id: number) => {
        const response = await getNewsById(id);
        setNewsItem(response);
    };

    const loadCategorys = async () => {
        const response = await fetchCategory();
        setCategorys(response.data);
    };

    useEffect(() => {
        getNews(params.slug);
        loadCategorys();
    }, []);

    if (!newsItem || Object.keys(categorys).length === 0) {
        return <Loading></Loading>;
    }

    return (
        <>
            <Header />
            <main className="container px-4 mx-auto">
                <Title title="更新" />
                <Form mode="edit" newsItem={newsItem} categorys={categorys} />
            </main>
            <Footer />
        </>
    );
}
