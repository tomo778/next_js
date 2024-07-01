"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { NewsItem } from "types";

type NewsListProps = {
    news: NewsItem[];
};

export function NewsList(props: NewsListProps) {
    const CustomNl2br = ({ text }: { text: string }) => {
        return (
            <>
                {text.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>
                ))}
            </>
        );
    };

    return (
        <>
            {props.news.length > 0 ? (
                props.news.map((item) => (
                    <article key={item.id} className="mt-8">
                        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            {item.title}
                        </h2>
                        {item.add_category.length !== 0 && (
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                {item.add_category[0].title}
                            </span>
                        )}
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            <CustomNl2br text={item.text} />
                        </p>
                        <Link
                            href={`/news/${item.id}`}
                            className="mt-4 inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
                        >
                            更新画面へ
                        </Link>
                        <p>
                            更新日：
                            {format(
                                new Date(item.updated_at),
                                "yyyy年MM月dd日(E)",
                                {
                                    locale: ja,
                                }
                            )}
                        </p>
                        <p>
                            作成日：
                            {format(
                                new Date(item.created_at),
                                "yyyy年MM月dd日(E)",
                                {
                                    locale: ja,
                                }
                            )}
                        </p>
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    </article>
                ))
            ) : (
                <p>Loading data...</p>
            )}
        </>
    );
}
