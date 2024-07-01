type TitleProps = {
    title: string;
};

export function Title(props: TitleProps) {
    return (
        <div className="sm:flex sm:items-center sm:justify-between">
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {props.title}
            </h1>
            {/* <div className="mt-4 flex items-center gap-x-3">
                <Button title="Download all" color="white2" />
            </div> */}
        </div>
    );
}
