"use client";

import React from "react";
import Link from "next/link";
import { PagenationData } from "types";

type Props = {
    PagenationData: PagenationData[];
};

export function Pagenation(props: Props) {
    if (!props.PagenationData) {
        return null;
    }

    return (
        <div className="flex justify-center mt-6 mb-6">
            <nav aria-label="Pagination">
                <ul className="inline-flex items-center space-x-2 rounded-md text-sm">
                    {[...Array(props.PagenationData.last_page).keys()].map(
                        (page) => {
                            const pageNumber = page + 1;
                            const isCurrentPage =
                                props.PagenationData.current_page ===
                                pageNumber;
                            return (
                                <li key={pageNumber}>
                                    <Link
                                        href={`?page=${pageNumber}`}
                                        className={`inline-flex items-center rounded-md ${
                                            isCurrentPage
                                                ? "bg-gray-100 px-4 py-2 font-medium text-gray-700"
                                                : "bg-white px-4 py-2 text-gray-500 hover:bg-gray-50"
                                        }`}
                                    >
                                        {pageNumber}
                                    </Link>
                                </li>
                            );
                        }
                    )}
                </ul>
            </nav>
        </div>
    );
}
