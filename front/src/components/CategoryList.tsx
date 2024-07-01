// CategoryList.tsx
import React from "react";
import { Modal } from "components/Modal";
import { ModalDelete } from "components/ModalDelete";
import { ModalCategory } from "components/ModalCategory";
import { Category, CategoryState } from "types";

type CategoryListProps = {
    class_id: number;
    title: string;
    data: CategoryState;
    handleClickRegistCategory: (data: object) => Promise<void>;
    setClass2: (data: Category) => void;
    setClass3: (data: Category) => void;
    handleClickUpdateUser: (data: object) => Promise<void>;
    handleClickDeleteUser: (category_id: string) => Promise<void>;
};

export function CategoryList({
    class_id,
    title,
    data,
    handleClickRegistCategory,
    setClass2,
    setClass3,
    handleClickUpdateUser,
    handleClickDeleteUser,
}: CategoryListProps) {
    const handleClick = (item: Category) => {
        if (class_id === 1) {
            setClass2(item);
        } else if (class_id === 2) {
            setClass3(item);
        }
    };

    return (
        <div className="bg-blue-500 p-4 text-white">
            <h2 className="text-lg font-bold">{title}</h2>
            {(data.category_title || class_id === 1) && (
                <>
                    <h3>{data.category_title}</h3>
                    <ModalCategory
                        buttonLabel="新規登録"
                        classID={class_id}
                        categoryID={data.state}
                        parentMethod={handleClickRegistCategory}
                    />
                    {data.datas.length === 0 && <p>No datas...</p>}
                </>
            )}
            {data.datas.map((item) => (
                <ul className="flex flex-col mt-2" key={item.id}>
                    <li
                        onClick={() => handleClick(item)}
                        className="flex items-center gap-x-2 p-3 text-sm bg-white border text-gray-800 first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200"
                    >
                        <div className="w-full flex justify-between truncate">
                            <span className="me-3 flex-1 w-0 truncate">
                                (id:{item.id})<br></br>
                                {item.title}
                            </span>
                            <Modal
                                buttonLabel="編集"
                                parentMethod={handleClickUpdateUser}
                                id={item.id}
                                title={item.title}
                            />
                            <ModalDelete
                                buttonLabel="削除"
                                parentMethod={handleClickDeleteUser}
                                id={item.id}
                                category_id={item.category_id}
                                title={item.title}
                            />
                        </div>
                    </li>
                </ul>
            ))}
        </div>
    );
}

export default CategoryList;
