import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import "./OrderPizza.css";
import Pizza from "../Data/Pizza.js";
import * as Yup from 'yup';
import { useHistory } from "react-router-dom"
import "./PizzaForm.css"


function PizzaForm({ pizzaSelection }) {

    const history = useHistory()

    const [price, setPrice] = useState(0)

    const validationSchema = Yup.object().shape({
        size: Yup.string().required('Lütfen Boyut seçininiz!'),
        crust: Yup.string().required('Lütfen Kalınlık seçiniz!')
    });

    const crustOptions = [
        // { value: "--Hamur Kalınlığı Seç--", label: "Hamur Seç" },
        { value: "İnce Hamur", label: "İnce Hamur", price: 0 },
        { value: "Kalın Hamur", label: "Kalın Hamur", price: 5 }
    ];

    const sizeOptions = [
        { value: "Küçük Boy", label: "Küçük Boy", price: 0 },
        { value: "Orta Boy", label: "Orta Boy", price: 20 },
        { value: "Büyük Boy", label: "Büyük Boy", price: 30 }
    ];

    const toppingOptions = [
        { label: "Peperoni", value: "peperoni", price: 5 },
        { label: "Sosis", value: "Sosis", price: 5 },
        { label: "Canada Jambonu ", value: "Canada Jambonu", price: 5 },
        { label: "Tavuk Izgara", value: "Tavuk Izgara", price: 5 },
        { label: "Soğan", value: "Soğan", price: 5 },
        { label: "Domates", value: "Domates", price: 5 },
        { label: "Mısır", value: "Mısır", price: 5 },
        { label: "Sucuk", value: "Sucuk", price: 5 },
        { label: "Jalepono", value: "Jalepono", price: 5 },
        { label: "Sarımsa", value: "Sarımsak", price: 5 },
        { label: "Biber", value: "Biber", price: 5 },
        { label: "Ananas", value: "ananas", price: 5 },
        { label: "Kabak", value: "Kabak", price: 5 }
    ];


    useEffect(() => {
        const selectedPizza = Pizza.find(pizza => pizza.id === pizzaSelection);
        if (selectedPizza) {
            setPrice(selectedPizza.price);
        }
    }, [pizzaSelection]);

    const calculatePrice = (values) => {
        const selectedCrust = crustOptions.find(option => option.value === values.crust);
        const selectedSize = sizeOptions.find(option => option.value === values.size);

        let totalPrice = 0;
        const selectedPizza = Pizza.find(pizza => pizza.id === pizzaSelection);
        if (selectedPizza) {
            totalPrice += selectedPizza.price;
        }


        if (selectedCrust && selectedSize) {
            totalPrice += selectedCrust.price + selectedSize.price;
        }

        if (values.toppings.length > 0) {
            values.toppings.forEach(topping => {
                const selectedTopping = toppingOptions.find(option => option.value === topping);
                if (selectedTopping) {
                    totalPrice += selectedTopping.price;
                }
            });
        }

        setPrice(totalPrice);
    };

    const handleSubmit = (values) => {
        console.log(values)
        history.push("/success")
    }




    return (
        <div id='pizza-form' className="">
            {pizzaSelection && (
                <Formik
                    initialValues={{
                        crust: '',
                        size: '',
                        toppings: []
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}    >
                    {({ values, setFieldValue }) => (

                        <Form className="form">
                            <div>
                                <label htmlFor="firstName">First Name</label>
                                <Field id="firstName" name="firstName" placeholder="Lütfen İsminizi Giriniz!" />

                                <label htmlFor="lastName">Last Name</label>
                                <Field id="lastName" name="lastName" placeholder="Lütfen Soyadınızı Giriniz!" />

                                <label htmlFor="email">Email</label>
                                <Field
                                    id="email"
                                    name="email"
                                    placeholder="Lütfen Email Giriniz!"
                                    type="email"
                                />

                                <button type="submit">Submit</button>
                            </div>
                            <div>
                                <label htmlFor="crust">Lütfen Hamur Kalınlığı Seçiniz</label>
                                <Field as="select" name="crust" id="crust" onChange={(e) => {
                                    setFieldValue("crust", e.target.value);
                                    calculatePrice({ ...values, crust: e.target.value });
                                }}>
                                    <option disabled selected >
                                        Kalınlık Seç
                                    </option>
                                    {crustOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="crust" component="div" className="error" />
                            </div>

                            <div className="radio-container" role="group" aria-labelledby="my-radio-group">
                                <div>
                                    <h1>Lütfen Boyut Seçiniz</h1>
                                    {sizeOptions.map((option) => (
                                        <label key={option.value}>
                                            <Field type="radio" name="size" value={option.value} onChange={() => {
                                                setFieldValue("size", option.value);
                                                calculatePrice({ ...values, size: option.value });
                                            }} />
                                            {option.label}
                                        </label>
                                    ))}
                                    <ErrorMessage name="size" component="div" className="error" />
                                </div>
                            </div>

                            <div>
                                <h1>Ek Malzemeler</h1>
                                <p>En Fazla 10 ürün seçebilirsiniz! Her ürün 5 TL'dir</p>
                                <div className="checkbox-container" role="group" aria-labelledby="checkbox-group">
                                    {toppingOptions.map((option) => (
                                        <label key={option.value}>
                                            <Field type="checkbox" name="toppings" value={option.value} onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                const updatedToppings = isChecked
                                                    ? [...values.toppings, option.value]
                                                    : values.toppings.filter((topping) => topping !== option.value);
                                                setFieldValue("toppings", updatedToppings);
                                                calculatePrice({ ...values, toppings: updatedToppings });
                                            }} />
                                            {option.label}
                                        </label>
                                    ))}
                                    <ErrorMessage name="toppings" component="div" className="error" />
                                </div>
                            </div>

                            <div>
                                <div >
                                    <label>

                                        Sipariş Notları: <input className='OrderNotes' type='text' name="myInput" />
                                    </label>


                                </div>


                                <button type="submit">Submit</button>
                                <div className='totalprice'>

                                    <h2>Sipariş tutarınız {price} TL</h2>
                                    <br />

                                    <button id='price-button' type="submit">Sipariş Oluştur.</button>
                                </div>
                            </div>

                        </Form>



                    )
                    }
                </Formik >)}


        </div >
    );
}

export default PizzaForm;
