import React, { useState } from 'react';
import { Link } from 'gatsby';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import CheckoutSummary from './checkout-summary';
import CheckIcon from './assets/check_circle.svg';

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


export const ShippingForm = ({ setValues, setSection, shippingValues }) => {
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
        shipping: shippingValues ? shippingValues.shipping : "Standard"
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
                data-testid="shipping-form"
                onSubmit={handleSubmit}>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="firstName">First Name<span className="required">*</span></label>
                    <input
                        id="firstName"
                        name="firstName"
                        onChange={handleChange}
                        type="text"
                        value={values.firstName} />
                    <span className={styles.checkoutForm__error}>{errors.firstName ? errors.firstName : null}</span>
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="lastName">Last Name<span className="required">*</span></label>
                    <input
                        id="lastName"
                        name="lastName"
                        onChange={handleChange}
                        type="text"
                        value={values.lastName} />
                    <span className={styles.checkoutForm__error}>{errors.lastName ? errors.lastName : null}</span>
                </div>
                <div>
                    <p className={styles.checkoutForm__formLabel}>Country</p>
                    <p className={styles.checkoutForm__preset}><span>Canada</span><span>We can only ship within Canada</span></p>
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="addressOne">Address Line 1<span className="required">*</span></label>
                    <input
                        id="addressOne"
                        name="addressOne"
                        onChange={handleChange}
                        type="text"
                        value={values.addressOne} />
                    <span className={styles.checkoutForm__error}>{errors.addressOne ? errors.addressOne : null}</span>
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="addressTwo">Address Line 2</label>
                    <input
                        id="addressTwo"
                        name="addressTwo"
                        onChange={handleChange}
                        type="text"
                        value={values.addressTwo} />
                    <span className={styles.checkoutForm__error}>{errors.addressTwo ? errors.addressTwo : null}</span>
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="municipality">Municipality<span className="required">*</span></label>
                    <input
                        id="municipality"
                        name="municipality"
                        onChange={handleChange}
                        type="text"
                        value={values.municipality} />
                    <span className={styles.checkoutForm__error}>{errors.municipality ? errors.municipality : null}</span>
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="provinceTerritory">Province/Territory<span className="required">*</span></label>
                    <select
                        value={values.provinceTerritory}
                        id="provinceTerritory"
                        name="provinceTerritory"
                        onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="AB">Alberta</option>
                        <option value="BC">British Columbia</option>
                        <option value="MB">Manitoba</option>
                        <option value="NB">New Brunswick</option>
                        <option value="NL">Newfoundland  and Labrador</option>
                        <option value="NS">Nova Scotia</option>
                        <option value="NT">Northwest Territories</option>
                        <option value="NU">Nunavut</option>
                        <option value="ON">Ontario</option>
                        <option value="PE">Prince Edward Island</option>
                        <option value="QC">Quebec</option>
                        <option value="SK">Saskatchewan</option>
                        <option value="YT">Yukon</option>
                    </select>
                    <span className={styles.checkoutForm__error}>{errors.provinceTerritory ? errors.provinceTerritory : null}</span>
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="postalCode">Postal Code<span className="required">*</span></label>
                    <input
                        id="postalCode"
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
                        value="Standard"
                        checked={values.shipping === 'Standard'}
                        onChange={handleChange}
                        id="standard" />
                    <label htmlFor="standard">
                        Standard
                    </label>
                    <input
                        className={styles.checkoutForm__shippingOption}
                        type="radio"
                        name="shipping"
                        value="Express"
                        checked={values.shipping === 'Express'}
                        onChange={handleChange}
                        id="express" />
                    <label htmlFor="express">
                        Express
                    </label>
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="phone">Phone Number<span className="required">*</span></label>
                    <input
                        id="phone"
                        name="phone"
                        onChange={handleChange}
                        type="text"
                        value={values.phone} />
                    <span className={styles.checkoutForm__error}>{errors.phone ? errors.phone : null}</span>
                </div>
                <div className={styles.checkoutForm__field}>
                    <label htmlFor="email">Email<span className="required">*</span></label>
                    <input
                        id="email"
                        name="email"
                        onChange={handleChange}
                        type="text"
                        value={values.email} />
                    <span className={styles.checkoutForm__error}>{errors.email ? errors.email : null}</span>
                </div>
                <p><span className="required">*</span>Required Fields</p>
                <button
                    className={styles.checkoutForm__submitButton}
                    data-testid="submit-shipping-button"
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
        country,
        phone,
        email,
        shipping } = values;
    return (
        <div className={styles.checkoutForm__details}>
            <p>{firstName} {lastName}</p>
            <p>{addressOne}</p>
            <p>{addressTwo}</p>
            <p>{municipality}, {provinceTerritory}, {postalCode}</p>
            <p>{country ? country : `Canada`}</p>
            <br />
            {section === 'shipping' && <p>{shipping} shipping</p>}
            {section === 'shipping' && <p>Phone number: {phone}</p>}
            {section === 'shipping' && <p>Email: {email}</p>}
        </div>
    );
}

