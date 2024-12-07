import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';

import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { Props_response } from '@/context/types/response';

import ComponentForm from '@/frontend/components/layouts/notes/container_form';
import ComponentLabel from '@/frontend/components/partials/form/label';
import ComponentInput from '@/frontend/components/partials/form/input';
import ComponentItemPriority from '@/frontend/components/partials/form/item_priority';
import ComponentItemFeatured from '@/frontend/components/partials/form/item_featured';

import { labels, note } from '@/frontend/__test__/mocks/notes'
import { categorys, category } from '@/frontend/__test__/mocks/categorys';

const mock = new MockAdapter(axios);

mock.onGet('/api/categorys/true').reply<Props_response>(200, {
    status: 200,
    data: categorys
});

mock.onPost('/api/notes').reply<Props_response>(201, {
    status: 201,
    info: {
        message: 'Nota creada'
    }
});

mock.onPut('/api/notes').reply(200, {
    status: 200,
    info: {
        message: 'Nota editada'
    }
});

const params = new URLSearchParams();
params.append('data', JSON.stringify({ note }));

jest.mock("next/navigation", () => ({
    ...jest.requireActual('next/navigation'),
    useSearchParams: () => params,
}))

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} />;
    },
}));

const mock_push = jest.fn();

jest.mock('next/navigation', () => ({
    ...jest.requireActual('next/navigation'),
    useRouter: () => ({
        push: mock_push
    })
}));

