import Link from "next/link";

export function Header() {
    return (
        <main>
            <nav className="bg-white shadow dark:bg-gray-800">
                <div className="flex items-center justify-center">
                    <h1 className="mt-4">test site</h1>
                </div>
                <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
                    <Link
                        href="/"
                        className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
                    >
                        ニュース一覧
                    </Link>
                    <Link
                        href="/news"
                        className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
                    >
                        ニュース登録
                    </Link>
                    {/* <Link
                        href="/test"
                        className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
                    >
                        test
                    </Link> 
                    <Link
                        href="/cart"
                        className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
                    >
                        cart
                    </Link>*/}
                    <Link
                        href="/category"
                        className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
                    >
                        カテゴリ管理
                    </Link>
                </div>
            </nav>
        </main>
    );
}
