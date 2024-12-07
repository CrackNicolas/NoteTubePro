import ComponentTemplateLoading from "@/frontend/components/partials/template/list/loading"

export default function ComponentLoading({ count }: { count: number }): JSX.Element {
    return (
        <ComponentTemplateLoading count={count} description_class="grid gap-0 place-items-center h-[100px] px-4">
            <span className="rounded-full w-[40px] h-[40px] dark:bg-dark-tertiary bg-tertiary opacity-20" />
            <span className="rounded-full w-full mx-3 h-[20px] dark:bg-dark-tertiary bg-tertiary opacity-20" />
        </ComponentTemplateLoading>
    )
}