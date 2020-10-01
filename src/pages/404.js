import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout/layout';

const Default404 = ({location}) => {
    return (
        <Layout location={location}>
            <div style={{ display: `flex`, flexDirection: `column`, height: `50vh`, padding: `1rem` }}>
                <div style={{flex: `1`}}>
                    <p style={{textAlign: `center`}}>Whoops! Page Not Found</p>
                    <p style={{textAlign: `center`}}>
                        <Link 
                            className="link-with-arrow"
                            to="/shop">Back to the shop</Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export { Default404 as default };