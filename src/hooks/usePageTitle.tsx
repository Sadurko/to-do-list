import { useEffect } from "react"


const usePageTitle = (title?: string) => {
    useEffect(() => {
        (title === undefined)
        ? document.title = 'To do list'
        : document.title = `${title} | To do list`
    }, [title])
}

export default usePageTitle;