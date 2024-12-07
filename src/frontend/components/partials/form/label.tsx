import { FieldErrors, FieldValues } from "react-hook-form";

type Props = {
    title: string,
    html_for: string,
    errors?: FieldErrors<FieldValues>,
    color?: string,
    values_exists?: boolean
}

export default function ComponentLabel(props: Props): JSX.Element {
    const { title, html_for, errors, color = 'dark:text-dark-secondary text-secondary', values_exists = false } = props;

    const exists_error = errors && errors[html_for];

    return (
        <label title={title} htmlFor={html_for} className={`line-clamp-1 text-sm font-normal ${values_exists && "text-yellow-500"} ${(!exists_error) ? color : 'dark:text-dark-error text-error'} tracking-wider`}>
            {
                exists_error ? `${errors[html_for]?.message}` : values_exists ? "Lo recomendable seria que ingrese algo distinto al titulo" : title
            }
        </label>
    )
}