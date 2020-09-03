import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import numeral from 'numeral';
import { CartContext } from '../../../wrap-with-provider';
import { cartQuantityTotal, cartAmountTotal } from '../../selectors/cartQuantity';
import styles from './checkout-form.module.css';

const baseSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    addressOne: Yup.string().required("Required"),
    addressTwo: Yup.string(),
    municipality: Yup.string().required("Required"),
    provinceTerritory: Yup.string().required("Required"),
    postalCode: Yup.string().trim()
        .required("Required")
        .matches(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
            { message: "Postal Code must be in format: K4B 1H9" })
});


const ShippingForm = ({ setValues, setSection, shippingValues }) => {
    const initialValues = {
        firstName: shippingValues ? shippingValues.firstName : "",
        lastName: shippingValues ? shippingValues.lastName : "",
        addressOne: shippingValues ? shippingValues.addressOne : "",
        addressTwo: shippingValues ? shippingValues.addressTwo : "",
        municipality: shippingValues ? shippingValues.municipality : "",
        provinceTerritory: shippingValues ? shippingValues.provinceTerritory : "",
        postalCode: shippingValues ? shippingValues.postalCode : "",
        phone: shippingValues ? shippingValues.phone : "",
        email: shippingValues ? shippingValues.email : "",
        shipping: shippingValues ? shippingValues.shipping : "standard"
    };
    const validationSchema = baseSchema.shape({
        phone: Yup.string().trim()
            .required("Required").matches(/^[2-9]\d{2}[ -]?[2-9]\d{2}[ -]?\d{4}$/,
                { message: "Phone number must be in format: 603-555-5555" }),
        email: Yup.string().trim().required("Required").email(),
        shipping: Yup.string().required("Required")
    })

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues,
        validationSchema,
        onSubmit(values) {
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
                        value={values.firstName} />
                    <span className={styles.checkoutForm__error}>{errors.firstName ? errors.firstName : null}</span>
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="lastName">Last Name<span className="required">*</span></label>
                    <input
                        name="lastName"
                        onChange={handleChange}
                        type="text"
                        value={values.lastName} />
                    <span className={styles.checkoutForm__error}>{errors.lastName ? errors.lastName : null}</span>
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="addressOne">Address Line 1<span className="required">*</span></label>
                    <input
                        name="addressOne"
                        onChange={handleChange}
                        type="text"
                        value={values.addressOne} />
                    <span className={styles.checkoutForm__error}>{errors.addressOne ? errors.addressOne : null}</span>
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="addressTwo">Address Line 2</label>
                    <input
                        name="addressTwo"
                        onChange={handleChange}
                        type="text"
                        value={values.addressTwo} />
                    <span className={styles.checkoutForm__error}>{errors.addressTwo ? errors.addressTwo : null}</span>
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="municipality">Municipality<span className="required">*</span></label>
                    <input
                        name="municipality"
                        onChange={handleChange}
                        type="text"
                        value={values.municipality} />
                    <span className={styles.checkoutForm__error}>{errors.municipality ? errors.municipality : null}</span>
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="provinceTerritory">Province/Territory<span className="required">*</span></label>
                    <input
                        name="provinceTerritory"
                        onChange={handleChange}
                        type="text"
                        value={values.provinceTerritory} />
                    <span className={styles.checkoutForm__error}>{errors.provinceTerritory ? errors.provinceTerritory : null}</span>
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="postalCode">Postal Code<span className="required">*</span></label>
                    <input
                        name="postalCode"
                        onChange={handleChange}
                        type="text"
                        value={values.postalCode} />
                    <span className={styles.checkoutForm__error}>{errors.postalCode ? errors.postalCode : null}</span>
                </div>
                <h3>Shipping Method</h3>
                <div>
                    <input
                        className={styles.checkoutForm__shippingOption}
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={values.shipping === 'standard'}
                        onChange={handleChange}
                        id="standard" />
                    <label htmlFor="standard">
                        Standard
                    </label>
                    <input
                        className={styles.checkoutForm__shippingOption}
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={values.shipping === 'express'}
                        onChange={handleChange}
                        id="express" />
                    <label htmlFor="express">
                        Express
                    </label>
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="phone">Phone Number<span className="required">*</span></label>
                    <input
                        name="phone"
                        onChange={handleChange}
                        type="text"
                        value={values.phone} />
                    <span className={styles.checkoutForm__error}>{errors.phone ? errors.phone : null}</span>
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="email">Email<span className="required">*</span></label>
                    <input
                        name="email"
                        onChange={handleChange}
                        type="text"
                        value={values.email} />
                    <span className={styles.checkoutForm__error}>{errors.email ? errors.email : null}</span>
                </div>
                <button
                    className={styles.checkoutForm__submitButton}
                    type="submit">continue to billing</button>
            </form>
        </div>
    );
}

const Details = ({ values, section }) => {
    const {
        firstName,
        lastName,
        addressOne,
        addressTwo,
        municipality,
        provinceTerritory,
        postalCode,
        phone,
        shipping } = values;
    return (
        <div className={styles.checkoutForm__details}>
            <p>{firstName} {lastName}</p>
            <p>{addressOne}</p>
            <p>{addressTwo}</p>
            <p>{municipality}, {provinceTerritory}, {postalCode}</p>
            {section === 'shipping' && <p>{shipping} shipping</p>}
            <p>{phone}</p>
        </div>
    );
}

