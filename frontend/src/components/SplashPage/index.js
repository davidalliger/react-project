import './SplashPage.css'

const SplashPage = () => {
    return (
        <>
            <div id='splash-image-container'>
                <div id='splash-image-overlay'></div>
                <div id='splash-image-content'>
                    <h1 id='splash-image-text'>
                        Make your next trip spooktacular!
                    </h1>
                    <button id='splash-image-button'>
                        Search for haunts
                    </button>
                </div>
                <img src='/images/hauntedhouse.jpg' id='splash-image' />
            </div>
            <div id='credit-text-div'>
                <p className='credit-text'>
                    Image by <a target='_blank' className='credit-text-link' href="https://pixabay.com/users/tama66-1032521/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3237114">Peter H</a> from <a target='_blank' className='credit-text-link' href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3237114">Pixabay</a>
                </p>
            </div>
            <div id='splash-page-background'></div>
        </>
    );
}

export default SplashPage;
