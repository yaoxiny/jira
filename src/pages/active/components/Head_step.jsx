import styles from './create_active.less';
import { Steps  } from 'antd';
const { Step } = Steps;

export default function HeadStep({step}){
    return (
        <div className={styles.create_step}>
                <p className={styles.create_title}>创建活动</p>
                <Steps progressDot  current={step} className={styles.steps}>
                    <Step title="基本信息"  />
                    <Step  />
                    <Step title="活动信息" />
                </Steps>
            </div>
    )
}