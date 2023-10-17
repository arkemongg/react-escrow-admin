import styles from './styles/Error.module.css'

export const EmptyMessage = (props) => {
    return (
        <>
            <div className={styles.Error}>
                <div className="alert alert-error min-w-[330px] max-w-[460px]">
                    <div className="text-center">{props.message}</div>
                </div>
            </div>
        </>
    )
}