export const BillingForm = ({ setValues, shippingValues, setSection, sameAsShipping, setSameAsShipping, billingValues }) => {
    const validationSchema = baseSchema.shape({
        country: Yup.string().required("Required")
    })
    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            firstName: billingValues ? billingValues.firstName : "",
            lastName: billingValues ? billingValues.lastName : "",
            addressOne: billingValues ? billingValues.addressOne : "",
            addressTwo: billingValues ? billingValues.addressTwo : "",
            municipality: billingValues ? billingValues.municipality : "",
            provinceTerritory: billingValues ? billingValues.provinceTerritory : "",
            postalCode: billingValues ? billingValues.postalCode : "",
            country: billingValues ? billingValues.country : ""
        },
        validationSchema,
        onSubmit(values) {
            setValues(values);
            setSection('payment');
        }
    });

    return (
        <div>
            <div className={styles.checkoutForm__sameAsBilling}>
                <input
                    checked={sameAsShipping}
                    id="sameAsShipping"
                    name="sameAsShipping"
                    onChange={(e) => setSameAsShipping(e.target.checked)}
                    type="checkbox" />
                <label htmlFor="sameAsShipping">My billing address is the same as my shipping address</label>
            </div>

            {sameAsShipping ?
                (<>
                    <Details values={shippingValues} section="billing" />
                    <div style={{ padding: `0 1rem` }}>
                        <button
                            className={styles.checkoutForm__submitButton}
                            data-testid="submit-billing-button"
                            onClick={() => setSection('payment')}
                            type="button">
                            Continue to payment
                        </button>
                    </div>
                </>) :
                (<form
                    className={styles.checkoutForm__form}
                    data-testid="billing-form"
                    onSubmit={handleSubmit}>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="firstName">First Name<span className="required">*</span></label>
                        <input
                            id="firstName"
                            name="firstName"
                            onChange={handleChange}
                            type="text"
                            value={values.firstName} />
                        <span className={styles.checkoutForm__error}>{errors.firstName ? errors.firstName : null}</span>
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="lastName">Last Name<span className="required">*</span></label>
                        <input
                            id="lastName"
                            name="lastName"
                            onChange={handleChange}
                            type="text"
                            value={values.lastName} />
                        <span className={styles.checkoutForm__error}>{errors.lastName ? errors.lastName : null}</span>
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="country">Country<span className="required">*</span></label>
                        <input
                            id="country"
                            name="country"
                            onChange={handleChange}
                            type="text"
                            value={values.country} />
                        <span className={styles.checkoutForm__error}>{errors.addressOne ? errors.addressOne : null}</span>
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="addressOne">Address Line 1<span className="required">*</span></label>
                        <input
                            id="addressOne"
                            name="addressOne"
                            onChange={handleChange}
                            type="text"
                            value={values.addressOne} />
                        <span className={styles.checkoutForm__error}>{errors.addressOne ? errors.addressOne : null}</span>
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="addressTwo">Address Line 2</label>
                        <input
                            id="addressTwo"
                            name="addressTwo"
                            onChange={handleChange}
                            type="text"
                            value={values.addressTwo} />
                        <span className={styles.checkoutForm__error}>{errors.addressTwo ? errors.addressTwo : null}</span>
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="municipality">Municipality<span className="required">*</span></label>
                        <input
                            id="municipality"
                            name="municipality"
                            onChange={handleChange}
                            type="text"
                            value={values.municipality} />
                        <span className={styles.checkoutForm__error}>{errors.municipality ? errors.municipality : null}</span>
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="provinceTerritory">Province/Territory<span className="required">*</span></label>
                        <select
                            value={values.provinceTerritory}
                            id="provinceTerritory"
                            name="provinceTerritory"
                            onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="AB">Alberta</option>
                            <option value="BC">British Columbia</option>
                            <option value="MB">Manitoba</option>
                            <option value="NB">New Brunswick</option>
                            <option value="NL">Newfoundland  and Labrador</option>
                            <option value="NS">Nova Scotia</option>
                            <option value="NT">Northwest Territories</option>
                            <option value="NU">Nunavut</option>
                            <option value="ON">Ontario</option>
                            <option value="PE">Prince Edward Island</option>
                            <option value="QC">Quebec</option>
                            <option value="SK">Saskatchewan</option>
                            <option value="YT">Yukon</option>
                        </select>
                        <span className={styles.checkoutForm__error}>{errors.provinceTerritory ? errors.provinceTerritory : null}</span>
                    </div>
                    <div className={styles.checkoutForm__field}>
                        <label htmlFor="postalCode">Postal Code<span className="required">*</span></label>
                        <input
                            id="postalCode"
                            name="postalCode"
                            onChange={handleChange}
                            type="text"
                            value={values.postalCode} />
                        <span className={styles.checkoutForm__error}>{errors.postalCode ? errors.postalCode : null}</span>
                    </div>
                    <button
                        className={styles.checkoutForm__submitButton}
                        data-testid="submit-billing-button"
                        type="submit">continue to payment</button>
                </form>)
            }
        </div >
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

const CheckoutHeading = ({ children, complete, current, section, setSection }) => {
    return (
        <div className={`${styles.checkoutForm__section} ${current ? styles.current : ''}`}>
            <div className={styles.checkoutForm__heading}>
                {complete && <CheckIcon />}
                <h3>{children}</h3>
            </div>
            {complete && <EditButton setSection={setSection} section={section} />}
        </div>
    )
}

const CheckoutForm = () => {
    const [section, setSection] = useState('shipping');
    const [shippingValues, setShippingValues] = useState();
    const [billingValues, setBillingValues] = useState();
    const [sameAsShipping, setSameAsShipping] = useState(true);
    const haveBillingInfo = billingValues || (sameAsShipping && shippingValues);

    return (
        <div className={styles.checkoutForm__wrap}>
            <h2 className={`heading-first ${styles.checkoutForm__header}`}>Checkout</h2>
            <div style={{ gridArea: `summary` }}>
                <CheckoutSummary shippingValues={shippingValues} />
            </div>
            <div style={{ gridArea: `form` }}>
                <CheckoutHeading
                    complete={shippingValues && section !== 'shipping'}
                    current={section === 'shipping'}
                    section="shipping"
                    setSection={setSection}>
                    1. Shipping
                </CheckoutHeading>
                <div className={styles.checkoutForm__sectionBody}>
                    {section === 'shipping' ?
                        <ShippingForm
                            setValues={setShippingValues}
                            shippingValues={shippingValues}
                            setSection={setSection} /> :
                        <Details values={shippingValues} section="shipping" />}
                </div>
                <CheckoutHeading
                    complete={haveBillingInfo && section !== 'billing'}
                    current={section === 'billing'}
                    section="billing"
                    setSection={setSection}>
                    2. Billing
                </CheckoutHeading>
                <div className={styles.checkoutForm__sectionBody}>
                    {section === 'billing' ?
                        <BillingForm
                            billingValues={billingValues}
                            sameAsShipping={sameAsShipping}
                            setSameAsShipping={setSameAsShipping}
                            setValues={setBillingValues}
                            setSection={setSection}
                            shippingValues={shippingValues} /> :
                        haveBillingInfo && <Details values={sameAsShipping ? shippingValues : billingValues} section="billing" />}
                </div>
                <CheckoutHeading
                    complete={false}
                    current={section === 'payment'}
                    section="payment"
                    setSection={setSection}>
                    3. Payment
                </CheckoutHeading>
                <div className={styles.checkoutForm__sectionBody}>
                    {section === 'payment' &&
                        (<div style={{ padding: `0 1rem` }}>
                            <span>Payment is not available in this demo</span>
                            <Link
                                className={styles.checkoutForm__submitButton}
                                style={{ display: `block` }}
                                to="/shop">
                                Go back to the shop
                        </Link>
                        </div>)
                    }
                </div>
            </div>
            <div className={styles.checkoutForm__contact} style={{ gridArea: `contact` }}>
                <h3>Contact Info</h3>
                <p>Email a question; expect to hear back in 24 hours: <a href="mailto:contact@muffinplants.com">contact@muffinplants.com</a></p>
            </div>
        </div>)
}


export { CheckoutForm as default };