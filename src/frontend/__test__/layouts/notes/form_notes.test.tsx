import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';

import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { PropsResponse } from '@/context/types/response';

import ComponentForm from '@/frontend/components/layouts/notes/container_form';
import ComponentLabel from '@/frontend/components/partials/form/label';
import ComponentInput from '@/frontend/components/partials/form/input';
import ComponentItemPriority from '@/frontend/components/partials/form/item_priority';
import ComponentItemFeatured from '@/frontend/components/partials/form/item_featured';

import { APP_ROUTES } from '@/frontend/constant/app_rutes';
import { labels, note } from '@/frontend/__test__/mocks/notes'
import { categorys, category } from '@/frontend/__test__/mocks/categorys';

const mock = new MockAdapter(axios);

mock.onGet('/api/categorys/true').reply<PropsResponse>(200, {
    status: 200,
    data: categorys
});

mock.onPost('/api/notes').reply<PropsResponse>(201, {
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
            <ComponentForm categorySelected={category} setCategorySelected={setSelected} noteSelected={undefined} />
        );

        const inputTitle = component.getByPlaceholderText('Escriba el titulo...');
        const inputDescription = component.getByPlaceholderText('Escriba la descripcion...');
        const inputsPriority = component.getAllByRole('radio');
        const inputFile = component.getByLabelText('Subir imagen...');
        const labelTitle = component.getByTitle('Titulo');
        const labelDescription = component.getByTitle('Descripcion');
        const buttonDeshacer = component.getByRole('button', { name: 'Deshacer' });

        expect(inputTitle).toBeInTheDocument();
        expect(inputDescription).toBeInTheDocument();
        expect(labelTitle).toBeInTheDocument();
        expect(labelDescription).toBeInTheDocument();
        expect(inputFile).toBeInTheDocument();
        expect(buttonDeshacer).toBeInTheDocument();

        inputsPriority.map(input => {
            expect(input).toBeInTheDocument();
        })

        const volver = component.getByTitle('Volver atras');
        fireEvent.click(volver);
    })

    test('Renderizacion correcta al crear una nota', async () => {
        setSelected(undefined);
        const { getByTitle, getByRole, getByPlaceholderText, getByLabelText } = render(
            <ComponentForm categorySelected={category} setCategorySelected={setSelected} noteSelected={undefined} />
        );

        const title = getByTitle('Titulo formulario');
        const buttonSubmit = getByTitle('Guardar');

        expect(title.textContent).toBe('Crear nota');
        expect(buttonSubmit.textContent).toBe('Guardar');

        const inputTitle = getByPlaceholderText('Escriba el titulo...');
        const inputDescription = getByPlaceholderText('Escriba la descripcion...');
        const inputPriority = getByRole('radio', { name: 'Alta' });

        fireEvent.change(inputTitle, { target: { value: note.title } });
        fireEvent.change(inputDescription, { target: { value: note.description } });
        fireEvent.click(inputPriority);

        expect(inputTitle).toHaveValue(note.title);
        expect(inputDescription).toHaveValue(note.description);
        expect(inputPriority).toBeChecked();
        expect(getByTitle("Selecciona una imagen (máximo 1MB)")).toBeInTheDocument();

        const inputFile = getByLabelText('Subir imagen...');

        fireEvent.change(inputFile, {
            target: { files: [new File(['archivo de prueba 1'], 'test-file.png', { type: 'image/*' })] },
        });

        expect(getByTitle("Imagen adecuada")).toBeInTheDocument();

        fireEvent.change(inputFile, {
            target: { files: [new File(['archivo de prueba 2'], 'test-file.pdf', { type: 'pdf/' })] },
        });

        expect(getByTitle("Solo se permiten imagenes")).toBeInTheDocument();

        const slightlyBigFile = new File([new Blob([new Uint8Array(1024 * 1024 * 1.1)])], 'test-file.pdf', { type: 'image/*' });

        fireEvent.change(inputFile, {
            target: { files: [slightlyBigFile] },
        });

        expect(getByTitle("Tu imagen no debe superar 1MB.")).toBeInTheDocument();

        await waitFor(() => {
            fireEvent.submit(buttonSubmit);
        })
    })

    test('Renderizacion correcta al editar una nota', async () => {
        const { getByTitle } = render(
            <ComponentForm categorySelected={category} setCategorySelected={setSelected} noteSelected={note} />
        );

        const title = getByTitle('Titulo formulario');
        const buttonSubmit = getByTitle('Guardar');

        expect(title.textContent).toBe('Actualizar nota');
        expect(buttonSubmit.textContent).toBe('Guardar');

        const removeImagen = getByTitle('Quitar imagen');

        fireEvent.click(removeImagen);

        await waitFor(() => {
            fireEvent.submit(buttonSubmit);
        })
    })

    describe('Renderizacion correcta al deshacer una operacion', () => {
        test('Con nota seleccionada', () => {
            const component = render(
                <ComponentForm categorySelected={category} setCategorySelected={setSelected} noteSelected={note} />
            );

            const inputTitle = component.getByPlaceholderText('Escriba el titulo...');
            const inputDescription = component.getByPlaceholderText('Escriba la descripcion...');
            const inputPriority = component.getByText('Alta');

            expect(inputTitle).toHaveValue(note.title);
            expect(inputDescription).toHaveValue(note.description);
            expect(inputPriority).toHaveClass('bg-custom-gradient text-tertiary w-full text-center text-[14.4px] tracking-wider font-semibold cursor-pointer py-[5.1px]');

            const buttonDeshacer = component.getByRole('button', { name: 'Deshacer' });
            fireEvent.click(buttonDeshacer);

            expect(inputTitle).toHaveValue('');
            expect(inputDescription).toHaveValue('');
            expect(mock_push).toHaveBeenCalledWith(APP_ROUTES.notes.search);
        })

        test('Sin nota seleccionada', () => {
            const component = render(
                <ComponentForm categorySelected={category} setCategorySelected={setSelected} noteSelected={undefined} />
            );

            const buttonDeshacer = component.getByRole('button', { name: 'Deshacer' });
            fireEvent.click(buttonDeshacer);

            expect(mock_push).toHaveBeenCalledWith(APP_ROUTES.dashboard.main);
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
                        const { getByTitle } = render(<ComponentLabel title={label.title} htmlFor={label.name} errors={errors(label.name, validation.message)} />)
                        const label_element = getByTitle(label.title);
                        expect(label_element.textContent).toMatch(validation.match);
                    })
                })
            })
        })

        describe('Sin errores', () => {
            labels.forEach(label => {
                test(`${label.title}`, () => {
                    const { getByTitle } = render(<ComponentLabel title={label.title} htmlFor={label.name} errors={undefined} />)
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
                    descriptionClass="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
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
                        descriptionClass="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                    />)
                    const inputTitle = getByPlaceholderText('Escriba el titulo...');
                    expect(inputTitle).toHaveClass('border-error text-error placeholder:text-error');
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
                        descriptionClass="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] min-h-[80px] scroll py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                    />)
                    const inputDescription = getByPlaceholderText('Escriba la descripcion...');
                    expect(inputDescription).toHaveClass('border-error text-error placeholder:text-error');
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
                            descriptionClass="text-red-500 rotate-[-180deg]"
                            paint={false}
                            error="required"
                            register={register}
                        />)
                        const label = getByTitle(`${item.value} prioridad`);
                        const textLabel = getByText(item.value);

                        expect(label).toHaveClass('border-error');
                        expect(textLabel).toHaveClass('text-error group-hover:bg-error group-hover:text-primary');
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