const BillingForm = ({ setValues, shippingValues, setSection, sameAsShipping, setSameAsShipping, billingValues }) => {
    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            firstName: billingValues ? billingValues.firstName : "",
            lastName: billingValues ? billingValues.lastName : "",
            addressOne: billingValues ? billingValues.addressOne : "",
            addressTwo: billingValues ? billingValues.addressTwo : "",
            municipality: billingValues ? billingValues.municipality : "",
            provinceTerritory: billingValues ? billingValues.provinceTerritory : "",
            postalCode: billingValues ? billingValues.postalCode : ""
        },
        validationSchema: baseSchema,
        onSubmit(values) {
            setValues(values);
            setSection('payment');
        }
    });

    return (
        <div>
            <input
                checked={sameAsShipping}
                id="sameAsShipping"
                name="sameAsShipping"
                onChange={(e) => setSameAsShipping(e.target.checked)}
                type="checkbox" />
            <label htmlFor="sameAsShipping">My billing address is the same as my shipping address</label>
            {sameAsShipping ?
                (<div style={{ padding: `1rem` }}>
                    <Details values={shippingValues} section="billing" />
                    <button
                        className={styles.checkoutForm__submitButton}
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
                            value={values.firstName} />
                        <span className={styles.checkoutForm__error}>{errors.firstName ? errors.firstName : null}</span>
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="lastName">Last Name<span className="required">*</span></label>
                        <input
                            name="lastName"
                            onChange={handleChange}
                            type="text"
                            value={values.lastName} />
                        <span className={styles.checkoutForm__error}>{errors.lastName ? errors.lastName : null}</span>
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="addressOne">Address Line 1<span className="required">*</span></label>
                        <input
                            name="addressOne"
                            onChange={handleChange}
                            type="text"
                            value={values.addressOne} />
                        <span className={styles.checkoutForm__error}>{errors.addressOne ? errors.addressOne : null}</span>
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="addressTwo">Address Line 2</label>
                        <input
                            name="addressTwo"
                            onChange={handleChange}
                            type="text"
                            value={values.addressTwo} />
                        <span className={styles.checkoutForm__error}>{errors.addressTwo ? errors.addressTwo : null}</span>
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="municipality">Municipality<span className="required">*</span></label>
                        <input
                            name="municipality"
                            onChange={handleChange}
                            type="text"
                            value={values.municipality} />
                        <span className={styles.checkoutForm__error}>{errors.municipality ? errors.municipality : null}</span>
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="provinceTerritory">Province/Territory<span className="required">*</span></label>
                        <input
                            name="provinceTerritory"
                            onChange={handleChange}
                            type="text"
                            value={values.provinceTerritory} />
                        <span className={styles.checkoutForm__error}>{errors.provinceTerritory ? errors.provinceTerritory : null}</span>
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="postalCode">Postal Code<span className="required">*</span></label>
                        <input
                            name="postalCode"
                            onChange={handleChange}
                            type="text"
                            value={values.postalCode} />
                        <span className={styles.checkoutForm__error}>{errors.postalCode ? errors.postalCode : null}</span>
                    </div>
                    <button
                        className={styles.checkoutForm__submitButton}
                        type="submit">continue to payment</button>
                </form>)}
        </div>
    )
}

const EditButton = ({ setSection, section }) => {
    return (
        <button
            className={styles.checkoutForm__editButton}
            onClick={() => setSection(section)}
            type="button">
            Edit
        </button>
    );
}

const CheckoutForm = () => {
    const [section, setSection] = useState('shipping');
    const [shippingValues, setShippingValues] = useState();
    const [billingValues, setBillingValues] = useState();
    const [sameAsShipping, setSameAsShipping] = useState(true);
    const haveBillingInfo = billingValues || (sameAsShipping && shippingValues);
    const { cart } = useContext(CartContext);
    const cartQuantity = cartQuantityTotal(cart);
    const cartTotal = cartAmountTotal(cart)
    return (
        <div>
            <div>
                <p>{cartQuantity} item{`${cartQuantity > 1 ? 's' : ''}`} {numeral(cartTotal).format('$0,0.00')}</p>
            </div>
            <div className={`${styles.checkoutForm__section} ${section === 'shipping' ? styles.current : ''}`}>
                <h2>1. Shipping</h2>
                {shippingValues && section !== 'shipping' && <EditButton setSection={setSection} section="shipping" />}
            </div>
            {section === 'shipping' ?
                <ShippingForm
                    setValues={setShippingValues}
                    shippingValues={shippingValues}
                    setSection={setSection} /> :
                <Details values={shippingValues} section="shipping" />}
            <div className={`${styles.checkoutForm__section} ${section === 'billing' ? styles.current : ''}`}>
                <h2>2. Billing</h2>
                {haveBillingInfo && section !== 'billing' && <EditButton setSection={setSection} section="billing" />}
            </div>
            {section === 'billing' ?
                <BillingForm
                    billingValues={billingValues}
                    sameAsShipping={sameAsShipping}
                    setSameAsShipping={setSameAsShipping}
                    setValues={setBillingValues}
                    setSection={setSection}
                    shippingValues={shippingValues} /> :
                haveBillingInfo && <Details values={sameAsShipping ? shippingValues : billingValues} section="billing" />}
            <div className={`${styles.checkoutForm__section} ${section === 'payment' ? styles.current : ''}`}>
                <h2>3. Payment</h2>
            </div>
            {
                section === 'payment' && <p>Payment is not available in this demo</p>
            }

        </div>)
}


export { CheckoutForm as default };