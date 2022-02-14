import './PageNotFound.css'

const PageNotFound = () => {
    return (
        <div id='page-not-found-container'>
            <div id='page-not-found-heading'>
                <h1>Boo!</h1>
            </div>
            <div id='page-not-found-explanation'>
                The requested resource couldn't be found
            </div>
            <div id='page-not-found-extra'>
                ...but according to legend, its spirit roams the internet, looking for a computer to call home...
            </div>
            <img src='/images/ghost404.png' id='ghost-not-found'/>
        </div>
    )
}

export default PageNotFound;
