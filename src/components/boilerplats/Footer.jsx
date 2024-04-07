import React from 'react'
import styles from '../../stylesheet/Footer.module.css';
/* Denna är för h1 och h3:ans font family */
import '@fontsource/pacifico';

const Footer = () => {
    return (
        // Footer containern 
        <footer className={styles.footer}>

            {/* container som är runt de 3 info divarna */}
            <div className={styles.footerChild}>

                {/* adress containern */}
                <div className={styles.adressContainer}>
                    <h3 className={styles.adressHeader}>Adress</h3>
                    <p className={`${styles.streetAdress} ${styles.sameStyleP}`}>Björkstigensvägen 24</p>
                    <p className={`${styles.postalCode} ${styles.sameStyleP}`}>155 55 Stockholm</p>
                </div>

                {/* bidmaster containern */}
                <div className={styles.bidmasterContainer}>
                    <h1 className={styles.bidmasterTitle}>Bidmaster</h1>
                </div>

                {/* Kontakt containern */}
                <div className={styles.contactContainer}>
                    <h3 className={styles.contactHeader}>Kontakt</h3>
                    <p className={`${styles.phoneNumber} ${styles.sameStyleP}`}>08-555 44 33</p>
                    <p className={`${styles.emailAdress} ${styles.sameStyleP}`}>exempel@gmail.com</p>
                </div>
            </div>

        </footer>
    );
};
  
export default Footer;

