import react from 'react'
import styles from './head_title.less';

export default function HeadTitle({title,tips}){
    return(
        <div className={styles.title}>
            <span></span>
            <p className={styles.content}>{title}</p>
            <p className={styles.tips}>{tips}</p>
        </div>
    )
}