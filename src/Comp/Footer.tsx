import footerLogo from '../Img/footerLogo.png'

const Footer = () => {
return(
    <div className="footer-conatiner">
        <img src={footerLogo} className='artemis-logo'></img>
        <p>©2021 Artemis. All rights reserved.</p>
    </div>
)
}

export default Footer