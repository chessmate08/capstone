import * as styles from './styles.module.css'

function Policies({Head, Foot}) {
    
    return (
        <div className="all">
            <Head />
            <div>
                <ul>
                    <h2>All Returns Must Be:</h2>
                    <li><p classname={styles.p}>Requested within 30 days of picked-up-by or invoice date; whichever is later</p></li>
                    <li><p className={styles.p}>In ORIGINAL purchased condition</p></li>
                    <li><p className={styles.p}>SPECIAL ORDER items are subject to a 25% restocking fee</p></li>
                    <li><p className={styles.p}>Credit Card* transacions are subject to a non-refundable, 4% processing/convenience fee</p></li>
                    <li><p className={styles.p}>WARRANTY: Liability is limited to replacement of defective material or refund of invoice value. We honor a ONE-YEAR warranty unless noted otherwise</p></li>
                </ul>
            </div>
            <div style={{marginBottom:"10%"}}>
                <h2>Credit Card Fee:</h2>
                <ul>
                    <li><p className={styles.p}>Starting April 1, 2022, ALL credit-card transactions will have an added 4% processing/convenience fee.</p></li>
                    <li><p className={styles.p}>Payments made via cash and/or company check are encouraged since we do not have to pass along any fees associated w/this type of transaction. </p></li>
                    <li><p className={styles.p}>No processing fee with verified DEBIT cards</p></li>
                </ul>
            </div>
            <Foot />
        </div>
    )
}
export {Policies}