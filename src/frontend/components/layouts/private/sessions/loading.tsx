import ComponentTemplateLoading from "@/frontend/components/partials/template/list/loading"

export default function ComponentLoading({ count }: { count: number }): JSX.Element {
    return (
        <ComponentTemplateLoading count={count} description_class="flex gap-3 p-3">
            <span className="min-w-[30px] min-h-[30px] w-[30px] h-[30px] rounded-full dark:bg-dark-tertiary bg-tertiary opacity-20" />
            <div className="flex flex-col w-[calc(100%-30px)] gap-2.5">
                <span className="w-[calc(100%-50px)] h-[15px] dark:bg-dark-tertiary bg-tertiary opacity-20 rounded-full" />
                <span className="w-[calc(100%-140px)] h-[15px] dark:bg-dark-tertiary bg-tertiary opacity-20 rounded-full" />
            </div>
        </ComponentTemplateLoading>
    )
}