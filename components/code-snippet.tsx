import styles from '../styles/components/code-snippet.module.scss'

const CodeSnippet = ({ children }) => {
    return (
        <div className={styles.code_snippet}>
            <div className={styles.code_snippet__code}>
                { children }
            </div>
            <button className='button button__grey button__small'>Copy</button>
        </div>
    )
}

export default CodeSnippet;