describe('Componente <Form/> principal', () => {

    beforeAll(() => {
        global.URL.createObjectURL = jest.fn();
    });

    const register = jest.fn(), setSelected = jest.fn();

    test('Renderizacion correcta de elementos', () => {
        const component = render(
            <ComponentForm category_selected={category} setCategory_selected={setSelected} note_selected={undefined} />
        );

        const input_title = component.getByPlaceholderText('Escriba el titulo...');
        const input_description = component.getByPlaceholderText('Escriba la descripcion...');
        const inputs_priority = component.getAllByRole('radio');
        const input_file = component.getByLabelText('Subir imagen...');
        const label_title = component.getByTitle('Titulo');
        const label_description = component.getByTitle('Descripcion');
        const button_deshacer = component.getByRole('button', { name: 'Deshacer' });

        expect(input_title).toBeInTheDocument();
        expect(input_description).toBeInTheDocument();
        expect(label_title).toBeInTheDocument();
        expect(label_description).toBeInTheDocument();
        expect(input_file).toBeInTheDocument();
        expect(button_deshacer).toBeInTheDocument();

        inputs_priority.map(input => {
            expect(input).toBeInTheDocument();
        })

        const volver = component.getByTitle('Volver atras');
        fireEvent.click(volver);
    })

    test('Renderizacion correcta al crear una nota', async () => {
        setSelected(undefined);
        const { getByTitle, getByRole, getByPlaceholderText, getByLabelText } = render(
            <ComponentForm category_selected={category} setCategory_selected={setSelected} note_selected={undefined} />
        );

        const title = getByTitle('Titulo formulario');
        const button_submit = getByTitle('Guardar');

        expect(title.textContent).toBe('Crear nota');
        expect(button_submit.textContent).toBe('Guardar');

        const input_title = getByPlaceholderText('Escriba el titulo...');
        const input_description = getByPlaceholderText('Escriba la descripcion...');
        const input_priority = getByRole('radio', { name: 'Alta' });

        fireEvent.change(input_title, { target: { value: note.title } });
        fireEvent.change(input_description, { target: { value: note.description } });
        fireEvent.click(input_priority);

        expect(input_title).toHaveValue(note.title);
        expect(input_description).toHaveValue(note.description);
        expect(input_priority).toBeChecked();
        expect(getByTitle("Selecciona una imagen (máximo 1MB)")).toBeInTheDocument();

        const input_file = getByLabelText('Subir imagen...');

        fireEvent.change(input_file, {
            target: { files: [new File(['archivo de prueba 1'], 'test-file.png', { type: 'image/*' })] },
        });

        expect(getByTitle("Imagen adecuada")).toBeInTheDocument();

        fireEvent.change(input_file, {
            target: { files: [new File(['archivo de prueba 2'], 'test-file.pdf', { type: 'pdf/' })] },
        });

        expect(getByTitle("Solo se permiten imagenes")).toBeInTheDocument();

        const slightlyBigFile = new File([new Blob([new Uint8Array(1024 * 1024 * 1.1)])], 'test-file.pdf', { type: 'image/*' });

        fireEvent.change(input_file, {
            target: { files: [slightlyBigFile] },
        });

        expect(getByTitle("Tu imagen no debe superar 1MB.")).toBeInTheDocument();

        await waitFor(() => {
            fireEvent.submit(button_submit);
        })
    })

    test('Renderizacion correcta al editar una nota', async () => {
        const { getByTitle } = render(
            <ComponentForm category_selected={category} setCategory_selected={setSelected} note_selected={note} />
        );

        const title = getByTitle('Titulo formulario');
        const button_submit = getByTitle('Guardar');

        expect(title.textContent).toBe('Actualizar nota');
        expect(button_submit.textContent).toBe('Guardar');

        const remove_imagen = getByTitle('Quitar imagen');

        fireEvent.click(remove_imagen);

        await waitFor(() => {
            fireEvent.submit(button_submit);
        })
    })

    describe('Renderizacion correcta al deshacer una operacion', () => {
        test('Con nota seleccionada', () => {
            const component = render(
                <ComponentForm category_selected={category} setCategory_selected={setSelected} note_selected={note} />
            );

            const input_title = component.getByPlaceholderText('Escriba el titulo...');
            const input_description = component.getByPlaceholderText('Escriba la descripcion...');
            const input_priority = component.getByText('Alta');

            expect(input_title).toHaveValue(note.title);
            expect(input_description).toHaveValue(note.description);
            expect(input_priority).toHaveClass('bg-secondary text-primary');

            const button_deshacer = component.getByRole('button', { name: 'Deshacer' });
            fireEvent.click(button_deshacer);

            expect(input_title).toHaveValue('');
            expect(input_description).toHaveValue('');
            expect(input_priority).toHaveClass('text-secondary group-hover:bg-secondary group-hover:text-primary');
            expect(mock_push).toHaveBeenCalledWith('/notes/search');
        })

        test('Sin nota seleccionada', () => {
            const component = render(
                <ComponentForm category_selected={category} setCategory_selected={setSelected} note_selected={undefined} />
            );

            const button_deshacer = component.getByRole('button', { name: 'Deshacer' });
            fireEvent.click(button_deshacer);

            expect(mock_push).toHaveBeenCalledWith('/dashboard/main');
        });
    })

    describe('Renderizacion correcta de mensajes de error', () => {
        const validations = [
            { name: "required", message: "requerido", match: /requerido/ },
            { name: "minLength", message: "caracteres", match: /caracteres/ },
            { name: "maxLength", message: "caracteres", match: /caracteres/ },
            { name: "pattern", message: "caracteres no permitidos", match: /caracteres no permitidos/ }
        ]

        const errors = (name: string, message: string) => {
            return {
                [name]: { type: name, message: message }
            }
        }

        validations.forEach(validation => {
            describe(`Error ${validation.name}`, () => {
                labels.forEach(label => {
                    test(`${label.title}`, () => {
                        const { getByTitle } = render(<ComponentLabel title={label.title} html_for={label.name} errors={errors(label.name, validation.message)} />)
                        const label_element = getByTitle(label.title);
                        expect(label_element.textContent).toMatch(validation.match);
                    })
                })
            })
        })

        describe('Sin errores', () => {
            labels.forEach(label => {
                test(`${label.title}`, () => {
                    const { getByTitle } = render(<ComponentLabel title={label.title} html_for={label.name} errors={undefined} />)
                    const label_element = getByTitle(label.title);
                    expect(label_element.textContent).toMatch(new RegExp(label.title));
                })
            })
        })
    });

    describe('Validacion correcta sin errores en los inputs', () => {
        const inputs = labels;
        inputs.forEach(input => {
            test(`${input.name}`, () => {
                const { getByPlaceholderText } = render(<ComponentInput
                    type="text"
                    name={input.name}
                    placeholder="Escriba..."
                    register={register}
                    error={undefined}
                    description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                />)
                const input_element = getByPlaceholderText('Escriba...');
                expect(input_element).toHaveClass('border-secondary text-secondary placeholder:text-secondary');
            })
        })
    })

    describe('Validacion correcta de errores en los inputs', () => {
        const validations = [{ name: "required" }, { name: "minLength" }, { name: "maxLength" }, { name: "pattern" }]

        describe('Titulo', () => {
            validations.forEach(validation => {
                test(`Error ${validation.name}`, () => {
                    const { getByPlaceholderText } = render(<ComponentInput
                        type="text"
                        name="title"
                        placeholder="Escriba el titulo..."
                        register={register}
                        error={validation.name}
                        description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                    />)
                    const input_title = getByPlaceholderText('Escriba el titulo...');
                    expect(input_title).toHaveClass('border-error text-error placeholder:text-error');
                })
            })
        })

        describe('Descripcion', () => {
            validations.forEach(validation => {
                test(`Error ${validation.name}`, () => {
                    const { getByPlaceholderText } = render(<ComponentInput
                        rows={3}
                        name="description"
                        placeholder="Escriba la descripcion..."
                        register={register}
                        error={validation.name}
                        description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] min-h-[80px] scroll py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                    />)
                    const input_description = getByPlaceholderText('Escriba la descripcion...');
                    expect(input_description).toHaveClass('border-error text-error placeholder:text-error');
                })
            })
        })

        describe('Prioridad', () => {
            const items = [{ name: "1", value: "Alta" }, { name: "2", value: "Media" }, { name: "3", value: "Baja" }];

            describe('Error required', () => {
                items.forEach(item => {
                    test(`Opcion ${item.name}`, () => {
                        const { getByTitle, getByText } = render(<ComponentItemPriority
                            id={item.name}
                            value={item.value}
                            class_icon="text-red-500 rotate-[-180deg]"
                            paint={false}
                            error="required"
                            register={register}
                        />)
                        const label = getByTitle(`${item.value} prioridad`);
                        const text_label = getByText(item.value);

                        expect(label).toHaveClass('border-error');
                        expect(text_label).toHaveClass('text-error group-hover:bg-error group-hover:text-primary');
                    })
                })
            })
        })

        describe('¿Destacar nota?', () => {
            test('Error required', () => {
                const { getByTitle } = render(<ComponentItemFeatured
                    value='SI'
                    paint={false}
                    error="required"
                    register={register}
                />)

                const container = getByTitle('si destacar');
                const title = getByTitle('SI');
                expect(container).toHaveClass('border-error');
                expect(title).toHaveClass('text-error group-hover:bg-error group-hover:text-primary')
            })
        })

    })
});