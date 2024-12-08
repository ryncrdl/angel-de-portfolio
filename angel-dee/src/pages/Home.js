import banner from "../assets/my-picture.jpg";

const Home = () => {
  const email = "adeguzman647@gmail.com";
  const subject = "I have a job opportunity for you";
  const message = "I am interested in discussing job opportunities.";

  const gmailComposeLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(message)}`;

  return (
    <section className="home_banner_area" id="home">
      <div className="banner_inner">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="banner_content">
                <h3 className="text-uppercase">Hello</h3>
                <h1 className="text-uppercase">
                  I am <br /> <span>Angel de Guzman</span>
                </h1>

                <h5 className="text-uppercase">Passionate Web Developer</h5>
                <p style={{ color: "white" }}>
                  In my free time. I enjoy building websites, learning new,
                  technologies and experimenting with web design.
                </p>
                <div className="footer_top flex-column">
                  <div
                    className="footer_social"
                    style={{ margin: "2rem 0rem" }}
                  >
                    <a
                      href="https://www.facebook.com/eynjeldg?mibextid=ZbWKwL"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/angel-de-guzman-874879295"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="fa fa-linkedin"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/eynjeldg"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="fa fa-instagram"></i>
                    </a>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <a
                    className="primary_btn"
                    href={gmailComposeLink}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>Hire Me</span>
                  </a>
                  <a
                    className="primary_btn tr-bg"
                    href="https://drive.google.com/file/d/1Xm6ezvQkfGAr0eJU4DDgw1GIk110v8m0/view"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>Get CV</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="home_right_img">
                <img
                  className=""
                  src={banner}
                  alt="Banner"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
