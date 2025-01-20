import './homePage.css';
//     width: 98.6vw;
export default function About() {
    return <>
        <div id="AboutContainer">
            <div className='text-center text-decoration-underline'><h2>ABOUT US</h2></div>
            <div className='mt-4' id="maintext">
                <div id="imgDiv" className='position-relative'>
                    {/* <img src="assets/cricket.webp" id="aboutImg" /> */}
                    {/* <img src="https://media.istockphoto.com/id/518022060/photo/cricket-batsman-hitting-ball-during-cricket-match-in-stadium.webp?b=1&s=170667a&w=0&k=20&c=qsbdTpZ2wcOJwcdNXPeErUzS-1QKZuunuv3GGgP6dKA=" alt='About image' className='img-fluid' id="aboutImg" /> */}
                    <div id="textDiv" className='text-center p-3 rounded'>
                        <h3 id="h3">Cricket Platform</h3>
                        <div id="text" className='rounded p-3'>
                            <p id="p">
                                In this platform, we provide an interface connecting users with event organizers. It's the ideal platform for registering events and participating in them. Our application offers an easy way to create teams and take part in cricket tournaments.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}