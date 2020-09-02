import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './checkout-form.module.css';

const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    addressOne: Yup.string().required("Required"),
    addressTwo: Yup.string(),
    municipality: Yup.string().required("Required"),
    provinceTerritory: Yup.string().required("Required"),
    postalCode: Yup.string().trim()
        .required("Required")
        .matches(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
            { message: "Postal Code must be in format: K4B 1H9" }),
    phone: Yup.string().trim()
        .required("Required").matches(/^[2-9]\d{2}[ -]?[2-9]\d{2}[ -]?\d{4}$/,
            { message: "Phone number must be in format: 603-555-5555" }),
    email: Yup.string().trim()
        .required("Required").email()
});


const ShippingForm = ({ setValues, setSection }) => {
    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            addressOne: "",
            municipality: "",
            provinceTerritory: "",
            postalCode: "",
            phone: "",
            email: ""
        },
        validationSchema,
        onSubmit(values) {
            // do something here for now, console.log()
            console.log(values);
            setValues(values);
            setSection('billing');
        }
    });

    return (
        <div>
            <form
                className={styles.checkoutForm__form}
                onSubmit={handleSubmit}>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="firstName">First Name<span className="required">*</span></label>
                    <input
                        name="firstName"
                        onChange={handleChange}
                        type="text"
                        values={values.firstName} />
                    {errors.firstName ? errors.firstName : null}
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="lastName">Last Name<span className="required">*</span></label>
                    <input
                        name="lastName"
                        onChange={handleChange}
                        type="text"
                        values={values.lastName} />
                    {errors.lastName ? errors.lastName : null}
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="addressOne">Address Line 1<span className="required">*</span></label>
                    <input
                        name="addressOne"
                        onChange={handleChange}
                        type="text"
                        values={values.addressOne} />
                    {errors.addressOne ? errors.addressOne : null}
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="addressTwo">Address Line 2</label>
                    <input
                        name="addressTwo"
                        onChange={handleChange}
                        type="text"
                        values={values.addressTwo} />
                    {errors.addressTwo ? errors.addressTwo : null}
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="municipality">Municipality<span className="required">*</span></label>
                    <input
                        name="municipality"
                        onChange={handleChange}
                        type="text"
                        values={values.municipality} />
                    {errors.municipality ? errors.municipality : null}
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="provinceTerritory">Province/Territory<span className="required">*</span></label>
                    <input
                        name="provinceTerritory"
                        onChange={handleChange}
                        type="text"
                        values={values.provinceTerritory} />
                    {errors.provinceTerritory ? errors.provinceTerritory : null}
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="postalCode">Postal Code<span className="required">*</span></label>
                    <input
                        name="postalCode"
                        onChange={handleChange}
                        type="text"
                        values={values.postalCode} />
                    {errors.postalCode ? errors.postalCode : null}
                </div>
                <p>Add shipping options here</p>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="phone">Phone Number<span className="required">*</span></label>
                    <input
                        name="phone"
                        onChange={handleChange}
                        type="text"
                        values={values.phone} />
                    {errors.phone ? errors.phone : null}
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="email">Email<span className="required">*</span></label>
                    <input
                        name="email"
                        onChange={handleChange}
                        type="text"
                        values={values.email} />
                    {errors.email ? errors.email : null}
                </div>
                <button
                    className={styles.checkoutForm__submitButton}
                    type="submit">continue to billing</button>
            </form>
        </div>
    );
}

const ShippingDetails = ({ shippingValues }) => {
    const {
        firstName,
        lastName,
        addressOne,
        addressTwo,
        municipality,
        provinceTerritory,
        postalCode,
        phone } = shippingValues;
    return (
        <div>
            <p>{firstName} {lastName}</p>
            <p>{addressOne}</p>
            <p>{addressTwo}</p>
            <p>{municipality}, {provinceTerritory}, {postalCode}</p>
            <p>{phone}</p>
        </div>
    );
}

