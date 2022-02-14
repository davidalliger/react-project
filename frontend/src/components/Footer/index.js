import './Footer.css'

const Footer = () => {
    return (
        <>
            <div id='footer'>
                <div id='footer-icon-div'>
                    <div>
                        <a href='https://github.com/davidalliger' id='github' target='_blank'>
                            <img src='/images/github-white.png' id='github-icon' />
                        </a>
                    </div>
                    <div>
                        <a href='https://www.linkedin.com/in/david-alliger-a73351208/' id='linkedin' target='_blank'>
                            <img src='/images/linkedin-white.png' id='linkedin-icon'/>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;
