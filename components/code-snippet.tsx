import styles from '../styles/components/code-snippet.module.scss'
import { useRef } from 'react'
import { useToast } from '@chakra-ui/react'

const CodeSnippet = ({ children }) => {
    const codeRef = useRef(null);
    const toast = useToast();

    return (
        <div className={styles.code_snippet}>
            <div className={styles.code_snippet__code}>
                <span ref={codeRef}>{ children }</span>
            </div>
            <button className='button button__grey button__small' onClick={e => {
                if( typeof window !== 'undefined' ){
                    navigator.clipboard.writeText(codeRef.current.innerText);

                    toast({
                        title: 'Code Copied',
                        description: 'This code has been copied to your clipboard.',
                        status: 'success',
                        duration: 6000,
                        isClosable: true,
                    })
                }
            }}>Copy</button>
        </div>
    )
}

export default CodeSnippet;