const BillingForm = ({ setValues, shippingValues, setSection }) => {
    const [sameAsShipping, setSameAsShipping] = useState(true);

    useEffect(() => {
        if (sameAsShipping) {
            setValues(shippingValues);
        }
    }, [sameAsShipping, setValues, shippingValues]);

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            addressOne: "",
            municipality: "",
            provinceTerritory: "",
            postalCode: "",
            phone: "",
            email: ""
        },
        validationSchema,
        onSubmit(values) {
            // do something here for now, console.log()
            console.log(values);
            setValues(values);
            setSection('billing');
        }
    });

    return (
        <div>
            <input
                checked={sameAsShipping}
                name="sameAsShipping"
                onChange={(e) => setSameAsShipping(e.target.checked)}
                type="checkbox" />
            <label htmlFor="sameAsShipping">My billing address is the same as my shipping address</label>
            {sameAsShipping ?
                (<div>
                    <ShippingDetails shippingValues={shippingValues} />
                    <button 
                        onClick={() => setSection('payment')}
                        type="button">continue to payment</button>
                </div>) :
                (<form
                    className={styles.checkoutForm__form}
                    onSubmit={handleSubmit}>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="firstName">First Name<span className="required">*</span></label>
                        <input
                            name="firstName"
                            onChange={handleChange}
                            type="text"
                            values={values.firstName} />
                        {errors.firstName ? errors.firstName : null}
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="lastName">Last Name<span className="required">*</span></label>
                        <input
                            name="lastName"
                            onChange={handleChange}
                            type="text"
                            values={values.lastName} />
                        {errors.lastName ? errors.lastName : null}
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="addressOne">Address Line 1<span className="required">*</span></label>
                        <input
                            name="addressOne"
                            onChange={handleChange}
                            type="text"
                            values={values.addressOne} />
                        {errors.addressOne ? errors.addressOne : null}
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="addressTwo">Address Line 2</label>
                        <input
                            name="addressTwo"
                            onChange={handleChange}
                            type="text"
                            values={values.addressTwo} />
                        {errors.addressTwo ? errors.addressTwo : null}
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="municipality">Municipality<span className="required">*</span></label>
                        <input
                            name="municipality"
                            onChange={handleChange}
                            type="text"
                            values={values.municipality} />
                        {errors.municipality ? errors.municipality : null}
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="provinceTerritory">Province/Territory<span className="required">*</span></label>
                        <input
                            name="provinceTerritory"
                            onChange={handleChange}
                            type="text"
                            values={values.provinceTerritory} />
                        {errors.provinceTerritory ? errors.provinceTerritory : null}
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="postalCode">Postal Code<span className="required">*</span></label>
                        <input
                            name="postalCode"
                            onChange={handleChange}
                            type="text"
                            values={values.postalCode} />
                        {errors.postalCode ? errors.postalCode : null}
                    </div>
                    <p>Add shipping options here</p>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="phone">Phone Number<span className="required">*</span></label>
                        <input
                            name="phone"
                            onChange={handleChange}
                            type="text"
                            values={values.phone} />
                        {errors.phone ? errors.phone : null}
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="email">Email<span className="required">*</span></label>
                        <input
                            name="email"
                            onChange={handleChange}
                            type="text"
                            values={values.email} />
                        {errors.email ? errors.email : null}
                    </div>
                    <button
                        className={styles.checkoutForm__submitButton}
                        type="submit">continue to payment</button>
                </form>)}
        </div>
    )
}

const CheckoutForm = () => {
    const [section, setSection] = useState('shipping');
    const [shippingValues, setShippingValues] = useState(null);
    const [billingValues, setBillingValues] = useState(null);

    return (
        <div>
            <h2 className={`${styles.checkoutForm__section} ${section === 'shipping' ? styles.current : ''}`}>
                1. Shipping
            </h2>
            {section === 'shipping' ?
                <ShippingForm
                    setValues={setShippingValues}
                    setSection={setSection} /> :
                <ShippingDetails shippingValues={shippingValues} />}
            <h2 className={`${styles.checkoutForm__section} ${section === 'billing' ? styles.current : ''}`}>
                2. Billing
            </h2>
            {section === 'billing' ?
                <BillingForm
                    setValues={setBillingValues}
                    setSection={setSection}
                    shippingValues={shippingValues} /> :
                    <p>{billingValues && `Billing details`}</p>}
            <h2 className={`${styles.checkoutForm__section} ${section === 'payment' ? styles.current : ''}`}>
                3. Payment
            </h2>
            {
                section === 'payment' && <p>Payment is not available in this demo</p>
            }

        </div>)
}


export { CheckoutForm as default };